import { useState, useEffect, useRef } from "react";

const BOT_RESPONSES = [
  "Thanks for reaching out! Our team will assist you shortly. 😊",
  "I understand your concern. Can you please share your Order ID?",
  "You can track your order using the 'Track Order' button above!",
  "For urgent issues, call us at 1800-123-456 (Mon-Sat, 9AM-6PM).",
  "Your satisfaction is our priority! We'll resolve this soon. 🙏",
];

function SupportChat({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! Welcome to LocalMart Support. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");

    setMessages(prev => [...prev, { from: "user", text: userMsg }]);

    setTimeout(() => {
      const response = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      setMessages(prev => [...prev, { from: "bot", text: response }]);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{
      position: "fixed", bottom: 90, right: 24,
      width: 320, background: "#fff", borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      zIndex: 60, display: "flex", flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "#1a5c38", color: "#fff",
        padding: "14px 18px", display: "flex",
        justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 14 }}>LocalMart Support</p>
          <p style={{ fontSize: 11, opacity: 0.8 }}>🟢 Online now</p>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none",
          color: "#fff", fontSize: 20, cursor: "pointer"
        }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{
        height: 280, overflowY: "auto",
        padding: "14px 14px", display: "flex",
        flexDirection: "column", gap: 10
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              maxWidth: "78%", padding: "9px 13px",
              borderRadius: msg.from === "user"
                ? "12px 12px 2px 12px"
                : "12px 12px 12px 2px",
              background: msg.from === "user" ? "#1a5c38" : "#f0ede6",
              color: msg.from === "user" ? "#fff" : "#1a1a18",
              fontSize: 13, lineHeight: 1.4
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px", borderTop: "1px solid #e8e5de",
        display: "flex", gap: 8
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message..."
          style={{
            flex: 1, padding: "8px 12px",
            border: "1.5px solid #e8e5de",
            borderRadius: 50, fontSize: 13, outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#1a5c38", color: "#fff",
            border: "none", borderRadius: "50%",
            width: 36, height: 36, fontSize: 16,
            cursor: "pointer"
          }}
        >➤</button>
      </div>
    </div>
  );
}

export default SupportChat;