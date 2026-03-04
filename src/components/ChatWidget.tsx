import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Minus, Phone, Video, Send, Smile, Paperclip, Search, ChevronDown, CheckCheck, Mic } from "lucide-react";
import { conversations } from "@/data/dummyData";
import { cn } from "@/lib/utils";

interface ChatWindow {
  id: string;
  convo: (typeof conversations)[0];
  minimized: boolean;
  messages: Array<{ id: number; sender: "me" | "them"; text: string; time: string }>;
  inputVal: string;
  isTyping: boolean;
  callState: null | "audio" | "video";
}

const MAX_WINDOWS = 10;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [chatWindows, setChatWindows] = useState<ChatWindow[]>([]);
  const [search, setSearch] = useState("");

  const openChat = (convo: (typeof conversations)[0]) => {
    const exists = chatWindows.find((w) => w.id === String(convo.id));
    if (exists) {
      setChatWindows((prev) =>
        prev.map((w) => w.id === String(convo.id) ? { ...w, minimized: false } : w)
      );
      setOpen(false);
      return;
    }
    if (chatWindows.length >= MAX_WINDOWS) return;
    setChatWindows((prev) => [
      ...prev,
      {
        id: String(convo.id),
        convo,
        minimized: false,
        messages: convo.messages.map((m) => ({ ...m, sender: (m.sender === "me" ? "me" : "them") as "me" | "them" })),
        inputVal: "",
        isTyping: false,
        callState: null,
      },
    ]);
    setOpen(false);
  };

  const closeWindow = (id: string) =>
    setChatWindows((prev) => prev.filter((w) => w.id !== id));

  const toggleMinimize = (id: string) =>
    setChatWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: !w.minimized } : w));

  const sendMessage = (id: string) => {
    setChatWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id || !w.inputVal.trim()) return w;
        const newMsg = {
          id: w.messages.length + 1,
          sender: "me" as const,
          text: w.inputVal,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        return { ...w, messages: [...w.messages, newMsg], inputVal: "", isTyping: true };
      })
    );
    // Simulate reply
    setTimeout(() => {
      setChatWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          return {
            ...w, isTyping: false,
            messages: [...w.messages, {
              id: w.messages.length + 2,
              sender: "them" as const,
              text: "Thanks! I'll get back to you shortly.",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }],
          };
        })
      );
    }, 2000);
  };

  const startCall = (id: string, type: "audio" | "video") => {
    setChatWindows((prev) => prev.map((w) => w.id === id ? { ...w, callState: type, minimized: false } : w));
  };
  const endCall = (id: string) => {
    setChatWindows((prev) => prev.map((w) => w.id === id ? { ...w, callState: null } : w));
  };

  const filtered = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Visible windows (rightmost = most recent)
  const visibleCount = Math.min(chatWindows.length, 3);
  const visibleWindows = chatWindows.slice(-visibleCount);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-end gap-2">
      {/* Chat windows (right to left) */}
      <div className="flex items-end gap-2 flex-row-reverse">
        {visibleWindows.map((win) => (
          <ChatWindowPanel
            key={win.id}
            win={win}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => toggleMinimize(win.id)}
            onSend={() => sendMessage(win.id)}
            onInput={(v) => setChatWindows((prev) => prev.map((w) => w.id === win.id ? { ...w, inputVal: v } : w))}
            onCall={(type) => startCall(win.id, type)}
            onEndCall={() => endCall(win.id)}
          />
        ))}
      </div>

      {/* Main chat button + panel */}
      <div className="relative flex flex-col items-end gap-2">
        {/* Conversation list panel */}
        {open && (
          <div className="absolute bottom-14 right-0 w-72 bg-card border border-border rounded-xl shadow-float animate-scale-in overflow-hidden">
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">Messaging</span>
                <span className="text-[10px] text-muted-foreground">{chatWindows.length}/{MAX_WINDOWS} open</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full h-8 pl-8 pr-3 rounded-lg bg-muted text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filtered.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => openChat(convo)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="relative shrink-0">
                    <img src={convo.user.avatar} alt={convo.user.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold truncate">{convo.user.name}</span>
                      <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-primary-foreground">
                      {convo.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-blue flex items-center justify-center hover:opacity-90 transition-all relative"
        >
          {open ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
          {conversations.reduce((a, c) => a + c.unread, 0) > 0 && !open && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">
              {conversations.reduce((a, c) => a + c.unread, 0)}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

interface PanelProps {
  win: ChatWindow;
  onClose: () => void;
  onMinimize: () => void;
  onSend: () => void;
  onInput: (v: string) => void;
  onCall: (type: "audio" | "video") => void;
  onEndCall: () => void;
}

const ChatWindowPanel = ({ win, onClose, onMinimize, onSend, onInput, onCall, onEndCall }: PanelProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [win.messages, win.minimized]);

  return (
    <div className={cn("w-72 bg-card border border-border rounded-xl shadow-float overflow-hidden flex flex-col transition-all duration-200 animate-scale-in", win.minimized ? "h-12" : "h-96")}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-card border-b border-border cursor-pointer shrink-0" onClick={onMinimize}>
        <div className="relative shrink-0">
          <img src={win.convo.user.avatar} alt={win.convo.user.name} className="w-7 h-7 rounded-full object-cover" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-card" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate">{win.convo.user.name}</p>
          {!win.minimized && <p className="text-[10px] text-green-500">Active now</p>}
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onCall("audio")} className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center">
            <Phone className="h-3 w-3 text-muted-foreground" />
          </button>
          <button onClick={() => onCall("video")} className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center">
            <Video className="h-3 w-3 text-muted-foreground" />
          </button>
          <button onClick={onMinimize} className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center">
            <Minus className="h-3 w-3 text-muted-foreground" />
          </button>
          <button onClick={onClose} className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center">
            <X className="h-3 w-3 text-muted-foreground" />
          </button>
        </div>
      </div>

      {!win.minimized && (
        <>
          {/* Call overlay */}
          {win.callState && (
            <div className="absolute inset-0 bg-background/95 z-10 flex flex-col items-center justify-center gap-4 rounded-xl">
              <div className="relative">
                <img src={win.convo.user.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-30" />
              </div>
              <p className="font-semibold text-sm">{win.convo.user.name}</p>
              <p className="text-xs text-muted-foreground">{win.callState === "audio" ? "Audio call" : "Video call"} connecting...</p>
              <div className="flex items-center gap-4">
                {win.callState === "video" && (
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Video className="h-4 w-4 text-primary-foreground" />
                  </button>
                )}
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Mic className="h-4 w-4 text-primary-foreground" />
                </button>
                <button onClick={onEndCall} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white rotate-[135deg]" />
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {win.messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-2", msg.sender === "me" ? "flex-row-reverse" : "")}>
                {msg.sender === "them" && (
                  <img src={win.convo.user.avatar} alt="" className="w-5 h-5 rounded-full object-cover self-end shrink-0" />
                )}
                <div className={cn("max-w-[75%] px-3 py-1.5 rounded-2xl text-xs", msg.sender === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm")}>
                  <p>{msg.text}</p>
                  <div className={cn("flex items-center gap-0.5 mt-0.5", msg.sender === "me" ? "justify-end" : "")}>
                    <span className={cn("text-[9px]", msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground")}>{msg.time}</span>
                    {msg.sender === "me" && <CheckCheck className="h-2.5 w-2.5 text-primary-foreground/60" />}
                  </div>
                </div>
              </div>
            ))}
            {win.isTyping && (
              <div className="flex gap-2">
                <img src={win.convo.user.avatar} alt="" className="w-5 h-5 rounded-full object-cover self-end" />
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
                  {[0,1,2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <button className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center">
                <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <input
                type="text"
                placeholder="Write a message..."
                value={win.inputVal}
                onChange={(e) => onInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSend()}
                className="flex-1 h-8 px-3 rounded-full bg-muted text-xs focus:outline-none focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground"
              />
              <button
                onClick={onSend}
                disabled={!win.inputVal.trim()}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="h-3.5 w-3.5 text-primary-foreground" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWidget;
