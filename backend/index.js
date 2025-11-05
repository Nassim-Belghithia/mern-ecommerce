require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoString = process.env.DATABASE_URL;

if (!mongoString) {
  console.error('DATABASE_URL is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require('./routes/routes');
app.use('/api', routes);




// --- RAG Integration Route ---
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.post("/api/ask", async (req, res) => {
  try {
    const { query } = req.body;

    const response = await fetch(
      `${process.env.OPEN_AI_ENDPOINT}/openai/deployments/${process.env.CHAT_MODEL}/chat/completions?api-version=2024-05-01-preview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.OPEN_AI_KEY,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a helpful e-commerce assistant. Always try to answer customer questions about our products, prices, promotions, availability, orders, delivery, returns, or how to buy.If the question is too general (like “I want something cheaper” or “How can I buy?”), respond politely and guide the user with useful store-related advice.Only refuse to answer if the question is completely unrelated to shopping or our store, by replying:' I'm sorry, I can only answer questions related to our store and its services.' "
            },
            { role: "user", content: query },
          ],
          // ✅ CORRECTION : data_sources est au niveau principal, pas dans extra_body
          data_sources: [
            {
              type: "azure_search",
              parameters: {
                endpoint: process.env.SEARCH_ENDPOINT,
                index_name: process.env.INDEX_NAME,
                authentication: {
                  type: "api_key",
                  key: process.env.SEARCH_KEY,
                },
                query_type: "vector",
                embedding_dependency: {
                  type: "deployment_name",
                  deployment_name: process.env.EMBEDDING_MODEL,
                },
              },
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // ✅ Log pour debug
    console.log("🔍 Azure Response:", data);

    // Vérifie si une réponse existe
    const answer = data?.choices?.[0]?.message?.content || "No answer found.";
    res.json({ answer });
  } catch (err) {
    console.error("❌ RAG API error:", err);
    res.status(500).json({ error: "Erreur côté serveur" });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Database connection events
database.on('error', (error) => {
  console.log('Database connection error:', error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0" ,() => {
  console.log(`Server Started at ${PORT}`);
});




