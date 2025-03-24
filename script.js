function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  addMessage(userInput, "user");
  document.getElementById("userInput").value = "";

  // Kirim pertanyaan ke backend
  fetch("http://localhost:3000/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      addMessage(data.answer, "ai");
    })
    .catch((error) => {
      console.error("Error fetching response:", error);
      addMessage("Terjadi kesalahan, coba lagi nanti.", "ai");
    });
}

// Fungsi untuk menampilkan pesan di chat
function addMessage(message, sender) {
  const messagesContainer = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-bubble");
  messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
