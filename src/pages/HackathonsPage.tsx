import { useState, useEffect } from "react";
import { Trophy, Timer, Users, ChevronRight, Medal, Star, Zap } from "lucide-react";
import { hackathons, dummyProfiles } from "@/data/dummyData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Countdown = ({ deadline }: { deadline: Date }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = deadline.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex items-center gap-2">
      {[
        { val: time.d, label: "Days" },
        { val: time.h, label: "Hrs" },
        { val: time.m, label: "Min" },
        { val: time.s, label: "Sec" },
      ].map(({ val, label }) => (
        <div key={label} className="flex flex-col items-center min-w-[48px]">
          <div className="bg-card/20 backdrop-blur rounded-lg px-3 py-2 min-w-[48px] text-center">
            <span className="text-2xl font-bold font-mono">{String(val).padStart(2, "0")}</span>
          </div>
          <span className="text-[10px] mt-1 opacity-70">{label}</span>
        </div>
      ))}
    </div>
  );
};

const leaderboard = [
  { rank: 1, name: "Team NeuralForge", score: 9840, members: ["Arjun M.", "Priya S."] },
  { rank: 2, name: "AlgoMasters", score: 9620, members: ["Rahul K.", "Sneha P."] },
  { rank: 3, name: "ByteCraft", score: 9210, members: ["Vivek R.", "Anjali S."] },
  { rank: 4, name: "StackSurge", score: 8990, members: ["Karthik N.", "Meera K."] },
  { rank: 5, name: "CodeNomads", score: 8750, members: ["Rohan D.", "Aditi G."] },
];

const pastWinners = [
  { event: "Stackcraft BuildFest 2024", winner: dummyProfiles[0], prize: "₹20 Lakhs" },
  { event: "AI Research Sprint 2024", winner: dummyProfiles[4], prize: "₹15 Lakhs" },
  { event: "FinTech Hackathon 2023", winner: dummyProfiles[2], prize: "₹10 Lakhs" },
];

const sponsors = [
  { name: "Google Cloud", tier: "platinum" },
  { name: "AWS India", tier: "gold" },
  { name: "Razorpay", tier: "gold" },
  { name: "GitHub", tier: "silver" },
  { name: "Vercel", tier: "silver" },
  { name: "Notion", tier: "partner" },
];

const HackathonsPage = () => {
  const featured = hackathons[0];

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-24">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 animate-fade-in">
        <img
          src={featured.banner}
          alt={featured.title}
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-green-500 text-white px-2 py-0.5 rounded-full animate-pulse">
              LIVE NOW
            </span>
            <span className="text-xs opacity-80">{featured.company}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{featured.title}</h1>
          <p className="text-lg font-bold text-green-300 mb-4">{featured.prize} Prize Pool</p>
          <Countdown deadline={featured.deadline} />
          <div className="flex items-center gap-4 mt-4">
            <button className="btn-primary text-sm py-2.5 px-6 bg-white text-foreground hover:bg-white/90 shadow-float">
              Register Now →
            </button>
            <span className="text-sm opacity-80">
              <Users className="h-4 w-4 inline mr-1" />
              {featured.participants.toLocaleString()} registered
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* All Hackathons */}
          <div>
            <h2 className="font-bold text-lg mb-4">Active & Upcoming</h2>
            <div className="space-y-4">
              {hackathons.map((hack, i) => (
                <div
                  key={hack.id}
                  className="card-premium overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex gap-4 p-4">
                    <img
                      src={hack.banner}
                      alt={hack.title}
                      className="w-24 h-20 rounded-lg object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">{hack.title}</h3>
                            <span className={cn(
                              "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                              hack.status === "live"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                            )}>
                              {hack.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{hack.company}</p>
                        </div>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400 shrink-0">{hack.prize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {hack.tags.map((tag) => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5 inline mr-1" />
                          {hack.participants.toLocaleString()} participants
                        </span>
                        <button className="btn-outline text-xs py-1 px-3">Register</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Winners */}
          <div>
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Past Champions
            </h2>
            <div className="space-y-3">
              {pastWinners.map(({ event, winner, prize }, i) => (
                <div key={i} className="card-premium p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{event}</p>
                    <Link to={`/profile/${winner.handle}`} className="text-[11px] text-primary font-medium hover:underline">
                      Winner: {winner.name}
                    </Link>
                  </div>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 shrink-0">{prize}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Leaderboard */}
          <div className="card-premium p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Live Leaderboard
            </h3>
            <div className="space-y-2">
              {leaderboard.map(({ rank, name, score, members }) => (
                <div
                  key={rank}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg",
                    rank === 1 ? "bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30" :
                    rank === 2 ? "bg-muted/50" :
                    rank === 3 ? "bg-muted/30" : ""
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    rank === 1 ? "bg-amber-400 text-white" :
                    rank === 2 ? "bg-slate-300 text-slate-700" :
                    rank === 3 ? "bg-amber-700 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{members.join(" · ")}</p>
                  </div>
                  <span className="text-xs font-bold text-primary shrink-0">{score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsors */}
          <div className="card-premium p-5">
            <h3 className="font-bold text-sm mb-4">Sponsors</h3>
            <div className="grid grid-cols-2 gap-2">
              {sponsors.map(({ name, tier }) => (
                <div
                  key={name}
                  className={cn(
                    "p-2 rounded-lg text-center border",
                    tier === "platinum" ? "border-primary/40 bg-primary/5" :
                    tier === "gold" ? "border-amber-300/50 bg-amber-50/50 dark:bg-amber-900/10" :
                    "border-border bg-muted/30"
                  )}
                >
                  <p className="text-xs font-semibold">{name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{tier}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonsPage;
