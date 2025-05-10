document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");
  const resetButton = document.getElementById("reset-button");
  const statusDiv = document.getElementById("status");

  const API_ENDPOINT = "https://ai-faq-red.vercel.app/api/chat";

  function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function setStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.style.color = isError ? "#dc3545" : "#666";
  }

  async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    addMessage(messageText, "user");
    messageInput.value = "";
    setStatus("Sending...");

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          reset_context: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      addMessage(data.response, "assistant");
      setStatus("");
    } catch (error) {
      console.error("Error:", error);
      addMessage(`Error: ${error.message}`, "error");
      setStatus(`Error: ${error.message}`, true);
    }
  }

  async function resetConversation() {
    setStatus("Resetting context...");
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "",
          reset_context: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      chatBox.innerHTML = "";
      addMessage(data.response, "assistant");
      addMessage("Hello! How can I help you today?", "assistant");
      setStatus("Context reset.");
      messageInput.focus();
    } catch (error) {
      console.error("Error:", error);
      addMessage(`Error: ${error.message}`, "error");
      setStatus(`Error: ${error.message}`, true);
    }
  }

  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });
  resetButton.addEventListener("click", resetConversation);

  messageInput.focus();
});
