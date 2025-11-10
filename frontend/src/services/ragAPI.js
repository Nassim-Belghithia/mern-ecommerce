// src/services/ragAPI.js
// Récupérer l'URL API depuis la configuration runtime ou fallback
const getApiBaseUrl = () => {
  // Vérifier si la configuration runtime est disponible (production)
  if (typeof window !== 'undefined' && window.REACT_APP_CONFIG && window.REACT_APP_CONFIG.API_URL) {
    return window.REACT_APP_CONFIG.API_URL;
  }
  // Fallback: variable d'environnement au build time (development)
  return process.env.REACT_APP_API_URL || "http://localhost:5000/api";
};

export const askRAG = async (query) => {
  try {
    const apiUrl = getApiBaseUrl();
    const response = await fetch(`${apiUrl}/ask`, {
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
