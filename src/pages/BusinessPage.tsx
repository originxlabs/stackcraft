import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2, BadgeCheck, TrendingUp, Users, Globe, Shield,
  ArrowRight, CheckCircle2, Star, Zap, BarChart3, Megaphone,
  Briefcase, Code2, Award, MessageSquare, Bell, ChevronRight,
  Package, PenLine, UserPlus, Eye, Share2, Layers, LucideIcon,
  Play, Rocket, Crown, Lock, Moon, Sun, X, Check, Target,
  LineChart, PieChart, HeartHandshake, Sparkles, Network,
  FileSearch, Bot, Lightbulb, Activity, Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/stackcraft-logo.svg";

/* ─── Compact stat bubble ─── */
const StatBubble = ({ val, label, icon: Icon, color }: { val: string; label: string; icon: LucideIcon; color: string }) => (
  <div className="flex flex-col items-center text-center gap-1">
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-1", color)}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <span className="text-2xl md:text-3xl font-black text-foreground">{val}</span>
    <span className="text-xs text-muted-foreground font-medium leading-tight max-w-[90px]">{label}</span>
  </div>
);

/* ─── Plan card ─── */
const PlanCard = ({
  name, price, period, desc, features, highlighted, badge,
}: {
  name: string; price: string; period: string; desc: string;
  features: string[]; highlighted?: boolean; badge?: string;
}) => (
  <div className={cn(
    "relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:-translate-y-1",
    highlighted
      ? "bg-primary border-primary/30 text-primary-foreground shadow-[0_0_60px_-10px_hsl(var(--primary)/0.5)]"
      : "bg-card border-border shadow-sm hover:shadow-lg"
  )}>
    {badge && (
      <div className={cn(
        "absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full",
        highlighted ? "bg-white text-primary" : "bg-primary text-primary-foreground"
      )}>{badge}</div>
    )}
    <p className={cn("text-xs font-semibold uppercase tracking-widest mb-2", highlighted ? "text-white/70" : "text-muted-foreground")}>{name}</p>
    <div className="flex items-end gap-1 mb-1">
      <span className="text-4xl font-black">{price}</span>
      {price !== "Custom" && <span className={cn("text-sm mb-1.5", highlighted ? "text-white/60" : "text-muted-foreground")}>{period}</span>}
    </div>
    <p className={cn("text-sm mb-6", highlighted ? "text-white/70" : "text-muted-foreground")}>{desc}</p>
    <ul className="space-y-3 flex-1 mb-8">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2.5 text-sm">
          <Check className={cn("h-4 w-4 shrink-0 mt-0.5", highlighted ? "text-white" : "text-green-500")} />
          <span className={highlighted ? "text-white/90" : "text-foreground/80"}>{f}</span>
        </li>
      ))}
    </ul>
    <button className={cn(
      "w-full py-3 rounded-full font-semibold text-sm transition-all duration-200",
      highlighted
        ? "bg-white text-primary hover:bg-white/90"
        : "bg-primary text-primary-foreground hover:opacity-90"
    )}>
      {name === "Enterprise" ? "Contact Sales →" : "Get Started Free →"}
    </button>
  </div>
);

