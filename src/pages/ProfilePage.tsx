import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BadgeCheck, MapPin, Users, TrendingUp, MessageSquare,
  UserPlus, ExternalLink, Briefcase, Award, Star, Code2,
  ChevronRight, Globe, Github, Twitter
} from "lucide-react";
import { dummyProfiles, feedPosts } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const CompletionRing = ({ percent, size = 80 }: { percent: number; size?: number }) => {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const stroke = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="hsl(var(--primary))" strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={stroke}
        style={{ transition: "stroke-dashoffset 1.2s ease 0.3s" }}
      />
    </svg>
  );
};

const SkillBar = ({ skill, level }: { skill: string; level: number }) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-medium w-32 text-right shrink-0">{skill}</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      />
    </div>
    <span className="text-xs text-muted-foreground w-8 shrink-0">{level}%</span>
  </div>
);

const ProfilePage = () => {
  const { handle } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [animateRing, setAnimateRing] = useState(false);

  const profile = dummyProfiles.find((p) => p.handle === handle) || dummyProfiles[0];

  useEffect(() => {
    setTimeout(() => setAnimateRing(true), 200);
  }, []);

  const tabs = ["About", "Experience", "Skills", "Portfolio", "Hackathons", "Activity"];

  const experience = [
    { company: profile.company, role: profile.role, period: "2022 – Present", desc: "Leading AI research and building cutting-edge ML systems.", current: true },
    { company: "Google Brain", role: "Senior Research Scientist", period: "2019 – 2022", desc: "Research on large language models and scaling laws.", current: false },
    { company: "IIT Bombay", role: "Research Associate", period: "2017 – 2019", desc: "PhD research on deep learning optimization.", current: false },
  ];

  const portfolioItems = [
    { title: "Sparse MoE Paper", desc: "NeurIPS 2024 Best Paper", img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=300&h=200&fit=crop", tag: "Research" },
    { title: "OpenLLM Toolkit", desc: "Open-source, 12k⭐ on GitHub", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop", tag: "OSS" },
    { title: "AI Safety Framework", desc: "Deployed in 15 enterprises", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop", tag: "Framework" },
    { title: "Edge AI Runtime", desc: "10x faster inference on mobile", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop", tag: "Product" },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 pt-20 pb-24 animate-fade-in">
      {/* Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-0">
        <img
          src={profile.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
      </div>

      {/* Profile Header Card */}
      <div className="card-premium px-6 py-5 -mt-px rounded-t-none relative">
        {/* Avatar + completion ring */}
        <div className="absolute -top-10 left-6 flex items-center">
          <div className="relative">
            <CompletionRing percent={animateRing ? profile.completeness : 0} size={88} />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full object-cover border-3 border-card shadow-md"
            />
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:ml-24 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            {/* Name + badges */}
            <div className="flex items-center flex-wrap gap-2">
              <h1 className="text-xl font-bold">{profile.name}</h1>
              {profile.verified && <BadgeCheck className="h-5 w-5 text-primary fill-primary/20" />}
              <span className="badge-talent">
                <TrendingUp className="h-3 w-3" />
                Talent {profile.talentScore}
              </span>
            </div>

            <p className="text-muted-foreground text-sm mt-0.5">{profile.role} · {profile.company}</p>

            <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {profile.followers.toLocaleString()} followers
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {profile.connections} connections
              </span>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="text-[11px] font-medium px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {profile.badges.map((badge) => (
                <span key={badge} className="badge-verified flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn-primary text-xs py-2 px-4">
              <UserPlus className="h-3.5 w-3.5" />
              Connect
            </button>
            <button className="btn-outline text-xs py-2 px-4">
              <MessageSquare className="h-3.5 w-3.5" />
              Message
            </button>
            <button className="btn-ghost text-xs py-2 px-3 border border-border rounded-full">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border mt-4 pb-px scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-150 border-b-2 -mb-px",
              activeTab === tab.toLowerCase()
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="md:col-span-2 space-y-5">
          {(activeTab === "about" || activeTab === "experience") && (
            <>
              {/* About */}
              <div className="card-premium p-5 animate-fade-in">
                <h2 className="font-semibold text-sm mb-3">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
              </div>

              {/* Experience Timeline */}
              <div className="card-premium p-5 animate-fade-in stagger-1">
                <h2 className="font-semibold text-sm mb-4">Experience</h2>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={cn("w-3 h-3 rounded-full shrink-0 mt-0.5", exp.current ? "bg-primary" : "bg-border")} />
                        {i < experience.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{exp.role}</p>
                          {exp.current && <span className="text-[10px] text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-full">Current</span>}
                        </div>
                        <p className="text-xs text-primary font-medium">{exp.company}</p>
                        <p className="text-[11px] text-muted-foreground">{exp.period}</p>
                        <p className="text-xs text-muted-foreground mt-1">{exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {(activeTab === "skills" || activeTab === "about") && (
            <div className="card-premium p-5 animate-fade-in stagger-2">
              <h2 className="font-semibold text-sm mb-4">Skill Heatmap</h2>
              <div className="space-y-3">
                {profile.skills.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    skill={skill}
                    level={95 - i * 4 + Math.floor(Math.random() * 8)}
                  />
                ))}
              </div>
            </div>
          )}

          {(activeTab === "portfolio" || activeTab === "about") && (
            <div className="card-premium p-5 animate-fade-in stagger-3">
              <h2 className="font-semibold text-sm mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 gap-3">
                {portfolioItems.map((item) => (
                  <div key={item.title} className="rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-colors group cursor-pointer">
                    <img src={item.img} alt={item.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="p-2.5">
                      <span className="text-[10px] text-primary font-medium">{item.tag}</span>
                      <p className="text-xs font-semibold mt-0.5">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          <div className="card-premium p-4">
            <h3 className="font-semibold text-sm mb-3">Profile Completeness</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <CompletionRing percent={animateRing ? profile.completeness : 0} size={100} />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold">{profile.completeness}%</span>
                  <span className="text-[10px] text-muted-foreground">Complete</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-premium p-4">
            <h3 className="font-semibold text-sm mb-3">Certifications</h3>
            {["Google ML Expert", "AWS Solutions Architect", "Deep Learning Specialization"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 py-1.5 border-b border-border last:border-0">
                <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-medium">{cert}</span>
              </div>
            ))}
          </div>

          <div className="card-premium p-4">
            <h3 className="font-semibold text-sm mb-3">Links</h3>
            {[
              { icon: Globe, label: "Personal Site" },
              { icon: Github, label: "GitHub" },
              { icon: Twitter, label: "Twitter/X" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex items-center gap-2 py-1.5 w-full text-left hover:text-primary transition-colors">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">{label}</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
