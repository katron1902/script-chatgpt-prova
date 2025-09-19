export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.META_API_KEY}`, // pega da variável no Vercel
      },
      body: JSON.stringify({
        model: "llama-4", // troque pelo modelo correto se for outro
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
