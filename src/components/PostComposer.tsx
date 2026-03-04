import { useState, useRef } from "react";
import {
  Image as ImageIcon, Code2, FileText, BarChart2, Video,
  X, Bold, Italic, Link2, List, Hash, AtSign, Smile,
  ChevronDown, Globe, Upload, Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dummyProfiles } from "@/data/dummyData";

const me = dummyProfiles[0];

const MENTION_SUGGESTIONS = dummyProfiles.slice(1, 6).map(p => ({
  id: p.id,
  name: p.name,
  role: p.role,
  avatar: p.avatar,
  handle: p.handle,
}));

type PostMode = "post" | "article" | "code" | "poll";

interface MentionUser {
  id: string | number;
  name: string;
  role: string;
  avatar: string;
  handle: string;
}

const ArticleEditor = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (format: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    let newText = content;
    let insertion = "";
    switch (format) {
      case "h1": insertion = `\n# ${selected || "Heading 1"}\n`; break;
      case "h2": insertion = `\n## ${selected || "Heading 2"}\n`; break;
      case "h3": insertion = `\n### ${selected || "Heading 3"}\n`; break;
      case "bold": insertion = `**${selected || "bold text"}**`; break;
      case "italic": insertion = `*${selected || "italic text"}*`; break;
      case "link": insertion = `[${selected || "link text"}](url)`; break;
      case "list": insertion = `\n- ${selected || "list item"}\n`; break;
      case "code": insertion = `\`\`\`\n${selected || "code here"}\n\`\`\``; break;
    }
    newText = content.slice(0, start) + insertion + content.slice(end);
    setContent(newText);
    setTimeout(() => ta.focus(), 0);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    const lastAt = val.lastIndexOf("@");
    if (lastAt !== -1 && lastAt === val.length - 1) {
      setShowMentions(true);
      setMentionQuery("");
    } else if (lastAt !== -1 && showMentions) {
      const query = val.slice(lastAt + 1);
      if (query.includes(" ")) { setShowMentions(false); }
      else setMentionQuery(query);
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (user: MentionUser) => {
    const lastAt = content.lastIndexOf("@");
    const newContent = content.slice(0, lastAt) + `@${user.handle} `;
    setContent(newContent);
    setShowMentions(false);
  };

  const filtered = MENTION_SUGGESTIONS.filter(u =>
    u.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    u.handle.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Article toolbar */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-1 flex-wrap">
          {[
            { label: "H1", action: "h1" }, { label: "H2", action: "h2" }, { label: "H3", action: "h3" },
          ].map(({ label, action }) => (
            <button key={action} onClick={() => applyFormat(action)}
              className="px-2 py-1 text-xs font-bold rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              {label}
            </button>
          ))}
          <div className="w-px h-5 bg-border mx-1" />
          <button onClick={() => applyFormat("bold")} className="p-1.5 rounded hover:bg-muted transition-colors"><Bold className="h-3.5 w-3.5" /></button>
          <button onClick={() => applyFormat("italic")} className="p-1.5 rounded hover:bg-muted transition-colors"><Italic className="h-3.5 w-3.5" /></button>
          <button onClick={() => applyFormat("link")} className="p-1.5 rounded hover:bg-muted transition-colors"><Link2 className="h-3.5 w-3.5" /></button>
          <button onClick={() => applyFormat("list")} className="p-1.5 rounded hover:bg-muted transition-colors"><List className="h-3.5 w-3.5" /></button>
          <button onClick={() => applyFormat("code")} className="p-1.5 rounded hover:bg-muted transition-colors"><Code2 className="h-3.5 w-3.5" /></button>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-w-3xl mx-auto w-full px-6 py-8">
        <input
          type="text"
          placeholder="Article title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full text-3xl font-black bg-transparent border-none outline-none placeholder:text-muted-foreground/40 mb-6"
        />
        <div className="relative">
          <textarea
            ref={textareaRef}
            placeholder="Write your article... Use # for headings, **bold**, *italic*, @mention users or companies"
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-[60vh] bg-transparent border-none outline-none text-base leading-relaxed resize-none placeholder:text-muted-foreground/50 font-mono"
          />
          {showMentions && filtered.length > 0 && (
            <div className="absolute left-0 bg-card border border-border rounded-xl shadow-float z-20 w-64 py-1 overflow-hidden">
              {filtered.map(u => (
                <button key={u.id} onClick={() => insertMention(u)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-left">
                  <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium leading-none">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.role}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="h-3.5 w-3.5" />
          <span>Visible to everyone</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="btn-ghost text-sm py-2 px-4">Discard</button>
          <button
            disabled={!title.trim() || !content.trim()}
            className="btn-primary text-sm py-2 px-5 disabled:opacity-50 disabled:pointer-events-none"
          >
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

const PostComposer = () => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<PostMode>("post");
  const [showArticleEditor, setShowArticleEditor] = useState(false);
  const [attachments, setAttachments] = useState<{ type: "image" | "video" | "file"; name: string; preview?: string }[]>([]);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [codeText, setCodeText] = useState("");
  const [codeLang, setCodeLang] = useState("javascript");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [visibility, setVisibility] = useState("Everyone");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    const lastAt = val.lastIndexOf("@");
    if (lastAt !== -1 && (lastAt === val.length - 1 || !val.slice(lastAt + 1).includes(" "))) {
      setShowMentions(true);
      setMentionQuery(val.slice(lastAt + 1));
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (user: MentionUser) => {
    const lastAt = text.lastIndexOf("@");
    setText(text.slice(0, lastAt) + `@${user.handle} `);
    setShowMentions(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video" | "file") => {
    const files = Array.from(e.target.files || []);
    const newAttachments = files.map(f => ({
      type,
      name: f.name,
      preview: type === "image" ? URL.createObjectURL(f) : undefined,
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const filtered = MENTION_SUGGESTIONS.filter(u =>
    u.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    u.handle.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  if (showArticleEditor) {
    return <ArticleEditor onClose={() => setShowArticleEditor(false)} />;
  }

  return (
    <div className="feed-post mb-4">
      <div className="flex items-center gap-3">
        <img src={me.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover shrink-0" />
        <button
          className="flex-1 h-10 px-4 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground text-left hover:bg-muted hover:border-primary/30 transition-colors"
          onClick={() => setExpanded(true)}
        >
          Share your insight or achievement...
        </button>
      </div>

      {expanded && (
        <div className="mt-4 animate-fade-in">
          {/* Mode tabs */}
          <div className="flex items-center gap-1 mb-3 border-b border-border pb-3">
            {(["post", "code", "poll"] as PostMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  mode === m ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                {m === "code" ? "Code Block" : m === "poll" ? "Poll" : "Post"}
              </button>
            ))}
          </div>

          {mode === "post" && (
            <div className="relative">
              <textarea
                autoFocus
                placeholder="What's on your mind? Use @ to mention users/companies, # for hashtags..."
                value={text}
                onChange={handleTextChange}
                className="w-full min-h-28 p-3 rounded-xl bg-muted/30 border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
              {showMentions && filtered.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-card border border-border rounded-xl shadow-float z-20 w-64 py-1">
                  {filtered.map(u => (
                    <button key={u.id} onClick={() => insertMention(u)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-left">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium leading-none">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {mode === "code" && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <select value={codeLang} onChange={e => setCodeLang(e.target.value)}
                  className="text-xs bg-muted border border-border rounded-lg px-2 py-1 focus:outline-none">
                  {["javascript", "typescript", "python", "rust", "go", "solidity", "java", "c++", "sql"].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
              <textarea
                autoFocus
                placeholder={`// Write your ${codeLang} code here...`}
                value={codeText}
                onChange={e => setCodeText(e.target.value)}
                className="w-full min-h-36 p-3 rounded-xl bg-muted/50 border border-border text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
              <textarea
                placeholder="Add a caption or explanation..."
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full mt-2 min-h-14 p-3 rounded-xl bg-muted/30 border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>
          )}

          {mode === "poll" && (
            <div>
              <textarea
                autoFocus
                placeholder="Ask a question..."
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full min-h-20 p-3 rounded-xl bg-muted/30 border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground mb-3"
              />
              {pollOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={e => {
                      const newOpts = [...pollOptions];
                      newOpts[i] = e.target.value;
                      setPollOptions(newOpts);
                    }}
                    className="flex-1 h-9 px-3 rounded-lg bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {i > 1 && (
                    <button onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))}
                      className="p-1.5 rounded-full hover:bg-muted transition-colors">
                      <X className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))}
              {pollOptions.length < 4 && (
                <button onClick={() => setPollOptions([...pollOptions, ""])}
                  className="text-xs text-primary font-medium hover:underline mt-1">
                  + Add option
                </button>
              )}
            </div>
          )}

          {/* Attachments preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {attachments.map((att, i) => (
                <div key={i} className="relative group">
                  {att.type === "image" && att.preview ? (
                    <img src={att.preview} alt={att.name} className="w-20 h-20 rounded-lg object-cover border border-border" />
                  ) : (
                    <div className="w-24 h-14 rounded-lg bg-muted border border-border flex flex-col items-center justify-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground truncate w-20 text-center px-1">{att.name}</span>
                    </div>
                  )}
                  <button onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-0.5">
              {/* Photo */}
              <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleFileSelect(e, "image")} />
              <button onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Photo</span>
              </button>

              {/* Video */}
              <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={e => handleFileSelect(e, "video")} />
              <button onClick={() => videoInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </button>

              {/* File/Doc */}
              <input ref={docInputRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" multiple className="hidden" onChange={e => handleFileSelect(e, "file")} />
              <button onClick={() => docInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">File</span>
              </button>

              {/* Article */}
              <button onClick={() => setShowArticleEditor(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Article</span>
              </button>

              {/* Mention */}
              <button onClick={() => setText(text + "@")}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <AtSign className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Visibility */}
              <button
                onClick={() => setVisibility(v => v === "Everyone" ? "Connections" : "Everyone")}
                className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1 hover:bg-muted transition-colors">
                <Globe className="h-3 w-3" />
                {visibility}
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => { setExpanded(false); setText(""); setAttachments([]); }}>
                Cancel
              </button>
              <button
                className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none"
                disabled={!text.trim() && !codeText.trim() && attachments.length === 0}
              >
                <Send className="h-3.5 w-3.5" />
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border flex-wrap">
          {[
            { icon: ImageIcon, label: "Photo", action: () => { setExpanded(true); setMode("post"); } },
            { icon: Video, label: "Video", action: () => { setExpanded(true); setMode("post"); } },
            { icon: Code2, label: "Code", action: () => { setExpanded(true); setMode("code"); } },
            { icon: BarChart2, label: "Poll", action: () => { setExpanded(true); setMode("poll"); } },
            { icon: FileText, label: "Article", action: () => setShowArticleEditor(true) },
          ].map(({ icon: Icon, label, action }) => (
            <button key={label} onClick={action}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium">
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostComposer;
