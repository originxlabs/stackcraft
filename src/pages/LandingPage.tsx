import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck, TrendingUp, Shield, Zap, Users, Trophy, ArrowRight,
  Globe, Upload, FileText, Linkedin, CheckCircle2, Moon, Sun, Star,
  Briefcase, Code2, Award, Play, Download, Laptop, MessageSquare, PenLine
} from "lucide-react";
import logo from "@/assets/stackcraft-logo.svg";
import communityIllustration from "@/assets/community-animated.png";
import prof1 from "@/assets/prof1.jpg";
import prof3 from "@/assets/prof3.jpg";
import prof4 from "@/assets/prof4.jpg";
import { dummyProfiles } from "@/data/dummyData";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ── Static data outside component — avoids re-alloc on every render ── */
const FEATURES = [
  { icon: BadgeCheck, title: "Verified Identity", desc: "MCA, domain, and skill verification for every profile and company." },
  { icon: TrendingUp, title: "Talent Score™", desc: "Dynamic scoring based on skills, contributions, and community recognition." },
  { icon: Trophy, title: "Hackathons", desc: "Live competitions with real prizes, leaderboards and career acceleration." },
  { icon: Shield, title: "Privacy First", desc: "Granular controls. You decide who sees what. Passkey authentication." },
  { icon: Zap, title: "AI-Powered Feed", desc: "Intelligent content ranking with full transparency on why you see each post." },
  { icon: Globe, title: "Strategic Network", desc: "Company-to-company strategic connections with structured workflows." },
];

