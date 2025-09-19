// === CONFIGURAÇÕES ===
const PROXY_URL = "https://script-chatgpt-prova-h3c5.vercel.app/api/chat";

// === CRIAÇÃO DO WIDGET ===
(function () {
  let widget, textarea, messages;

  function createWidget() {
    widget = document.createElement("div");
    widget.id = "chat-widget";
    widget.style.position = "fixed";
    widget.style.bottom = "20px";
    widget.style.right = "20px";
    widget.style.width = "350px";
    widget.style.height = "400px";
    widget.style.background = "white";
    widget.style.border = "1px solid #ccc";
    widget.style.borderRadius = "10px";
    widget.style.display = "flex";
    widget.style.flexDirection = "column";
    widget.style.zIndex = "9999";
    widget.style.fontFamily = "sans-serif";
    widget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

    // Área de mensagens
    messages = document.createElement("div");
    messages.style.flex = "1";
    messages.style.padding = "10px";
    messages.style.overflowY = "auto";
    messages.style.fontSize = "14px";
    widget.appendChild(messages);

    // Área de input
    const inputArea = document.createElement("div");
    inputArea.style.display = "flex";
    inputArea.style.borderTop = "1px solid #ccc";

    textarea = document.createElement("textarea");
    textarea.style.flex = "1";
    textarea.style.border = "none";
    textarea.style.padding = "10px";
    textarea.style.fontSize = "14px";
    textarea.style.resize = "none";
    textarea.rows = 2;
    inputArea.appendChild(textarea);

    const sendBtn = document.createElement("button");
    sendBtn.textContent = "➤";
    sendBtn.style.border = "none";
    sendBtn.style.background = "#007bff";
    sendBtn.style.color = "white";
    sendBtn.style.padding = "0 15px";
    sendBtn.style.cursor = "pointer";
    inputArea.appendChild(sendBtn);

    sendBtn.addEventListener("click", sendMessage);
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    widget.appendChild(inputArea);
    document.body.appendChild(widget);
  }

  async function sendMessage() {
    const text = textarea.value.trim();
    if (!text) return;

    addMessage("Você", text);
    textarea.value = "";

    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "❌ Erro na resposta";
      addMessage("Bot", reply);
    } catch (err) {
      console.error(err);
      addMessage("Bot", "❌ Erro de conexão com o servidor");
    }
  }

  function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.style.margin = "5px 0";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // Atalho para abrir/fechar com a tecla '
  document.addEventListener("keydown", (e) => {
    if (e.key === "'") {
      if (widget && widget.style.display !== "none") {
        widget.style.display = "none";
      } else if (widget) {
        widget.style.display = "flex";
      } else {
        createWidget();
      }
    }
  });
})();
