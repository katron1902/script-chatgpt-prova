// widget.js - carregado via GitHub Pages

if (window.__llama_bookmarklet_installed) {
  const w = document.getElementById("llama-widget-root");
  if (w) {
    w.style.display = (w.style.display === "none") ? "block" : "none";
  }
} else {
  window.__llama_bookmarklet_installed = true;

  // === estilos do widget ===
  const style = document.createElement("style");
  style.textContent = `
    #llama-widget-root {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      height: 420px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      font-family: Arial, sans-serif;
      z-index: 999999;
    }
    #llama-widget-header {
      background: #4a90e2;
      color: #fff;
      padding: 8px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px 10px 0 0;
    }
    #llama-widget-close {
      cursor: pointer;
      font-weight: bold;
    }
    #llama-widget-messages {
      flex: 1;
      padding: 8px;
      overflow-y: auto;
      font-size: 13px;
      line-height: 1.4;
    }
    .llama-msg {
      margin-bottom: 6px;
    }
    .llama-user {
      color: #2c3e50;
      font-weight: bold;
    }
    .llama-bot {
      color: #27ae60;
    }
    #llama-widget-input {
      display: flex;
      border-top: 1px solid #ccc;
    }
    #llama-widget-input textarea {
      flex: 1;
      border: none;
      padding: 6px;
      resize: none;
      font-size: 13px;
      outline: none;
    }
    #llama-widget-input button {
      background: #4a90e2;
      color: white;
      border: none;
      padding: 0 12px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // === estrutura do widget ===
  const root = document.createElement("div");
  root.id = "llama-widget-root";
  root.innerHTML = `
    <div id="llama-widget-header">
      <span>LLaMA Chat</span>
      <span id="llama-widget-close">×</span>
    </div>
    <div id="llama-widget-messages"></div>
    <div id="llama-widget-input">
      <textarea rows="1" placeholder="Digite..."></textarea>
      <button>➤</button>
    </div>
  `;
  document.body.appendChild(root);

  const closeBtn = root.querySelector("#llama-widget-close");
  const messages = root.querySelector("#llama-widget-messages");
  const textarea = root.querySelector("textarea");
  const sendBtn = root.querySelector("button");

  // fechar com botão
  closeBtn.addEventListener("click", () => {
    root.style.display = "none";
  });

  // função para adicionar mensagens
  function addMessage(text, sender = "bot") {
    const div = document.createElement("div");
    div.className = "llama-msg " + (sender === "user" ? "llama-user" : "llama-bot");
    div.textContent = (sender === "user" ? "Você: " : "Bot: ") + text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // função de envio
  async function sendMessage() {
    const text = textarea.value.trim();
    if (!text) return;
    addMessage(text, "user");
    textarea.value = "";

    // aqui é onde você chama seu proxy/meta api
    try {
      const reply = await fakeReply(text);
      addMessage(reply, "bot");
    } catch (err) {
      addMessage("Erro: " + err.message, "bot");
    }
  }

  // simulação de resposta (troque pelo fetch ao seu proxy)
  async function fakeReply(prompt) {
    return "Eco: " + prompt;
  }

  sendBtn.addEventListener("click", sendMessage);
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // toggle com a tecla '
  document.addEventListener("keydown", (e) => {
    if (e.key === "'" && !e.target.closest("input, textarea, [contenteditable=true]")) {
      root.style.display = (root.style.display === "none") ? "block" : "none";
    }
  });
}
