import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BadgeCheck, Users, Building2, MessageSquare, UserPlus, Globe,
  MapPin, Briefcase, Star, TrendingUp, ChevronRight, Package,
  PenLine, Calendar, BarChart3, Award, Zap, HeartHandshake,
  ExternalLink, Share2, MoreHorizontal, ThumbsUp, Eye, Clock,
  CheckCircle2, X, Rocket, Network, Target, Shield, Bell,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dummyProfiles, dummyCompanies } from "@/data/dummyData";

/* ── The logged-in user's primary company ID (demo constant) ── */
const MY_COMPANY_ID = 1;

/* ── types ── */
interface StrategicCompany {
  id: number;
  name: string;
  industry: string;
  followers: string;
  verified: boolean;
  logo: string;
  tags: string[];
}

/* ── StrengthBar ── */
const StrengthBar = ({
  label, value, color = "bg-primary",
}: { label: string; value: number; color?: string }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-bold">{value}/100</span>
    </div>
    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-1000", color)}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

/* ── PostCard ── */
const PostCard = ({
  author, role, time, content, img, likes, views,
}: {
  author: string; role: string; time: string; content: string;
  img?: string; likes: number; views: number;
}) => (
  <div className="card-premium p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold">{author}</p>
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">{role} · {time}</p>
        </div>
      </div>
      <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
    <p className="text-sm text-foreground/85 leading-relaxed mb-3">{content}</p>
    {img && (
      <div className="rounded-xl overflow-hidden mb-3">
        <img src={img} alt="post" className="w-full h-48 object-cover" loading="lazy" decoding="async" />
      </div>
    )}
    <div className="flex items-center gap-4 pt-2 border-t border-border">
      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
        <ThumbsUp className="h-3.5 w-3.5" /> {likes.toLocaleString()}
      </button>
      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
        <MessageSquare className="h-3.5 w-3.5" /> Comment
      </button>
      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
        <Share2 className="h-3.5 w-3.5" /> Share
      </button>
      <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
        <Eye className="h-3 w-3" /> {views.toLocaleString()} views
      </span>
    </div>
  </div>
);

/* ── JobCard ── */
const JobCard = ({
  title, dept, loc, type, posted, applicants,
}: {
  title: string; dept: string; loc: string; type: string; posted: string; applicants: number;
}) => (
  <div className="card-premium p-5 hover:-translate-y-0.5 transition-all duration-200 group">
    <div className="flex items-start justify-between mb-2">
      <div>
        <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{dept}</p>
      </div>
      <span className={cn(
        "text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0",
        type === "Full-time" ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400" :
        type === "Remote"    ? "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"  :
        "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400"
      )}>{type}</span>
    </div>
    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 flex-wrap">
      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{loc}</span>
      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{posted}</span>
      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{applicants} applicants</span>
    </div>
    <Link to="/jobs" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
      View &amp; Apply <ChevronRight className="h-3.5 w-3.5" />
    </Link>
  </div>
);

/* ── Strategic Company sidebar card ── */
const StrategicCompanyCard = ({
  company, isCurrentCompany,
}: { company: StrategicCompany; isCurrentCompany: boolean }) => {
  const [connected, setConnected] = useState(false);
  if (isCurrentCompany) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="w-11 h-11 rounded-xl overflow-hidden border border-border bg-muted shrink-0">
        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-xs font-bold truncate">{company.name}</p>
          {company.verified && <BadgeCheck className="h-3 w-3 text-primary shrink-0" />}
        </div>
        <p className="text-[11px] text-muted-foreground truncate">{company.industry}</p>
        <div className="flex flex-wrap gap-1 mt-0.5">
          {company.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] bg-primary/10 text-primary/80 border border-primary/15 rounded-full px-1.5 py-0.5"
            >{t}</span>
          ))}
        </div>
        <button
          onClick={() => setConnected((c) => !c)}
          className={cn(
            "mt-2 text-[11px] font-semibold px-3 py-1 rounded-full border transition-all inline-flex items-center gap-1",
            connected
              ? "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
              : "border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
          )}
        >
          {connected
            ? <><CheckCircle2 className="h-3 w-3" />Connected</>
            : <><HeartHandshake className="h-3 w-3" />Strategic Connect</>}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   CompanyPage
