// src/services/ragAPI.js
export const askRAG = async (query) => {
  try {
    const response = await fetch("http://localhost:5000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) throw new Error("Erreur de connexion au backend");

    const data = await response.json();
    // ✅ adapter à la vraie structure du backend
    const answer = data?.answer || "No answer found.";
    return answer;
  } catch (err) {
    console.error("RAG API Error:", err);
    return "Désolé, impossible de récupérer la réponse pour le moment.";
  }
};
