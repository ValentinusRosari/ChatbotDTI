import React, { useState, useEffect } from "react";
import "./App.css";
import ChatMessage from "./ChatMessage";
import UserInput from "./UserInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasDisplayedGreeting, setHasDisplayedGreeting] = useState(false);
  const [newMessageAdded, setNewMessageAdded] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleToggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  useEffect(() => {
    // Check if the greeting message has been displayed before
    if (!hasDisplayedGreeting) {
      // Display a greeting message when the component loads
      const greetingMessage = "Halo, apa yang bisa saya bantu?";
      addMessage(greetingMessage, false);
      setHasDisplayedGreeting(true); // Set the flag to indicate the greeting has been displayed
    }
  }, [messages, hasDisplayedGreeting]);

  function scrollToBottom() {
    const chatMessages = document.querySelector(".chat-messages"); // Menggunakan querySelector dengan class name
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  useEffect(() => {
    if (newMessageAdded) {
      scrollToBottom();
      setNewMessageAdded(false); // Setel kembali ke false setelah pengguliran selesai
    }
  }, [newMessageAdded]);

  const addMessage = (message, user) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      if (user) {
        // Jika pesan adalah dari pengguna, tambahkan langsung ke daftar pesan
        newMessages.push({ text: message, user });
      } else {
        // Jika pesan adalah dari bot, periksa apakah ada pesan pengguna sebelumnya
        // Jika tidak ada, tambahkan pesan bot ke daftar pesan
        if (
          newMessages.length === 0 ||
          newMessages[newMessages.length - 1].user
        ) {
          newMessages.push({ text: message, user });
        }
      }
      setNewMessageAdded(true);
      return newMessages;
    });
  };

  const handleUserInput = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat
    addMessage(input, true);

    // Clear the input field
    setInput("");

    // Simulate a "typing" indicator while the bot processes the message
    setIsTyping(true);

    try {
      // Send the user message to your server for processing
      await sendMessageToServer(input);
    } catch (error) {
      console.error("Error processing bot response:", error);
    } finally {
      setIsTyping(false); // Turn off the "typing" indicator
    }
  };

  const sendMessageToServer = async (userMessages) => {
    try {
      const apiUrl = "https://backendopenaidssdi.azurewebsites.net/chatbot";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userMessages }),
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat menghubungi server.");
      }

      const responseData = await response.json();

      // Lakukan sesuatu dengan data yang diterima dari server (responseData)
      // Misalnya, panggil fungsi addMessage dengan pesan dari server
      addMessage(responseData.response, false);
    } catch (error) {
      console.error("Error:", error.message);
      addMessage("Terjadi kesalahan saat berkomunikasi dengan server.", false);
    }
  };

  return (
    <div className="app-container">
      <button className="toggle-button" onClick={handleToggleChatbot}>
        <img
          className="toggle-logo"
          src={require("./components/toggleBtnLogo.png")}
          alt="logo"
        />
        {chatbotOpen}
      </button>
      <div className={`chatbot-container ${chatbotOpen ? "open" : "closed"}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-container">
            <div className="chatbot-header-logo">
              <img
                className="chatbot-logo"
                src={require("./components/chatbotLogo.png")}
                alt="logo"
              />
            </div>
            <div className="bot-name">
              UGM ChatBot<p>Powered with GPT 3.5</p>
            </div>
            <button className="faq-button">FAQ</button>
            <button className="close-button" onClick={handleToggleChatbot}>
              <img
                className="close-logo"
                src={require("./components/closeBtnLogo.png")}
                alt="logo"
              />
            </button>
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isTyping && <div className="message bot">Bot is typing...</div>}
        </div>
        <UserInput
          input={input}
          setInput={setInput}
          sendMessage={handleUserInput}
        />
      </div>
    </div>
  );
}

export default App;
