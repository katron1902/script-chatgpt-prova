export default async function handler(req, res) {
  // === CONFIGURAÇÃO CORS ===
  res.setHeader("Access-Control-Allow-Origin", "https://saladofuturo.educacao.sp.gov.br");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Resposta para pré-flight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Só aceita POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { message } = req.body;

    // Chamada para a Meta AI (Llama 4)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.META_API_KEY}`, // variável de ambiente no Vercel
      },
      body: JSON.stringify({
        model: "llama-4",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no proxy" });
  }
}
