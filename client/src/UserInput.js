import React from "react";

function UserInput({ input, setInput, sendMessage }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah input baris baru
      sendMessage();
    }
  };
  return (
    <div className="user-input">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button>
        <img
          className="mic-logo"
          src={require("./components/micLogo.png")}
          alt="logo"
        />
      </button>
      <button onClick={sendMessage}>
        <img
          className="send-logo"
          src={require("./components/sendLogo.png")}
          alt="logo"
        />
      </button>
    </div>
  );
}

export default UserInput;
