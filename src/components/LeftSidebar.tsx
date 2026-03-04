import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, Briefcase, Trophy, Building2, CheckCircle, TrendingUp,
  Plus, X, ExternalLink, Globe, Github, Twitter, Linkedin, Edit2, Save
} from "lucide-react";
import { dummyProfiles } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const CompletionRing = ({ percent }: { percent: number }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const stroke = circ - (percent / 100) * circ;
  return (
    <svg width="56" height="56" className="rotate-[-90deg]">
      <circle cx="28" cy="28" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
      <circle
        cx="28" cy="28" r={r} fill="none"
        stroke="hsl(var(--primary))" strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={stroke}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
};

const DEFAULT_LINKS = [
  { icon: Globe, label: "Portfolio", url: "https://portfolio.dev", id: "portfolio" },
  { icon: Github, label: "GitHub", url: "https://github.com", id: "github" },
];

const LeftSidebar = () => {
  const me = dummyProfiles[0];
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [editingLinks, setEditingLinks] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const addLink = () => {
    if (!newUrl.trim()) return;
    setLinks(prev => [...prev, { icon: Globe, label: newLabel || newUrl, url: newUrl, id: Date.now().toString() }]);
    setNewUrl("");
    setNewLabel("");
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  return (
    <aside className="space-y-3">
      {/* Mini Profile Card */}
      <div className="card-premium overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-primary/20 to-primary/5 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=100&fit=crop')] bg-cover bg-center opacity-40" />
        </div>
        <div className="px-4 pb-4 -mt-6">
          <div className="relative inline-block">
            <CompletionRing percent={me.completeness} />
            <img
              src={me.avatar}
              alt={me.name}
              className="absolute inset-0 m-auto w-10 h-10 rounded-full object-cover border-2 border-card"
            />
          </div>
          <div className="mt-1">
            <div className="flex items-center gap-1.5">
              <Link to={`/profile/${me.handle}`} className="font-semibold text-sm hover:text-primary">
                {me.name}
              </Link>
              <CheckCircle className="h-3.5 w-3.5 text-primary fill-primary/20" />
            </div>
            <p className="text-xs text-muted-foreground">{me.role}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="badge-talent">
                <TrendingUp className="h-3 w-3" />
                Score {me.talentScore}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border">
            <div className="text-center">
              <p className="font-bold text-sm">{me.followers.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-sm">{me.connections}</p>
              <p className="text-[11px] text-muted-foreground">Connections</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Links */}
      <div className="card-premium p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-foreground">My Links</h4>
          <button
            onClick={() => setEditingLinks(!editingLinks)}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            {editingLinks ? <Save className="h-3.5 w-3.5 text-primary" /> : <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />}
          </button>
        </div>
        <div className="space-y-1.5">
          {links.map(link => (
            <div key={link.id} className="flex items-center gap-2 group">
              <link.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1 truncate flex-1"
              >
                {link.label}
                <ExternalLink className="h-2.5 w-2.5 shrink-0" />
              </a>
              {editingLinks && (
                <button onClick={() => removeLink(link.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3 w-3 text-destructive" />
                </button>
              )}
            </div>
          ))}
        </div>

        {editingLinks && (
          <div className="mt-2 pt-2 border-t border-border space-y-1.5">
            <input
              type="text"
              placeholder="Label (e.g. Portfolio)"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="w-full h-7 px-2 rounded-md bg-muted/50 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
            <div className="flex gap-1.5">
              <input
                type="url"
                placeholder="https://..."
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                className="flex-1 h-7 px-2 rounded-md bg-muted/50 border border-border text-xs focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
              <button onClick={addLink} className="h-7 px-2 rounded-md bg-primary text-primary-foreground text-xs hover:opacity-90 transition-opacity">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shortcuts */}
      <div className="card-premium p-1">
        {[
          { icon: Users, label: "My Network", path: "/network", count: "124 new" },
          { icon: Trophy, label: "Hackathons", path: "/hackathons", count: "3 live" },
          { icon: Briefcase, label: "Jobs", path: "/jobs", count: "12 matches" },
          { icon: Building2, label: "Companies", path: "/companies", count: null },
        ].map(({ icon: Icon, label, path, count }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            {count && (
              <span className="text-[11px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
