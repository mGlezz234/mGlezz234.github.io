document.getElementById("feedbackForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const feedbackMessage = document.getElementById("feedbackMessage").value.trim();
  const username = localStorage.getItem("username") || "Guest"; // Gunakan "Guest" jika username tidak ditemukan
  if (!feedbackMessage) {
      document.getElementById("feedbackResponse").innerText = "Feedback tidak boleh kosong.";
      return;
  }
  const data = {
      username: username,
      feedback: feedbackMessage,
  };
  try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxVmxqi-dTZhEAxTml2UT3KQzjS4G8WYvQNoNF7_j8XUyE6E34w7-oDKb-jiDK_9fE/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      });
const result = await response.json();
      if (result.status === "success") {
          document.getElementById("feedbackResponse").innerText = "Feedback terkirim!";
          document.getElementById("feedbackMessage").value = ""; // Kosongkan input setelah sukses
      } else {
          document.getElementById("feedbackResponse").innerText = "Gagal mengirim feedback.";
      }
  } catch (error) {
      console.error("Error:", error);
      document.getElementById("feedbackResponse").innerText = "Terjadi kesalahan. Coba lagi.";
  }
});