══════════════════════════════════════════════ */
const CompanyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const [isFollowing, setIsFollowing] = useState(false);
  const [strategyModal, setStrategyModal] = useState(false);
  const [strategyMessage, setStrategyMessage] = useState("");
  const [selectedFromId, setSelectedFromId] = useState<number>(dummyCompanies[0]?.id ?? 0);

  /* Numeric ID of the company page currently being viewed */
  const currentCompanyId = parseInt(id ?? "0");
  /* Own company if the page belongs to the logged-in user's primary company */
  const isOwnCompany = currentCompanyId === MY_COMPANY_ID;

  /* Company dropdown options for the "Connect as" picker — exclude the page company */
  const connectFromOptions = dummyCompanies.filter((c) => c.id !== currentCompanyId);

  /* Look up the page company name/industry for the modal "To" card */
  const knownCompanies: Record<number, { name: string; industry: string; city: string }> = {
    1:  { name: "CropXon Innovations Private Limited", industry: "AgriTech · Precision Farming", city: "Pune, India" },
    2:  { name: "Razorpay",                      industry: "Fintech · Payments",             city: "Bangalore, India" },
    3:  { name: "CloudNetic",                    industry: "Cloud Infrastructure",            city: "India" },
    4:  { name: "NexaHR",                        industry: "HRTech SaaS",                    city: "India" },
    5:  { name: "Byju's R&D",                    industry: "EdTech · AI",                    city: "Bangalore, India" },
    6:  { name: "Meesho Tech",                   industry: "E-commerce · Marketplace",       city: "Bangalore, India" },
    7:  { name: "Polygon Labs",                  industry: "Web3 · Blockchain",              city: "Global" },
  };
  const pageCompany = knownCompanies[currentCompanyId] ?? {
    name: `Company #${id}`, industry: "Tech", city: "India",
  };

  const openStrategyModal = () => {
    if (connectFromOptions.length > 0) setSelectedFromId(connectFromOptions[0].id);
    setStrategyModal(true);
  };

  const tabs = [
    { key: "about",    label: "About",          icon: Building2 },
    { key: "posts",    label: "Posts",           icon: PenLine   },
    { key: "jobs",     label: "Jobs",            icon: Briefcase },
    { key: "products", label: "Products",        icon: Package   },
    { key: "people",   label: "People",          icon: Users     },
    { key: "strength", label: "Strength Index",  icon: BarChart3 },
    { key: "events",   label: "Events",          icon: Calendar  },
    { key: "media",    label: "Media",           icon: Image     },
  ];

  const employees = dummyProfiles.slice(0, 12);

  const posts = [
    {
      author: "CropXon Innovations", role: "Official Account", time: "2h ago",
      content: "🌾 Proud to announce CropXon FarmSense is now live across 8 Indian states! Over 50,000 farmers are using real-time satellite + IoT data to make smarter decisions on irrigation, pest control and harvest timing. #PrecisionAgriculture #AgriTech",
      img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=400&fit=crop",
      likes: 3120, views: 52400,
    },
    {
      author: "CropXon Innovations", role: "Engineering Blog", time: "1d ago",
      content: "📖 New blog — \"How we built a sub-second crop disease detection pipeline using edge AI on 4G-connected soil sensors deployed across 2,000 farm plots.\" A deep dive into our IoT + ML stack.",
      img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop",
      likes: 1840, views: 34700,
    },
    {
      author: "CropXon Innovations", role: "People & Culture", time: "3d ago",
      content: "At CropXon, our engineers spend one week a quarter working directly with farmers in the field. Real problems, real soil, real impact. 14 open engineering roles — join us! #WorkWithPurpose",
      img: undefined, likes: 1050, views: 21600,
    },
  ];

  const jobs = [
    { title: "Senior IoT Platform Engineer",         dept: "Engineering",        loc: "Pune · Hybrid",          type: "Full-time", posted: "2d ago",  applicants: 214 },
    { title: "ML Engineer — Crop Disease Detection", dept: "AI & Data Science",  loc: "Remote (India)",         type: "Remote",    posted: "3d ago",  applicants: 389 },
    { title: "Product Manager — FarmSense Platform",dept: "Product",            loc: "Pune",                   type: "Full-time", posted: "1w ago",  applicants: 176 },
    { title: "Satellite Image Analyst",              dept: "Geo & Remote Sensing",loc: "Remote (Anywhere)",     type: "Remote",    posted: "1w ago",  applicants: 298 },
    { title: "Head of Farmer Success",               dept: "Field Operations",   loc: "Pune",                   type: "Full-time", posted: "2w ago",  applicants: 109 },
  ];

  const products = [
    { name: "CropXon FarmSense",     desc: "Real-time crop health monitoring using IoT soil sensors + satellite NDVI data. Deployed across 50,000+ farms.", badge: "Top Product", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop",  stars: 4.9, reviews: 348 },
    { name: "CropXon AgroAI",        desc: "AI-powered crop disease detection, yield prediction and smart irrigation advisory for smallholder farmers.",     badge: "New",         img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=200&fit=crop", stars: 4.7, reviews: 212 },
    { name: "CropXon MarketLink",    desc: "Direct farm-to-buyer marketplace connecting 150,000+ farmers to verified agri-business buyers at fair prices.", badge: "Popular",    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=200&fit=crop",  stars: 4.8, reviews: 294 },
    { name: "CropXon WeatherEdge",   desc: "Hyperlocal 10-day weather forecasting for micro-farm zones. Integrated with FarmSense sensor network.",          badge: null,         img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop",  stars: 4.6, reviews: 118 },
  ];

  const events = [
    { title: "CropXon AgriTech Summit 2026",  date: "Apr 5, 2026",  loc: "NESCO Centre, Pune",    type: "In-Person", attendees: 980,  img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop" },
    { title: "Future of Farming Webinar",     date: "Apr 18, 2026", loc: "Online — Zoom",         type: "Virtual",   attendees: 620,  img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop" },
    { title: "CropXon Build for Bharat 2026", date: "May 10–12, 2026", loc: "Pan-India (Online)", type: "Hackathon", attendees: 4100, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=200&fit=crop" },
  ];

  const mediaPhotos = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  ];

  const strategicCompanies: StrategicCompany[] = [
    { id: 2, name: "Razorpay",          industry: "Fintech · Payments",          followers: "89K",  verified: true, logo: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop", tags: ["Fintech","API"]        },
    { id: 3, name: "CloudNetic",        industry: "Cloud Infrastructure",         followers: "7.2K", verified: true, logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&h=80&fit=crop", tags: ["Cloud","DevOps"]       },
    { id: 4, name: "NexaHR",            industry: "HRTech SaaS",                  followers: "3.8K", verified: true, logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=80&fit=crop", tags: ["HRTech","SaaS"]        },
    { id: 5, name: "Byju's R&D",        industry: "EdTech · AI",                  followers: "41K",  verified: true, logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop", tags: ["EdTech","AI"]          },
    { id: 6, name: "Meesho Tech",       industry: "E-commerce · Marketplace",     followers: "54K",  verified: true, logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop", tags: ["E-commerce"]           },
    { id: 7, name: "Polygon Labs",      industry: "Web3 · Blockchain",            followers: "128K", verified: true, logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=80&h=80&fit=crop", tags: ["Web3","L2"]            },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ── Banner ── */}
      <div className="pt-14">
        <div className="relative h-52 md:h-64 w-full overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=400&fit=crop"
            alt="Company banner"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent" />
          {isOwnCompany && (
            <button className="absolute top-4 right-4 text-xs font-semibold bg-card/80 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 hover:bg-card transition-colors flex items-center gap-1.5">
              <Image className="h-3 w-3" /> Edit Banner
            </button>
          )}
        </div>

        {/* ── Profile strip ── */}
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="relative">

            {/* Logo — sits half over the bottom of the banner */}
            <div className="absolute -top-12 left-0">
              <div className="w-24 h-24 rounded-2xl border-4 border-background bg-card shadow-xl flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/25 to-primary/5 flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
              </div>
              {isOwnCompany && (
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity">
                  <PenLine className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Company name + meta — cleared below logo with pt-16 */}
            <div className="pt-16 pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-black">CropXon Innovations Private Limited</h1>
                  <BadgeCheck className="h-5 w-5 text-primary fill-primary/20 shrink-0" />
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 mb-2">
                  Building AI infrastructure for the next generation of intelligent systems
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="badge-mca">MCA Verified</span>
                  <span className="badge-verified">Domain Verified</span>
                  <span className="badge-talent">Innovation Leader</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">
                    <Zap className="h-2.5 w-2.5" /> Strength 94/100
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
                  <a href="https://originxlabs.ai" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Globe className="h-3 w-3" />originxlabs.ai
                  </a>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />Koramangala, Bangalore</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />12,400 followers</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />240 employees</span>
                </div>
              </div>

              {/* Action buttons — different for own vs other company */}
              <div className="flex items-center gap-2 flex-wrap shrink-0">
                {isOwnCompany ? (
                  <>
                    <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                      <PenLine className="h-3.5 w-3.5" /> Edit Page
                    </button>
                    <button className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5" /> Analytics
                    </button>
                    <Link to="/business" className="btn-ghost text-xs py-2 px-3 border border-border rounded-full flex items-center gap-1.5">
                      <Rocket className="h-3 w-3" /> Business Hub
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsFollowing((f) => !f)}
                      className={cn(
                        "text-xs py-2 px-4 rounded-full font-semibold flex items-center gap-1.5 border transition-all",
                        isFollowing
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "bg-primary text-primary-foreground border-primary hover:opacity-90"
                      )}
                    >
                      {isFollowing
                        ? <><CheckCircle2 className="h-3.5 w-3.5" />Following</>
                        : <><UserPlus className="h-3.5 w-3.5" />Follow</>}
                    </button>
                    <button
                      onClick={openStrategyModal}
                      className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5"
                    >
                      <HeartHandshake className="h-3.5 w-3.5" /> Strategic Connect
                    </button>
                    <button className="btn-ghost text-xs py-2 px-3 border border-border rounded-full flex items-center gap-1.5">
                      <Bell className="h-3 w-3" /> Notifications
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 border border-border rounded-2xl overflow-hidden">
              {[
                { label: "Followers",      value: "12,400", icon: Users,      color: "text-blue-500"   },
                { label: "Employees",      value: "240",    icon: Building2,  color: "text-purple-500" },
                { label: "Strength Index", value: "94/100", icon: TrendingUp, color: "text-green-500"  },
                { label: "Open Roles",     value: "18",     icon: Briefcase,  color: "text-orange-500" },
              ].map(({ label, value, icon: Icon, color }, idx) => (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col items-center justify-center py-4 px-2 text-center hover:bg-muted/50 transition-colors",
                    idx < 3 && "border-r border-border"
                  )}
                >
                  <Icon className={cn("h-4 w-4 mb-1.5", color)} />
                  <p className="font-black text-base md:text-lg leading-none">{value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky tabs ── */}
      <div className="sticky top-14 z-40 bg-card/95 backdrop-blur-xl border-b border-border mt-5">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all duration-150 shrink-0",
                  activeTab === key
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left 2 cols */}
          <div className="lg:col-span-2 space-y-5">

            {/* ABOUT */}
            {activeTab === "about" && (
              <>
                <div className="card-premium p-6">
                  <h2 className="font-bold text-base mb-3">About CropXon Innovations</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    CropXon Innovations Private Limited is an AgriTech company transforming Indian agriculture through precision farming, IoT-powered soil intelligence and AI-driven crop advisory.
                    Founded in 2020, headquartered in Pune, the company serves 50,000+ smallholder farmers across 8 states with real-time data, market linkage and weather-adaptive recommendations.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                    {[
                      { label: "Founded",  value: "2020",                   icon: Calendar   },
                      { label: "HQ",       value: "Pune, India",             icon: MapPin     },
                      { label: "Industry", value: "AgriTech · IoT · AI",    icon: Building2  },
                      { label: "Stage",    value: "Series A · ₹85Cr raised", icon: TrendingUp },
                      { label: "Website",  value: "cropxon.in",              icon: Globe      },
                      { label: "Reg No.",  value: "U01403MH2020PTC341892",   icon: Shield     },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">{label}</p>
                          <p className="text-xs font-semibold">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-premium p-6">
                  <h2 className="font-bold text-base mb-4">Specialisations</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Precision Agriculture","IoT Sensors","Satellite NDVI","Crop Disease AI","Yield Prediction",
                      "Smart Irrigation","Soil Intelligence","Agri-Market Linkage","Drone Imaging",
                      "Edge ML","Weather Forecasting","Farm Data Analytics"].map((s) => (
                      <span key={s} className="text-xs font-medium bg-muted border border-border rounded-full px-3 py-1.5 hover:border-primary/40 hover:text-primary cursor-default transition-colors">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="card-premium p-6">
                  <h2 className="font-bold text-base mb-4">By the Numbers</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: "50,000+", lbl: "Farmers Served",     icon: Users      },
                      { val: "8",       lbl: "States Covered",     icon: MapPin     },
                      { val: "92%",     lbl: "Yield Improvement",  icon: TrendingUp },
                    ].map(({ val, lbl, icon: Icon }) => (
                      <div key={lbl} className="bg-muted/40 rounded-xl p-4 text-center">
                        <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <p className="text-lg font-black">{val}</p>
                        <p className="text-[11px] text-muted-foreground">{lbl}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* POSTS */}
            {activeTab === "posts" && (
              <>
                {isOwnCompany && (
                  <div className="card-premium p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <button className="flex-1 h-10 rounded-full bg-muted border border-border text-sm text-muted-foreground text-left px-4 hover:border-primary/30 transition-colors">
                      Share an update, article or announcement...
                    </button>
                  </div>
                )}
                {posts.map((p, i) => <PostCard key={i} {...p} />)}
              </>
            )}

            {/* JOBS */}
            {activeTab === "jobs" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-sm">18 Open Positions</h2>
                  {isOwnCompany && (
                    <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5" /> Post New Job
                    </button>
                  )}
                </div>
                {jobs.map((j, i) => <JobCard key={i} {...j} />)}
              </>
            )}

            {/* PRODUCTS */}
            {activeTab === "products" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div key={p.name} className="card-premium overflow-hidden group hover:-translate-y-0.5 transition-all duration-200">
                    <div className="relative h-36 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                      {p.badge && (
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-2.5 py-1">{p.badge}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 mb-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-3 w-3", i < Math.floor(p.stars) ? "fill-amber-400 text-amber-400" : "text-muted")} />
                        ))}
                        <span className="text-[11px] text-muted-foreground ml-1">{p.stars} ({p.reviews})</span>
                      </div>
                      <h3 className="font-bold text-sm mt-1">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 text-xs font-semibold py-2 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition">Learn More</button>
                        <button className="flex-1 text-xs font-semibold py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">Request Demo</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PEOPLE */}
            {activeTab === "people" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-sm">{employees.length} Team Members on Stackcraft</h2>
                  {isOwnCompany && (
                    <button className="btn-outline text-xs py-2 px-4 flex items-center gap-1.5">
                      <UserPlus className="h-3.5 w-3.5" /> Invite Members
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {employees.map((emp) => (
                    <Link
                      key={emp.id}
                      to={`/profile/${emp.handle}`}
                      className="card-premium p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <img src={emp.avatar} alt={emp.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">{emp.name}</p>
                          {emp.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{emp.role}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-500" /> Score: {emp.talentScore}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> {emp.followers.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* STRENGTH INDEX */}
            {activeTab === "strength" && (
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-base">Strength Index Score</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Verified by Stackcraft · Last updated Mar 2026</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border-2 border-green-500/30 flex flex-col items-center justify-center">
                      <p className="text-2xl font-black text-green-600 dark:text-green-400">94</p>
                      <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold">/100</p>
                    </div>
                    <span className="badge-talent mt-2 inline-block">Excellent</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <StrengthBar label="Technical Talent Density"  value={96} color="bg-blue-500"   />
                  <StrengthBar label="Innovation Score"          value={92} color="bg-purple-500" />
                  <StrengthBar label="Hiring Transparency"       value={88} color="bg-amber-500"  />
                  <StrengthBar label="Employee Satisfaction"     value={91} color="bg-green-500"  />
                  <StrengthBar label="Verified Claims"           value={97} color="bg-sky-500"    />
                  <StrengthBar label="Community Engagement"      value={85} color="bg-pink-500"   />
                  <StrengthBar label="Product / Revenue Growth"  value={94} color="bg-orange-500" />
                </div>
                <div className="mt-5 pt-4 border-t border-border bg-green-500/5 rounded-xl p-3 text-xs text-green-700 dark:text-green-300 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />
                  CropXon Innovations ranks in the <strong className="mx-1">top 5%</strong> of all AgriTech companies on Stackcraft. Metrics verified against public records, employee surveys, and third-party signals.
                </div>
              </div>
            )}

            {/* EVENTS */}
            {activeTab === "events" && (
              <div className="space-y-4">
                {isOwnCompany && (
                  <div className="flex justify-end">
                    <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> Create Event
                    </button>
                  </div>
                )}
                {events.map((ev) => (
                  <div key={ev.title} className="card-premium overflow-hidden flex flex-col md:flex-row hover:-translate-y-0.5 transition-all duration-200">
                    <div className="h-40 md:h-auto md:w-52 shrink-0 overflow-hidden">
                      <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </div>
                    <div className="p-5 flex flex-col justify-between">
                      <div>
                        <span className={cn(
                          "text-[10px] font-bold px-2.5 py-1 rounded-full border mb-2 inline-block",
                          ev.type === "Hackathon"  ? "border-primary/30 bg-primary/10 text-primary" :
                          ev.type === "Virtual"    ? "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400" :
                          "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400"
                        )}>{ev.type}</span>
                        <h3 className="font-bold text-sm mb-1">{ev.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.date}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.loc}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.attendees.toLocaleString()} registered</span>
                        </div>
                      </div>
                      <button className="btn-primary text-xs py-2 px-5 mt-4 self-start">Register Now →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MEDIA */}
            {activeTab === "media" && (
              <div className="card-premium p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-base">Company Media</h2>
                  {isOwnCompany && (
                    <button className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5">
                      <Image className="h-3.5 w-3.5" /> Upload
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {mediaPhotos.map((src, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer">
                      <img src={src} alt={`media-${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                        <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right sidebar — 1 col */}
          <div className="space-y-5">

            {/* Strategic Connect companies */}
            <div className="card-premium p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <Network className="h-4 w-4 text-primary" />
                  Companies to Connect
                </h3>
                <Link to="/business" className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-0.5">
                  See all <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">Strategic companies in your ecosystem</p>
              <div>
                {strategicCompanies.map((co) => (
                  <StrategicCompanyCard
                    key={co.id}
                    company={co}
                    isCurrentCompany={co.id === currentCompanyId}
                  />
                ))}
              </div>
            </div>

            {/* Live Hackathon widget */}
            <div className="card-premium overflow-hidden">
              <div className="relative h-28 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop" alt="Hackathon" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent flex items-end p-3">
                  <span className="text-[10px] font-bold text-white bg-primary rounded-full px-2.5 py-1">Live Hackathon</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold">CropXon Build for Bharat 2026</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Prize: ₹15 Lakhs · 4,100 participants</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "62%" }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">62%</span>
                </div>
                <Link to="/hackathons" className="btn-primary w-full mt-3 text-xs py-2 block text-center">
                  Register Now
                </Link>
              </div>
            </div>

            {/* Products widget */}
            <div className="card-premium p-4">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-1.5">
                <Package className="h-4 w-4 text-primary" /> Featured Products
              </h3>
              {products.slice(0, 3).map((p) => (
                <div key={p.name} className="flex items-center gap-2.5 py-2.5 border-b border-border last:border-0 group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-muted overflow-hidden shrink-0">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate group-hover:text-primary transition-colors">{p.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] text-muted-foreground">{p.stars} · {p.reviews} reviews</span>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              <button
                onClick={() => setActiveTab("products")}
                className="w-full text-xs text-primary font-semibold mt-3 py-2 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 transition-colors"
              >
                View All Products →
              </button>
            </div>

            {/* Company links */}
            <div className="card-premium p-4">
              <h3 className="font-bold text-sm mb-3">Company Links</h3>
              {[
                { icon: Globe,     label: "cropxon.in",               onClick: undefined, href: "https://cropxon.in" },
                { icon: MapPin,    label: "Baner, Pune, Maharashtra",  onClick: undefined, href: "#" },
                { icon: Briefcase, label: "18 open positions",         onClick: () => setActiveTab("jobs"), href: "#" },
                { icon: Shield,    label: "SOC-2 Type II Certified",   onClick: undefined, href: "#" },
                { icon: Award,     label: "LinkedIn Top Startup 2025", onClick: undefined, href: "#" },
              ].map(({ icon: Icon, label, onClick, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
                  className="flex items-center gap-2.5 py-2 text-xs text-foreground/80 hover:text-primary transition-colors group cursor-pointer"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  {label}
                  <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Strategic Connect Modal ── */}
      {strategyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl border border-border shadow-float w-full max-w-md p-6 animate-scale-in">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Strategic Connect</h2>
              </div>
              <button
                onClick={() => setStrategyModal(false)}
                className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* To: target company (dynamic) */}
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Connecting to</p>
            <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3 mb-5 border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold leading-snug">{pageCompany.name}</p>
                <p className="text-xs text-muted-foreground">{pageCompany.industry} · {pageCompany.city}</p>
              </div>
            </div>

            {/* Connect as: dropdown */}
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Connect as</p>
            {connectFromOptions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground mb-4">
                No companies available to connect from.
              </div>
            ) : (
              <div className="space-y-2 mb-5">
                {connectFromOptions.map((co) => (
                  <label
                    key={co.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                      selectedFromId === co.id
                        ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/30 hover:bg-muted/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="connectFrom"
                      value={co.id}
                      checked={selectedFromId === co.id}
                      onChange={() => setSelectedFromId(co.id)}
                      className="accent-primary"
                    />
                    <div className="w-9 h-9 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                      <img src={co.logo} alt={co.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold truncate">{co.name}</p>
                        {co.verified && <BadgeCheck className="h-3 w-3 text-primary shrink-0" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{co.industry} · {co.city}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Message */}
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Message (optional)</p>
            <textarea
              value={strategyMessage}
              onChange={(e) => setStrategyMessage(e.target.value)}
              placeholder="e.g. We'd love to explore integration or co-marketing opportunities..."
              className="w-full h-24 p-3 rounded-xl border border-border bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground mb-3"
            />

            {/* Bell notice */}
            <div className="flex items-start gap-2 mb-5 bg-primary/5 border border-primary/15 rounded-xl p-3">
              <Bell className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-foreground/70">
                <strong>{pageCompany.name}</strong> will be notified. They can{" "}
                <strong>Accept</strong>, <strong>Follow</strong>, or <strong>Decline</strong> your request.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setStrategyModal(false); setStrategyMessage(""); }}
                disabled={connectFromOptions.length === 0}
                className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <HeartHandshake className="h-4 w-4" /> Send Request
              </button>
              <button
                onClick={() => { setStrategyModal(false); setStrategyMessage(""); }}
                className="py-2.5 px-5 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyPage;