/* ── Workspace video-style showcase images ── */
const WORKSPACE_SCENES = [
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85", alt: "Team collaborating at Stackcraft office" },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85", alt: "Professionals walking into modern office" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=85", alt: "Engineers brainstorming together" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85", alt: "People enjoying coffee break at work" },
  { src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85", alt: "Professional searching Stackcraft on phone" },
  { src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=85", alt: "Team celebrating hackathon win" },
];

// --- Counter hook ---
function useCounter(target: number, duration = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

const StatCounter = ({ val, label, prefix = "", suffix = "" }: { val: number; label: string; prefix?: string; suffix?: string }) => {
  const { count, ref } = useCounter(val);
  return (
    <div className="text-center">
      <p ref={ref} className="text-3xl md:text-4xl font-black text-gradient">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

/* ── Animated floating UI elements for Hero ── */
const HeroFloatingElements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".hero-float-card");

    // Entrance animation
    gsap.fromTo(cards,
      { y: 60, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.18, ease: "elastic.out(1,0.6)", delay: 0.8 }
    );

    // Continuous floating for each card
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: `+=${i % 2 === 0 ? -14 : 14}`,
        duration: 3 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(card, {
        x: `+=${i % 2 === 0 ? 6 : -6}`,
        duration: 4 + i * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    });

    // Rotating glow ring
    const ring = containerRef.current.querySelector(".hero-glow-ring");
    if (ring) {
      gsap.to(ring, { rotation: 360, duration: 20, ease: "none", repeat: -1 });
    }

    // Pulsing dots
    const dots = containerRef.current.querySelectorAll(".hero-pulse-dot");
    gsap.to(dots, {
      scale: 1.6, opacity: 0.3, duration: 1.5, stagger: 0.3, ease: "sine.inOut", yoyo: true, repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Glow ring */}
      <div className="hero-glow-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-20">
        <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30" />
        <div className="absolute inset-8 rounded-full border border-primary/10" />
        <div className="absolute inset-16 rounded-full border border-primary/5" />
      </div>

      {/* Floating pulse dots */}
      {[
        "top-[15%] left-[12%]", "top-[25%] right-[15%]", "bottom-[30%] left-[20%]",
        "bottom-[20%] right-[12%]", "top-[40%] left-[8%]", "top-[18%] right-[28%]",
      ].map((pos, i) => (
        <div key={i} className={`hero-pulse-dot absolute ${pos} w-2 h-2 rounded-full bg-primary/40`} />
      ))}

      {/* Profile card */}
      <div className="hero-float-card absolute top-[12%] left-[3%] md:left-[8%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-4 py-3 w-44 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-2.5">
          <img src={prof1} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20" />
          <div>
            <div className="h-2 bg-foreground/15 rounded w-16 mb-1" />
            <div className="h-1.5 bg-muted-foreground/10 rounded w-12" />
          </div>
          <BadgeCheck className="h-4 w-4 text-primary ml-auto" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex-1 h-1.5 bg-gradient-to-r from-primary/50 to-primary/20 rounded-full" />
          <span className="text-[9px] font-bold text-primary">97</span>
        </div>
      </div>

      {/* Code snippet */}
      <div className="hero-float-card absolute top-[10%] right-[3%] md:right-[8%] bg-slate-900 dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-700/50 px-4 py-3 w-48 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[8px] text-slate-500 ml-auto font-mono">talent.ts</span>
        </div>
        <div className="text-[9px] font-mono leading-relaxed">
          <div><span className="text-purple-400">const</span> <span className="text-blue-300">score</span> <span className="text-slate-400">=</span> <span className="text-amber-300">97</span><span className="text-slate-400">;</span></div>
          <div><span className="text-purple-400">if</span> <span className="text-slate-400">(</span><span className="text-blue-300">verified</span><span className="text-slate-400">)</span> <span className="text-slate-400">{"{"}</span></div>
          <div className="pl-3"><span className="text-green-400">hire</span><span className="text-slate-400">(</span><span className="text-amber-300">talent</span><span className="text-slate-400">);</span></div>
          <div><span className="text-slate-400">{"}"}</span></div>
        </div>
      </div>

      {/* Join badge */}
      <div className="hero-float-card absolute top-[6%] left-[38%] md:left-[42%] bg-white dark:bg-card rounded-full shadow-xl border border-border/60 px-4 py-2 flex items-center gap-2.5 backdrop-blur-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] font-semibold text-foreground/80">+2,400 joined today</span>
      </div>

      {/* Chart widget */}
      <div className="hero-float-card absolute bottom-[22%] left-[5%] md:left-[12%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-4 py-3 w-36 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-semibold text-muted-foreground">Talent Score™</span>
          <TrendingUp className="h-3 w-3 text-green-500" />
        </div>
        <div className="flex items-end gap-[3px] h-10">
          {[30, 45, 40, 65, 55, 80, 70, 95, 85].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-primary/70 to-primary/30 transition-all" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* Hackathon badge */}
      <div className="hero-float-card absolute bottom-[18%] right-[5%] md:right-[10%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-4 py-3 w-44 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Trophy className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-bold">Hackathon Winner</div>
            <div className="text-[8px] text-muted-foreground">React Summit 2026</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />)}
        </div>
      </div>

      {/* Message notification */}
      <div className="hero-float-card absolute top-[45%] right-[2%] md:right-[5%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-3 py-2.5 w-40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MessageSquare className="h-3 w-3 text-primary" />
          </div>
          <div>
            <div className="text-[8px] font-semibold">New message</div>
            <div className="text-[7px] text-muted-foreground">Let's connect about the…</div>
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-[7px] text-white font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Skill verified pill */}
      <div className="hero-float-card absolute top-[32%] left-[2%] md:left-[6%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-3 py-2.5 w-44 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
            <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
          </div>
          <div>
            <div className="text-[9px] font-bold text-foreground">Skill Verified</div>
            <div className="text-[7px] text-muted-foreground">React · TypeScript</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex-1 h-1.5 bg-green-100 dark:bg-green-900/20 rounded-full overflow-hidden">
            <div className="h-full w-[92%] bg-gradient-to-r from-green-400 to-green-600 rounded-full" />
          </div>
          <span className="text-[8px] font-bold text-green-600">92%</span>
        </div>
      </div>

      {/* New connection toast */}
      <div className="hero-float-card absolute top-[58%] right-[2%] md:right-[6%] bg-white dark:bg-card rounded-2xl shadow-xl border border-border/60 px-3 py-2.5 w-44 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-bold truncate">Priya Sharma</div>
            <div className="text-[7px] text-muted-foreground">wants to connect</div>
          </div>
        </div>
        <div className="flex gap-1.5 mt-2">
          <div className="flex-1 bg-primary text-primary-foreground text-[8px] font-semibold rounded-full px-2 py-1 text-center">Accept</div>
          <div className="flex-1 bg-muted text-muted-foreground text-[8px] rounded-full px-2 py-1 text-center">Ignore</div>
        </div>
      </div>

      {/* Live hackathon pill */}
      <div className="hero-float-card absolute bottom-[12%] left-[36%] md:left-[40%] bg-white dark:bg-card rounded-full shadow-xl border border-border/60 px-4 py-2 flex items-center gap-2.5 backdrop-blur-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-semibold text-foreground/80">Hackathon live — 847 builders</span>
      </div>

      {/* Open to work badge */}
      <div className="hero-float-card absolute top-[22%] left-[2%] md:left-[5%] bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-2xl shadow-xl px-3 py-2.5 w-40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Zap className="h-3 w-3 text-white" />
          </div>
          <div>
            <div className="text-[9px] font-bold text-white">#OpenToWork</div>
            <div className="text-[7px] text-white/70">Remote · Full-time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated community illustration
const CommunityAnimation = () => (
  <div className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950" style={{ height: "300px" }}>
    {/* Animated floating UI elements */}
    <style>{`
      @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      @keyframes floatUpAlt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes typingBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      .sc-float-1 { animation: floatUp 4s ease-in-out infinite; }
      .sc-float-2 { animation: floatUpAlt 5s ease-in-out 0.8s infinite; }
      .sc-float-3 { animation: floatUp 4.5s ease-in-out 1.2s infinite; }
      .sc-float-4 { animation: floatUpAlt 3.8s ease-in-out 0.5s infinite; }
      .sc-cursor { animation: typingBlink 1s ease-in-out infinite; }
    `}</style>
    {/* Profile card floating */}
    <div className="sc-float-1 absolute top-5 left-[5%] bg-white dark:bg-card rounded-xl shadow-lg border border-border/50 px-3 py-2.5 w-36 opacity-90">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-primary/30" />
        <div><div className="h-1.5 bg-foreground/20 rounded w-16 mb-1" /><div className="h-1 bg-muted rounded w-12" /></div>
      </div>
      <div className="h-1 bg-primary/20 rounded w-full mb-1" /><div className="h-1 bg-muted rounded w-3/4" />
    </div>
    {/* Code snippet floating */}
    <div className="sc-float-3 absolute top-4 right-[7%] bg-slate-900 dark:bg-slate-800 rounded-xl shadow-lg border border-border/50 px-3 py-2.5 w-40 opacity-90">
      <div className="text-[8px] font-mono leading-relaxed">
        <span className="text-blue-400">const </span><span className="text-green-400">talent</span><span className="text-white"> = </span><span className="text-yellow-400">97</span><span className="sc-cursor text-white">|</span>
      </div>
      <div className="text-[8px] font-mono"><span className="text-blue-400">return </span><span className="text-green-400">verified</span><span className="text-white">;</span></div>
    </div>
    {/* Join badge */}
    <div className="sc-float-2 absolute top-7 left-[44%] bg-white dark:bg-card rounded-full shadow-lg border border-border/50 px-3 py-1.5 flex items-center gap-2 opacity-90">
      <div className="w-2 h-2 rounded-full bg-green-400" />
      <span className="text-[9px] font-semibold text-foreground/80">+2,400 joined today</span>
    </div>
    {/* Chart widget */}
    <div className="sc-float-4 absolute top-5 left-[27%] bg-white dark:bg-card rounded-xl shadow-lg border border-border/50 px-3 py-2.5 w-28 opacity-90">
      <div className="text-[8px] text-muted-foreground mb-1.5">Talent Score™</div>
      <div className="flex items-end gap-0.5 h-8">
        {[30,50,40,70,60,90,85].map((h, i) => (
          <div key={i} className="flex-1 bg-primary/60 rounded-sm" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
    {/* Community illustration */}
    <img src={communityIllustration} alt="Stackcraft professionals" className="absolute bottom-0 left-0 right-0 w-full object-contain object-bottom" style={{ height: "245px" }} />
  </div>
);

/* ── Hero Bento Gallery — professional faces, glow on scroll, hover inflow/outflow ── */
const BENTO_ITEMS: { src: string; alt: string; type: "photo" | "accent"; accent?: string }[] = [
  { src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", alt: "", type: "photo" },
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", alt: "", type: "photo" },
];

/*
  Bento grid: 4 cols — asymmetric row-spans for visual interest.
  Layout (3 auto-rows):
    [ 0-tall ] [ 1     ] [ 2     ] [ 3-tall ]
    [ 0-tall ] [ 5-tall] [ 6-tall] [ 3-tall ]
    [ 4      ] [ 5-tall] [ 6-tall] [ 7      ]
*/
const BENTO_GRID: { rowSpan: number }[] = [
  { rowSpan: 2 }, { rowSpan: 1 }, { rowSpan: 1 }, { rowSpan: 2 },
  { rowSpan: 1 }, { rowSpan: 2 }, { rowSpan: 2 }, { rowSpan: 1 },
];

const HeroBentoGallery = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cells = gridRef.current.querySelectorAll<HTMLElement>(".bento-cell");
    const glows = gridRef.current.querySelectorAll<HTMLElement>(".bento-glow");
    const imgs  = gridRef.current.querySelectorAll<HTMLElement>(".bento-img");

    /* ── Entrance: stagger in with 3D rotate & scale ── */
    gsap.fromTo(cells,
      { opacity: 0, scale: 0.6, rotateY: -35, rotateX: 20, y: 70 },
      {
        opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0,
        duration: 1.2, stagger: { amount: 1, from: "center" },
        ease: "back.out(1.4)", delay: 0.8,
      }
    );

    /* ── Continuous subtle floating ── */
    cells.forEach((cell, i) => {
      gsap.to(cell, {
        y: i % 2 === 0 ? -10 : 10,
        rotateZ: i % 3 === 0 ? 1.8 : -1.8,
        duration: 3.2 + i * 0.45,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    /* ── Scroll-scrubbed 3D gallery rotation ── */
    gsap.to(gridRef.current, {
      rotateY: 10,
      rotateX: -4,
      ease: "none",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1.5,
      },
    });

    /* ── Scroll-scrubbed per-cell tilt ── */
    cells.forEach((cell, i) => {
      gsap.to(cell, {
        rotateY: i % 2 === 0 ? 7 : -7,
        rotateX: i % 2 === 0 ? -5 : 5,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 2,
        },
      });
    });

    /* ── Scroll-based GLOW effect ── */
    glows.forEach((glow, i) => {
      gsap.fromTo(glow,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1.5 + i * 0.15,
          },
        }
      );
    });

    /* ── Ken Burns zoom on scroll for photos ── */
    imgs.forEach((img, i) => {
      gsap.to(img, {
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 2.5 + i * 0.25,
        },
      });
    });
  }, []);

  /* Hover inflow/outflow */
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = e.currentTarget;
    const img = cell.querySelector(".bento-img");
    const glow = cell.querySelector(".bento-glow");
    gsap.to(cell, { scale: 1.08, rotateY: 5, rotateX: -3, z: 30, duration: 0.45, ease: "power2.out" });
    if (img) gsap.to(img, { scale: 1.18, duration: 0.5, ease: "power2.out" });
    if (glow) gsap.to(glow, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const cell = e.currentTarget;
    const img = cell.querySelector(".bento-img");
    const glow = cell.querySelector(".bento-glow");
    gsap.to(cell, { scale: 1, rotateY: 0, rotateX: 0, z: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
    if (img) gsap.to(img, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.5)" });
    if (glow) gsap.to(glow, { opacity: 0, duration: 0.5 });
  };

  const glowColors = [
    "shadow-[0_0_32px_10px_rgba(59,130,246,0.55)]",
    "shadow-[0_0_32px_10px_rgba(168,85,247,0.50)]",
    "shadow-[0_0_32px_10px_rgba(34,197,94,0.50)]",
    "shadow-[0_0_32px_10px_rgba(59,130,246,0.35)]",
    "shadow-[0_0_32px_10px_rgba(251,146,60,0.50)]",
    "shadow-[0_0_32px_10px_rgba(236,72,153,0.45)]",
    "shadow-[0_0_32px_10px_rgba(16,185,129,0.50)]",
    "shadow-[0_0_32px_10px_rgba(59,130,246,0.20)]",
  ];

  return (
    <div
      ref={gridRef}
      className="w-full max-w-3xl mx-auto"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <div className="grid grid-cols-4 auto-rows-[130px] sm:auto-rows-[150px] md:auto-rows-[160px] gap-2 md:gap-3">
        {BENTO_ITEMS.map((item, i) => {
          const { rowSpan } = BENTO_GRID[i];
          const isPhoto = item.type === "photo";
          return (
            <div
              key={i}
              className={cn(
                "bento-cell relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer",
                rowSpan === 2 && "row-span-2",
                !isPhoto && item.accent,
              )}
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isPhoto && (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="bento-img w-full h-full object-cover object-center"
                  loading="eager"
                />
              )}
              {isPhoto && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              )}
              <div className={cn(
                "bento-glow absolute -inset-[3px] rounded-2xl md:rounded-3xl opacity-0 pointer-events-none transition-shadow",
                glowColors[i % glowColors.length],
              )} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Workspace Video Reel — cinematic auto-cycling showcase ── */
const WorkspaceVideoReel = () => {
  const [active, setActive] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const INTERVAL = 5000;

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % WORKSPACE_SCENES.length), INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = `progressFill ${INTERVAL}ms linear forwards`;
  }, [active]);

  return (
    <>
      <style>{`
        @keyframes kenBurns0 { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.12) translate(-1.5%,-1%)} }
        @keyframes kenBurns1 { 0%{transform:scale(1.05) translate(-2%,0)} 100%{transform:scale(1.15) translate(1%,-1.5%)} }
        @keyframes kenBurns2 { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.1) translate(1%,1%)} }
        @keyframes progressFill { 0%{width:0%} 100%{width:100%} }
        .kb-0 { animation: kenBurns0 ${INTERVAL}ms ease-in-out forwards; }
        .kb-1 { animation: kenBurns1 ${INTERVAL}ms ease-in-out forwards; }
        .kb-2 { animation: kenBurns2 ${INTERVAL}ms ease-in-out forwards; }
      `}</style>

      <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-float bg-black aspect-video max-h-[520px]">
        {WORKSPACE_SCENES.map((scene, i) => (
          <img
            key={i}
            src={scene.src}
            alt={scene.alt}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              i === active ? "opacity-100 z-10" : "opacity-0 z-0",
              i === active ? `kb-${i % 3}` : ""
            )}
            loading={i < 2 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 z-30 px-5 py-4 md:px-8 md:py-6">
          <p className="text-white/95 text-sm md:text-base font-semibold mb-3 drop-shadow-md">{WORKSPACE_SCENES[active].alt}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {WORKSPACE_SCENES.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={cn("w-2 h-2 rounded-full transition-all duration-300", i === active ? "bg-white w-5" : "bg-white/40 hover:bg-white/60")} aria-label={`Scene ${i + 1}`} />
              ))}
            </div>
            <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden ml-2">
              <div ref={progressRef} className="h-full bg-white/80 rounded-full" />
            </div>
            <span className="text-white/60 text-[10px] font-mono tabular-nums ml-2">{String(active + 1).padStart(2, "0")}/{String(WORKSPACE_SCENES.length).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE TOUR
        </div>
      </div>
    </>
  );
};

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bgBlobRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Use gsap.context() for automatic, leak-free cleanup
    const ctx = gsap.context(() => {
      // Hero parallax — background blobs
      gsap.to(bgBlobRef.current, {
        y: -80, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Hero text reveal
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current.querySelectorAll(".hero-line"), {
          y: 60, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2,
        });
      }

      // Workspace showcase entrance
      const wsSection = document.querySelector(".workspace-showcase");
      if (wsSection) {
        gsap.from(wsSection, {
          y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: wsSection, start: "top 88%", toggleActions: "play none none none" },
        });
      }

      // Batch fade-in for .gsap-reveal elements — far cheaper than one ScrollTrigger per element
      ScrollTrigger.batch(".gsap-reveal", {
        start: "top 88%",
        onEnter: (batch) => gsap.from(batch, {
          y: 45, opacity: 0, duration: 0.75, ease: "power3.out", stagger: 0.08, overwrite: true,
        }),
      });

      // Batch stagger for direct children
      ScrollTrigger.batch(".gsap-stagger-children > *", {
        start: "top 88%",
        onEnter: (batch) => gsap.from(batch, {
          y: 35, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.07, overwrite: true,
        }),
      });

      // Parallax cards — single scrub per card, lower scrub value = snappier
      gsap.utils.toArray<HTMLElement>(".parallax-card").forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -18 : 18, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const testimonials = [
    { name: "Arjun Mehta", role: "AI Architect @ DeepMind", img: prof1, text: "Stackcraft's Talent Score helped me land interviews at top AI labs. The verified profile system gives me instant credibility." },
    { name: "Priya Sharma", role: "Cloud Architect @ AWS", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", text: "I imported my LinkedIn posts in seconds. The AI-assisted content labeling is a game changer for thought leadership." },
    { name: "Rahul Kumar", role: "Backend Engineer @ Stripe", img: prof3, text: "The code post format and hackathon leaderboards are what set Stackcraft apart. Built for engineers, by engineers." },
    { name: "Sneha Patel", role: "Product Leader @ Flipkart", img: prof4, text: "Finally a professional network that feels premium. The UX is clean and the algorithm transparency is something I've always wanted." },
    { name: "Emily Chen", role: "Staff Engineer @ Google", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", text: "The hackathon feature alone made me switch. I've won two bounties and connected with my current co-founder on Stackcraft." },
    { name: "James O'Brien", role: "VP Engineering @ Shopify", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", text: "We migrated our entire recruiting pipeline to Stackcraft. The verified profiles save us 40% on screening time." },
    { name: "Yuki Tanaka", role: "ML Engineer @ OpenAI", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", text: "Stackcraft's AI feed surfaces the most relevant research papers and job posts. Nothing else comes close in signal-to-noise." },
    { name: "Carlos Rivera", role: "CTO @ Rappi", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", text: "The strategic company-to-company networking is revolutionary. We closed three B2B partnerships directly through the platform." },
    { name: "Sarah Kim", role: "Design Lead @ Figma", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", text: "As a designer, I appreciate how polished the entire experience is. The portfolio showcase feature is beautifully done." },
    { name: "Ahmed Hassan", role: "DevOps Lead @ Cloudflare", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", text: "Privacy-first approach with passkey auth? Granular visibility controls? Stackcraft understands what engineers actually need." },
  ];

  return (
    <div className={cn("min-h-screen bg-background overflow-x-hidden")}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Stackcraft" className="h-8 w-8" />
            <span className="font-bold text-lg tracking-tight">Stackcraft</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            {([
              { label: "Features",   href: "#features"   },
              { label: "Companies",  href: "#companies"  },
              { label: "Developers", href: "#developers" },
              { label: "Pricing",    href: "#pricing"    },
            ] as const).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                {label}
              </a>
            ))}
            <Link
              to="/business"
              className="hover:text-foreground transition-colors font-semibold text-primary flex items-center gap-1"
            >
              Business
              <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 rounded-full px-1.5 py-0.5 leading-none">New</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/feed" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign in</Link>
            <Link to="/feed" className="btn-primary text-sm py-2 px-4">Join Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="pt-28 pb-20 px-6 text-center relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
        {/* Animated background layers */}
        <div ref={bgBlobRef} className="absolute inset-0 pointer-events-none" style={{ willChange: "transform" }}>
          <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_50%_20%,hsl(var(--primary)/0.12),transparent_60%)]" />
          <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-purple-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Floating animated elements */}
        <HeroFloatingElements />

        <div ref={heroTextRef} className="relative max-w-5xl mx-auto z-10">
          <div className="hero-line inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5" />
            India's First Verified Professional Network
          </div>

          <h1 className="hero-line text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            The professional network
            <br />
            <span className="text-gradient">rebuilt from scratch.</span>
          </h1>

          <p className="hero-line text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            Verified identities. Talent scoring. Live hackathons. AI-powered matching.
            Built for the professionals who build the future.
          </p>

          {/* LinkedIn Import Banner */}
          <div className="hero-line inline-flex items-center gap-3 bg-card/80 backdrop-blur-md border border-border rounded-xl px-5 py-3 mb-8 text-sm shadow-card">
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
              <Linkedin className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-xs">Already on LinkedIn?</p>
              <p className="text-muted-foreground text-xs">Import your posts, articles & profile in one click — 100% free</p>
            </div>
            <Link to="/feed" className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity shrink-0">
              <Download className="h-3 w-3" />
              Try Now
            </Link>
          </div>

          <div className="hero-line flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/feed" className="btn-primary text-base py-3 px-8 group">
              Join Stackcraft Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/feed" className="btn-outline text-base py-3 px-8 flex items-center gap-2 group">
              <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
              Watch Demo
            </Link>
          </div>

          <div className="hero-line flex items-center justify-center gap-2">
            {dummyProfiles.slice(0, 5).map((p) => (
              <img key={p.id} src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border-2 border-card -ml-2 first:ml-0" loading="eager" decoding="sync" />
            ))}
            <span className="ml-2 text-xs text-muted-foreground font-medium">Join 2.4M+ professionals</span>
          </div>
        </div>

        {/* Hero Bento Gallery — GSAP scrubbed rotating people boxes */}
        <div className="hero-line relative max-w-5xl w-full mx-auto mt-12 md:mt-16">
          <HeroBentoGallery />
        </div>
      </section>

      {/* Workspace Showcase — Video-style cinematic reel */}
      <section id="companies" className="sc-offscreen relative overflow-hidden py-16 md:py-24">
        <div className="workspace-showcase max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-14 gsap-reveal">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold mb-4">
              <Play className="h-3 w-3" />
              Life at Stackcraft
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Where professionals <span className="text-gradient">thrive together</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Walk into the Stackcraft office — collaboration, coffee, code, and community.</p>
          </div>

          {/* Cinematic video-style reel with auto-cycling scenes */}
          <WorkspaceVideoReel />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border gsap-reveal">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gsap-stagger-children">
            <StatCounter val={2400000} prefix="" suffix="+" label="Verified Professionals" />
            <StatCounter val={18000} suffix="+" label="Top Companies" />
            <StatCounter val={2400} prefix="₹" suffix="Cr+" label="Salary Matched" />
            <StatCounter val={94} suffix="%" label="Hire Success Rate" />
          </div>
        </div>
      </section>

      {/* LinkedIn Import Section */}
      <section id="developers" className="sc-offscreen py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="gsap-reveal">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold mb-4">
                <Upload className="h-3 w-3" />
                LinkedIn Import — Zero Rewrite
              </div>
              <h2 className="text-4xl font-black mb-4 leading-tight">
                Bring your work.<br /><span className="text-gradient">Leave the busywork.</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Export your LinkedIn data zip and import it to Stackcraft. Your posts, articles, connections, and experiences migrate instantly — completely free, no manual editing required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Posts & articles preserved with formatting",
                  "Experience & education auto-filled",
                  "Connections notified on Stackcraft",
                  "AI-assisted content labels applied",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/feed" className="btn-primary py-3 px-6 inline-flex">
                Import from LinkedIn — Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="gsap-reveal">
              <div className="card-premium p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">LinkedIn Export</p>
                    <p className="text-xs text-muted-foreground">linkedin_data.zip · 2.4 MB</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />
                </div>
                {[
                  { label: "Posts migrated", val: "234", icon: FileText, color: "text-primary" },
                  { label: "Articles imported", val: "12", icon: FileText, color: "text-purple-500" },
                  { label: "Connections synced", val: "892", icon: Users, color: "text-green-500" },
                  { label: "Experience filled", val: "6 roles", icon: Briefcase, color: "text-orange-500" },
                ].map(({ label, val, icon: Icon, color }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-4 w-4", color)} />
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                    <span className="text-sm font-semibold">{val}</span>
                  </div>
                ))}
                <Link to="/feed" className="w-full btn-primary py-2.5 text-sm text-center block">
                  Try Now — Completely Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile cards - parallax */}
      <section className="sc-offscreen py-16 px-6 bg-muted/30 border-y border-border overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12 gsap-reveal">
            <h2 className="text-4xl font-black mb-3">Meet India's <span className="text-gradient">Top Professionals</span></h2>
            <p className="text-muted-foreground">Verified, scored, and ready to connect</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 gsap-stagger-children">
            {[
              { name: "Arjun Mehta", role: "AI Architect", company: "DeepMind", img: prof1, score: 97, badge: "AI Pioneer" },
              { name: "Priya Sharma", role: "Cloud Architect", company: "AWS", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", score: 94, badge: "AWS Hero" },
              { name: "Rahul Kumar", role: "Backend Eng.", company: "Stripe", img: prof3, score: 92, badge: "OSS Contrib" },
              { name: "Sneha Patel", role: "Product Lead", company: "Flipkart", img: prof4, score: 91, badge: "Top Voice" },
            ].map((p, i) => (
              <div key={p.name} className={cn("parallax-card card-premium p-5 text-center cursor-pointer group hover:-translate-y-2 transition-transform duration-300", i % 2 === 1 && "mt-6")}>
                <div className="relative mx-auto w-16 h-16 mb-3">
                  <img src={p.img} alt={p.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" loading="lazy" decoding="async" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                  </div>
                </div>
                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{p.role} · {p.company}</p>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="badge-talent text-[10px]"><TrendingUp className="h-2.5 w-2.5" /> {p.score}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-full">{p.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="sc-offscreen py-24 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <h2 className="text-4xl font-black mb-4">Built different. <span className="text-gradient">Built better.</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every feature designed with precision, privacy, and professional integrity in mind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gsap-stagger-children">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium p-6 group hover:-translate-y-1 transition-transform duration-200">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Horizontal infinite scroll */}
      <section className="sc-offscreen py-24 bg-card border-y border-border overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 mb-12">
          <div className="text-center gsap-reveal">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Loved by <span className="text-gradient">top professionals</span></h2>
            <p className="text-muted-foreground">See what engineers, designers, and leaders are saying</p>
          </div>
        </div>
        <style>{`
          @keyframes marqueeLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          @keyframes marqueeRight { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
          .marquee-left { animation: marqueeLeft 60s linear infinite; will-change: transform; }
          .marquee-right { animation: marqueeRight 60s linear infinite; will-change: transform; }
          .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
        `}</style>
        {/* Row 1 — scrolls left */}
        <div className="relative mb-5">
          <div className="marquee-left flex gap-5 w-max">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={`r1-${idx}`} className="w-[340px] md:w-[400px] shrink-0 card-premium p-5 md:p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0" loading="lazy" decoding="async" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm flex items-center gap-1 truncate">
                      {t.name}
                      <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="marquee-right flex gap-5 w-max">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, idx) => (
              <div key={`r2-${idx}`} className="w-[340px] md:w-[400px] shrink-0 card-premium p-5 md:p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover shrink-0" loading="lazy" decoding="async" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm flex items-center gap-1 truncate">
                      {t.name}
                      <BadgeCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-card to-transparent z-10" style={{ position: "relative", marginTop: "-200px", height: 0 }} />
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 px-6 gsap-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <div className="card-premium p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-4xl font-black mb-4">Start building your <span className="text-gradient">verified career</span></h2>
            <p className="text-muted-foreground mb-8">Join India's most intelligent professional network.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/feed" className="btn-primary text-base py-3 px-10 inline-flex">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/feed" className="btn-outline text-base py-3 px-8 inline-flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                Import from LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-12 pb-8 px-6">
      {/* Footer illustration - animated community */}
        <div className="max-w-screen-xl mx-auto mb-12 rounded-2xl overflow-hidden border border-border relative">
          <CommunityAnimation />
          <div className="bg-primary/5 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-base">Connect with 2.4M+ verified professionals</p>
              <p className="text-sm text-muted-foreground">Engineers, designers, founders, and researchers — all in one place.</p>
            </div>
            <Link to="/feed" className="btn-primary py-2.5 px-6 shrink-0">Join Free Today</Link>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="Stackcraft" className="h-7 w-7 dark:invert" />
            <span className="font-bold">Stackcraft</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm mb-10">
            {[
              { title: "General", links: ["Sign Up", "Help Center", "About", "Press", "Blog", "Careers", "Developers", "Browse Stackcraft", "Learning", "Jobs", "Games", "Mobile"] },
              { title: "Services", links: ["Talent", "Marketing", "Sales", "Learning", "Developers", "Products"] },
              { title: "Products", links: ["Top Companies", "Top Startups", "Top Colleges", "Business Solutions"] },
              { title: "Directories", links: ["Members", "Jobs", "Companies", "Featured", "Learning", "Posts", "Articles", "Schools"] },
              { title: "News & More", links: ["News", "Newsletters", "Services", "Advice", "People Search"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold text-xs text-foreground mb-3">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <Link to="/feed" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <img src={logo} alt="" className="h-4 w-4 dark:invert opacity-60" />
              <span>© 2026 Stackcraft. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Cookie Preferences"].map((link) => (
                <a key={link} href="#" className="hover:text-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
