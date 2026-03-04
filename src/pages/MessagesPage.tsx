import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreHorizontal, Search, Check, CheckCheck, Smile, Paperclip, Mic } from "lucide-react";
import { conversations } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const MessagesPage = () => {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(activeConvo.messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(activeConvo.messages);
  }, [activeConvo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: "me" as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");

    // Simulate typing + reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "them",
          text: "Thanks for reaching out! Let me think about that and get back to you shortly.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 2000);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-14 pb-16 h-screen flex flex-col">
      <div className="flex flex-1 rounded-xl overflow-hidden border border-border shadow-card mt-2">
        {/* Conversation List */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-sm mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full h-8 pl-8 pr-3 rounded-lg bg-muted text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left",
                  activeConvo.id === convo.id && "bg-primary/5 border-r-2 border-primary"
                )}
              >
                <div className="relative shrink-0">
                  <img src={convo.user.avatar} alt={convo.user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate">{convo.user.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-1">{convo.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                    {convo.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={activeConvo.user.avatar} alt={activeConvo.user.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <p className="font-semibold text-sm">{activeConvo.user.name}</p>
                <p className="text-[11px] text-green-600 dark:text-green-400">Active now · {activeConvo.user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <Phone className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <Video className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={cn("flex gap-2.5 animate-fade-in", msg.sender === "me" ? "flex-row-reverse" : "")}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {msg.sender === "them" && (
                  <img src={activeConvo.user.avatar} alt="" className="w-7 h-7 rounded-full object-cover self-end shrink-0" />
                )}
                <div
                  className={cn(
                    "max-w-xs px-4 py-2.5 rounded-2xl text-sm",
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card border border-border rounded-bl-sm"
                  )}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className={cn("flex items-center gap-1 mt-1", msg.sender === "me" ? "justify-end" : "")}>
                    <span className={cn("text-[10px]", msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {msg.time}
                    </span>
                    {msg.sender === "me" && (
                      <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5 animate-fade-in">
                <img src={activeConvo.user.avatar} alt="" className="w-7 h-7 rounded-full object-cover self-end" />
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Encryption note */}
          <div className="px-5 py-1 text-center">
            <p className="text-[10px] text-muted-foreground">🔒 Encrypted in transit and at rest</p>
          </div>

          {/* Input */}
          <div className="p-4 bg-card border-t border-border">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="w-full h-10 px-4 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Smile className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-all hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
