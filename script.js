async function getChatbotResponse() {
    const inputField = document.getElementById("userInput");
    const userInput = inputField.value.trim();
    const chatbotResponse = document.getElementById("chatbotResponse");
  
    if (!userInput) {
      chatbotResponse.innerHTML = "⚠️ Please enter a question.";
      return;
    }
  
    chatbotResponse.innerHTML = "⏳ Thinking...";
  
    try {
      const apiKey = "AIzaSyC0cUJVxN2NC303B-LzZo8jXM7FwQe9-bQ";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userInput }] }]
        })
      });
  
      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
      chatbotResponse.innerHTML = reply || "❌ No response from Gemini.";
    } catch (error) {
      chatbotResponse.innerHTML = "⚠️ Error: " + error.message;
    }
  }
  
  function fillQuestion(button) {
    const question = button.innerText.trim();
    document.getElementById("userInput").value = question;
    getChatbotResponse();
  }