/* ─── Feature tile ─── */
const FeatureTile = ({ icon: Icon, title, desc, accent }: { icon: LucideIcon; title: string; desc: string; accent: string }) => (
  <div className="group card-premium p-6 hover:-translate-y-1 transition-all duration-200 cursor-default">
    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110", accent)}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <h3 className="font-bold text-sm mb-1.5">{title}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

/* ─── Registration step form ─── */
const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "", cin: "", website: "", industry: "",
    size: "", tagline: "", adminName: "", adminEmail: "", adminRole: "",
  });

  const industries = ["Technology", "Finance & Banking", "Healthcare", "E-commerce", "Manufacturing", "Media & Entertainment", "Education", "Consulting", "Other"];
  const sizes = ["1–10", "11–50", "51–200", "201–500", "501–1000", "1000+"];

  const steps = [
    { label: "Company", icon: Building2 },
    { label: "Details", icon: Layers },
    { label: "Admin", icon: Users },
    { label: "Done!", icon: Rocket },
  ];

  return (
    <div className="max-w-xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex-1 flex flex-col items-center relative">
              {i < steps.length - 1 && (
                <div className={cn(
                  "absolute top-5 left-[55%] w-full h-0.5 transition-all duration-500",
                  done ? "bg-primary" : "bg-border"
                )} />
              )}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-all duration-300",
                done ? "bg-primary text-primary-foreground" :
                active ? "bg-primary/10 border-2 border-primary text-primary" :
                "bg-muted text-muted-foreground"
              )}>
                {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>
              <span className={cn("text-[11px] font-semibold mt-1.5 transition-colors", active ? "text-primary" : "text-muted-foreground")}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="card-premium p-8">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black mb-1">Register your company</h3>
              <p className="text-sm text-muted-foreground">Start with your official company credentials</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Company Legal Name *</label>
              <input
                type="text" placeholder="e.g. OriginX Labs Private Limited"
                value={formData.companyName}
                onChange={e => setFormData(p => ({ ...p, companyName: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">CIN / Registration Number</label>
              <input
                type="text" placeholder="e.g. U72900MH2022PTC382011"
                value={formData.cin}
                onChange={e => setFormData(p => ({ ...p, cin: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
              <p className="text-[11px] text-muted-foreground mt-1">Used for MCA verification — gets you the verified badge</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Company Website *</label>
              <input
                type="url" placeholder="https://yourcompany.com"
                value={formData.website}
                onChange={e => setFormData(p => ({ ...p, website: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black mb-1">Company Details</h3>
              <p className="text-sm text-muted-foreground">Help professionals discover your company</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Industry *</label>
              <select
                value={formData.industry}
                onChange={e => setFormData(p => ({ ...p, industry: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              >
                <option value="">Select industry</option>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Company Size *</label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setFormData(p => ({ ...p, size: s }))}
                    className={cn(
                      "h-9 rounded-lg text-xs font-semibold border transition-all",
                      formData.size === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40"
                    )}
                  >{s} employees</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Tagline / Short Description</label>
              <textarea
                rows={2} placeholder="e.g. Building AI tools for the next billion developers"
                value={formData.tagline}
                onChange={e => setFormData(p => ({ ...p, tagline: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-black mb-1">Admin Account</h3>
              <p className="text-sm text-muted-foreground">You'll manage the company page from here</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Your Full Name *</label>
              <input
                type="text" placeholder="e.g. Ananya Krishnan"
                value={formData.adminName}
                onChange={e => setFormData(p => ({ ...p, adminName: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Work Email *</label>
              <input
                type="email" placeholder="you@company.com"
                value={formData.adminEmail}
                onChange={e => setFormData(p => ({ ...p, adminEmail: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
              <p className="text-[11px] text-muted-foreground mt-1">Must match your company's registered domain for instant verification</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Your Role *</label>
              <input
                type="text" placeholder="e.g. CHRO, HR Manager, Co-founder"
                value={formData.adminRole}
                onChange={e => setFormData(p => ({ ...p, adminRole: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
            <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-3">
              <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground/70">
                By registering, you confirm you are an authorised representative of this company.
                We verify all registrations against MCA and domain records within 24 hours.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-black mb-2">You're all set! 🎉</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your company registration is submitted. Verification usually takes under 24 hours.
                We'll email you as soon as your company page goes live.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link to="/company/1" className="btn-primary py-3 px-6">
                Preview Company Page <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/feed" className="btn-outline py-3 px-6">
                Explore Feed
              </Link>
            </div>
          </div>
        )}

        {step < 4 && (
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 h-11 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => setStep(s => Math.min(s + 1, 4))}
              className="flex-1 h-11 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {step === 3 ? "Submit Registration" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Dashboard mockup ─── */
const DashboardPreview = () => {
  const chartBars = [38, 62, 51, 74, 66, 88, 79, 95, 84, 72, 91, 100];

  return (
    <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden select-none">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-background border border-border rounded-lg px-4 py-1 flex items-center gap-2 text-xs text-muted-foreground w-64 justify-center">
            <Lock className="h-3 w-3 text-green-500" />
            stackcraft.com/company/dashboard
          </div>
        </div>
      </div>

      {/* Sidebar + main */}
      <div className="flex h-[440px]">
        {/* Sidebar */}
        <div className="w-52 border-r border-border bg-muted/20 p-4 flex flex-col gap-1 shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">OriginX Labs</p>
              <p className="text-[10px] text-muted-foreground">Admin</p>
            </div>
          </div>
          {[
            { icon: BarChart3, label: "Analytics", active: true },
            { icon: PenLine, label: "Posts" },
            { icon: Users, label: "People" },
            { icon: Briefcase, label: "Jobs" },
            { icon: Package, label: "Products" },
            { icon: Network, label: "Network" },
            { icon: MessageSquare, label: "Messages" },
            { icon: Settings2, label: "Settings" },
          ].map(({ icon: Icon, label, active }) => (
            <div key={label} className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors",
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </div>

        {/* Main dashboard */}
        <div className="flex-1 p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-bold">Analytics Overview</p>
            <div className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">Last 30 days</div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Profile Views", val: "12.4K", change: "+18%", up: true },
              { label: "Followers", val: "3,892", change: "+42%", up: true },
              { label: "Post Reach", val: "89.2K", change: "+31%", up: true },
              { label: "Applications", val: "284", change: "+12%", up: true },
            ].map(({ label, val, change, up }) => (
              <div key={label} className="bg-muted/40 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
                <p className="text-base font-black">{val}</p>
                <p className={cn("text-[10px] font-semibold", up ? "text-green-500" : "text-red-500")}>{change}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-muted/30 rounded-xl p-4 mb-4">
            <p className="text-[10px] font-semibold text-muted-foreground mb-3">Follower Growth</p>
            <div className="flex items-end gap-1 h-20">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary to-primary/30" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                <span key={m} className="text-[8px] text-muted-foreground">{m}</span>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="space-y-2">
            {[
              { icon: UserPlus, text: "47 new followers this week", color: "text-blue-500" },
              { icon: Eye, text: "New job post got 2,140 views", color: "text-purple-500" },
              { icon: Activity, text: "Talent Score ranking: Top 3%", color: "text-green-500" },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <Icon className={cn("h-3 w-3 shrink-0", color)} />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
};

/* ─── Company card for discovery section ─── */
const CompanyCard = ({ name, industry, followers, verified, logo: LogoUrl, following }: {
  name: string; industry: string; followers: string; verified: boolean; logo: string; following?: boolean;
}) => {
  const [isFollowing, setIsFollowing] = useState(following ?? false);
  return (
    <div className="card-premium p-5 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl border border-border overflow-hidden bg-muted flex items-center justify-center">
          <img src={LogoUrl} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
        <button
          onClick={() => setIsFollowing(f => !f)}
          className={cn(
            "text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all",
            isFollowing
              ? "bg-primary/10 border-primary/30 text-primary"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
          )}
        >
          {isFollowing ? "✓ Following" : "+ Follow"}
        </button>
      </div>
      <div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="font-bold text-sm">{name}</p>
          {verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground">{industry}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Users className="h-3 w-3" />
        {followers} followers
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   Business Page
═══════════════════════════════════════════════════════ */
const BusinessPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "register">("overview");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const features = [
    { icon: Building2, title: "Verified Company Page", desc: "Get MCA & domain-verified badge. Stand out with a fully branded, credible profile.", accent: "bg-primary" },
    { icon: PenLine, title: "Posts & Announcements", desc: "Share product launches, job openings, culture updates and company news in rich formats.", accent: "bg-purple-500" },
    { icon: Briefcase, title: "Smart Job Board", desc: "Post roles with Talent Score™ filters. AI-matches candidates by skill, not just keywords.", accent: "bg-orange-500" },
    { icon: Package, title: "Products & Services", desc: "Showcase your offerings with multimedia, pricing cards, and direct demo/enquiry CTAs.", accent: "bg-green-500" },
    { icon: Users, title: "Team & People", desc: "Display your verified team, org chart, and let employees link their profiles to your page.", accent: "bg-pink-500" },
    { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time follower growth, post impressions, job views, and competitive benchmarking.", accent: "bg-cyan-500" },
    { icon: Network, title: "B2B Company Connect", desc: "Follow, connect, and initiate strategic partnerships with other verified companies.", accent: "bg-amber-500" },
    { icon: Bot, title: "AI Talent Matching", desc: "Let our AI surface top profiles from 2.4M+ verified professionals matching your requirements.", accent: "bg-rose-500" },
    { icon: Bell, title: "Smart Notifications", desc: "Get alerts when top professionals engage with your content, apply for roles, or follow you.", accent: "bg-violet-500" },
    { icon: Megaphone, title: "Sponsored Content", desc: "Target promoted posts to specific roles, skills, companies, or geographic regions.", accent: "bg-teal-500" },
    { icon: FileSearch, title: "Talent Sourcing", desc: "Search and filter Stackcraft's verified talent pool by skill, score, availability and more.", accent: "bg-sky-500" },
    { icon: HeartHandshake, title: "Hackathon Sponsorship", desc: "Sponsor live hackathons, set your own problem statements, and recruit winners directly.", accent: "bg-emerald-500" },
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      desc: "Perfect for early-stage startups and small teams getting started.",
      features: [
        "Verified company page (MCA + domain)",
        "Up to 5 job postings/month",
        "Company posts & announcements",
        "Basic analytics dashboard",
        "Up to 10 team member profiles",
        "Follow & connect with companies",
      ],
    },
    {
      name: "Growth",
      price: "₹4,999",
      period: "/mo",
      desc: "For scaling companies that want to attract and engage top talent.",
      features: [
        "Everything in Starter",
        "Unlimited job postings",
        "Products & Services showcase",
        "Advanced analytics + export",
        "Unlimited team profiles",
        "AI Talent Matching (100 searches/mo)",
        "Sponsored post credits ₹2,000/mo",
        "Priority verification badge",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Bespoke solution for large enterprises, staffing firms & conglomerates.",
      features: [
        "Everything in Growth",
        "Dedicated account manager",
        "Unlimited AI talent searches",
        "Hackathon sponsorship package",
        "White-label career portal",
        "SSO & HRMS integrations",
        "Custom analytics & reporting API",
        "SLA-backed support",
      ],
    },
  ];

  const companyTestimonials = [
    {
      name: "Ananya Krishnan",
      role: "CHRO, OriginX Labs",
      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
      text: "We hired 12 engineers in 3 months through Stackcraft's verified talent pool. The Talent Score™ filter alone saved us 60% of screening time.",
    },
    {
      name: "Vikram Nair",
      role: "Head of Talent, Razorpay",
      img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=80&h=80&fit=crop",
      text: "Our sponsored job posts reached exactly the right engineers. The signal-to-noise ratio on Stackcraft is 10× better than any other platform we've tried.",
    },
    {
      name: "Sunita Rao",
      role: "CEO, CloudNetic Solutions",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop",
      text: "The B2B company connect feature helped us find two amazing technology partners in our first week. This is what a modern professional network looks like.",
    },
    {
      name: "Rohit Sharma",
      role: "VP Engineering, Meesho",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      text: "Sponsoring the React hackathon on Stackcraft was the best recruiting investment we made last year. We extended offers to the top 3 winners on the same day.",
    },
  ];

  const featuredCompanies = [
    { name: "OriginX Labs", industry: "AI / Deep Tech", followers: "12.4K", verified: true, logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop", following: true },
    { name: "Razorpay", industry: "Fintech", followers: "89K", verified: true, logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop" },
    { name: "CloudNetic", industry: "Cloud Infrastructure", followers: "7.2K", verified: true, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&h=80&fit=crop" },
    { name: "Meesho", industry: "E-commerce", followers: "54K", verified: true, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop" },
    { name: "NexaHR", industry: "HRTech SaaS", followers: "3.8K", verified: true, logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop" },
    { name: "Byju's R&D", industry: "EdTech", followers: "41K", verified: true, logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop" },
  ];

  return (
    <div className={cn("min-h-screen bg-background overflow-x-hidden")}>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Stackcraft" className="h-8 w-8" />
            <span className="font-bold text-lg tracking-tight">Stackcraft</span>
            <span className="ml-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-0.5">Business</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {["Features", "Plans", "Companies", "Analytics"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  const target = document.getElementById(item.toLowerCase());
                  target?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="hover:text-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">For Professionals</Link>
            <button
              onClick={() => { setActiveTab("register"); heroRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-primary text-sm py-2 px-4"
            >
              Register Company
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-28 pb-20 px-6 overflow-hidden min-h-[92vh] flex flex-col items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.14),transparent_65%)]" />
          <div className="absolute top-16 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/4 rounded-full blur-[100px]" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground)) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 backdrop-blur-sm">
            <Crown className="h-3.5 w-3.5" />
            India's Most Advanced Business Platform for Tech Companies
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Your company deserves
            <br />
            <span className="text-gradient">a smarter stage.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Register your business. Post jobs, products & updates. Find and hire verified talent.
            Connect with 18,000+ companies on India's only MCA-verified professional network.
          </p>

          {/* Tab toggle */}
          <div className="inline-flex items-center bg-muted rounded-full p-1 mb-10">
            {(["overview", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "overview" ? "See Overview" : "Register Now"}
              </button>
            ))}
          </div>

          {activeTab === "overview" ? (
            /* ── Hero visual ── */
            <div className="grid md:grid-cols-2 gap-6 mt-4 text-left">
              <DashboardPreview />
              <div className="flex flex-col gap-4 justify-center">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: "18K+", label: "Registered Companies", icon: Building2, color: "bg-primary" },
                    { val: "2.4M+", label: "Verified Professionals", icon: Users, color: "bg-purple-500" },
                    { val: "94%", label: "Hire Success Rate", icon: Target, color: "bg-green-500" },
                    { val: "48h", label: "Avg Time-to-Hire", icon: Zap, color: "bg-orange-500" },
                  ].map(stat => (
                    <div key={stat.label} className="card-premium p-5 flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.color)}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-black">{stat.val}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust indicators */}
                <div className="card-premium p-5 space-y-3">
                  <p className="text-sm font-bold">Why companies choose Stackcraft</p>
                  {[
                    { icon: BadgeCheck, text: "MCA + domain verification for every company page" },
                    { icon: Shield, text: "Full DPDP Act compliance — privacy by design" },
                    { icon: Sparkles, text: "AI-powered talent matching — not keyword stuffing" },
                    { icon: Lightbulb, text: "Transparent algorithm — no black-box recommendations" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-2.5">
                      <Icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground/80">{text}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("register")}
                  className="btn-primary py-3 px-8 w-full"
                >
                  Register Your Company Free <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <RegisterForm />
          )}
        </div>
      </section>

      {/* ── Trusted by logo strip ── */}
      <section className="py-10 border-y border-border bg-muted/20">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">Trusted by 18,000+ companies across India</p>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-60 grayscale hover:opacity-80 transition-opacity">
            {["Razorpay", "Meesho", "CRED", "Groww", "PhysicsWallah", "Zomato", "Ola", "Swiggy"].map((c) => (
              <span key={c} className="text-sm font-black tracking-tight text-foreground">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
              <Zap className="h-3 w-3" />
              Everything your company needs
            </div>
            <h2 className="text-4xl font-black mb-4">One platform. <span className="text-gradient">Infinite potential.</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From hiring to brand-building to B2B partnerships — Stackcraft Business gives your company a complete professional presence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <FeatureTile key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Page Preview Walkthrough ── */}
      <section id="companies" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                <Activity className="h-3 w-3" />
                Live Company Dashboard
              </div>
              <h2 className="text-4xl font-black mb-5 leading-tight">
                A command centre for<br /><span className="text-gradient">your entire brand.</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Track follower growth, post engagement, job application rates, and team visibility — all in one real-time dashboard built for decision-makers.
              </p>
              <div className="space-y-4">
                {[
                  { icon: LineChart, title: "Real-time analytics", desc: "Follow growth, reach, and engagement updated live. Export to CSV or connect via API." },
                  { icon: PieChart, title: "Audience demographics", desc: "Understand who is viewing your company — roles, industries, companies, and locations." },
                  { icon: Target, title: "Competitive benchmarking", desc: "See how your company's Talent Score™ and follower growth rank against your sector peers." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── Company Discovery ── */}
      <section id="analytics" className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
              <Network className="h-3 w-3" />
              B2B Company Network
            </div>
            <h2 className="text-4xl font-black mb-4">Discover & connect with <span className="text-gradient">top companies</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow companies in your ecosystem, initiate strategic partnerships, and stay updated with industry leaders' announcements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCompanies.map((co) => (
              <CompanyCard key={co.name} {...co} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/company/1" className="btn-outline py-3 px-8 inline-flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Browse All Companies
            </Link>
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="plans" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Simple, transparent <span className="text-gradient">pricing</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free. Upgrade when you're ready to scale. No hidden fees, no lock-in.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p) => <PlanCard key={p.name} {...p} />)}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">
            All plans include MCA verification, company page, team profiles, and B2B connect.
            <span className="text-primary"> No credit card required to start.</span>
          </p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Trusted by <span className="text-gradient">talent leaders</span></h2>
            <p className="text-muted-foreground">Hear from HRs, CHROs and founders who've made Stackcraft their primary hiring platform</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {companyTestimonials.map((t) => (
              <div key={t.name} className="card-premium p-7 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-primary/20" loading="lazy" decoding="async" />
                  <div>
                    <p className="font-bold text-sm flex items-center gap-1">
                      {t.name}
                      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-muted/20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-premium p-12 bg-gradient-to-br from-primary/10 via-background to-purple-500/5 border-primary/20">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
              <Building2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-black mb-4">
              Ready to put your company<br />
              <span className="text-gradient">on the map?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join 18,000+ verified companies on India's most advanced professional network. Free to start, powerful to scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => { setActiveTab("register"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-primary text-base py-3.5 px-10 inline-flex items-center gap-2"
              >
                <Rocket className="h-4 w-4" />
                Register Your Company Free
              </button>
              <Link to="/company/1" className="btn-outline text-base py-3.5 px-8 inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                See a Live Example
              </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              No credit card · MCA-verified in 24 hours · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-10 px-6">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Stackcraft" className="h-7 w-7" />
            <span className="font-bold text-base">Stackcraft <span className="text-primary">Business</span></span>
          </Link>
          <p className="text-xs text-muted-foreground">© 2026 Stackcraft Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">For Professionals</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <a href="#plans" onClick={e => { e.preventDefault(); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-foreground transition-colors">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessPage;
