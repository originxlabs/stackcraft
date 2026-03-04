import { useState } from "react";
import { UserPlus, Users, BadgeCheck, TrendingUp, Search, Check, X } from "lucide-react";
import { dummyProfiles } from "@/data/dummyData";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NetworkPage = () => {
  const [connected, setConnected] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [tab, setTab] = useState<"suggestions" | "requests" | "following">("suggestions");

  const suggestions = dummyProfiles.filter((p) => !connected.includes(p.id) && !dismissed.includes(p.id));
  const requests = dummyProfiles.slice(5, 9);

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-premium p-4">
            <h3 className="font-semibold text-sm mb-3">Manage my network</h3>
            {[
              { label: "Connections", count: 892, icon: Users },
              { label: "Following", count: 234, icon: UserPlus },
              { label: "People You May Know", count: 48, icon: BadgeCheck },
            ].map(({ label, count, icon: Icon }) => (
              <button key={label} className="w-full flex items-center justify-between py-2 px-2 rounded-lg hover:bg-muted transition-colors text-left">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-border">
            {(["suggestions", "requests", "following"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize",
                  tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {t === "requests" ? "Pending Requests (4)" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === "suggestions" && (
            <>
              <h2 className="font-bold text-base mb-4">People you may know</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.slice(0, 12).map((profile) => (
                  <div key={profile.id} className="card-premium p-5 flex flex-col items-center text-center group">
                    <button onClick={() => setDismissed((p) => [...p, profile.id])} className="self-end -mt-1 -mr-1 w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <div className="relative -mt-2 mb-3">
                      <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/10" />
                      {profile.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <Link to={`/profile/${profile.handle}`} className="font-semibold text-sm hover:underline">{profile.name}</Link>
                    <p className="text-xs text-muted-foreground mb-1">{profile.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">{profile.company}</p>
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="badge-talent text-[10px]"><TrendingUp className="h-2.5 w-2.5" /> {profile.talentScore}</span>
                    </div>
                    <button
                      onClick={() => setConnected((p) => [...p, profile.id])}
                      className="w-full border border-primary text-primary text-xs font-semibold py-1.5 rounded-full hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "requests" && (
            <>
              <h2 className="font-bold text-base mb-4">Pending invitations</h2>
              <div className="space-y-3">
                {requests.map((profile) => (
                  <div key={profile.id} className="card-premium p-4 flex items-center gap-4">
                    <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.role} · {profile.company}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{profile.connections} mutual connections</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn-outline text-xs py-1.5 px-4">Ignore</button>
                      <button className="btn-primary text-xs py-1.5 px-4">Accept</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "following" && (
            <>
              <h2 className="font-bold text-base mb-4">Following</h2>
              <div className="space-y-3">
                {dummyProfiles.slice(0, 8).map((profile) => (
                  <div key={profile.id} className="card-premium p-4 flex items-center gap-4">
                    <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{profile.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.role} · {profile.company}</p>
                    </div>
                    <button className="border border-border text-xs font-medium py-1.5 px-4 rounded-full hover:bg-muted transition-colors">Unfollow</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
