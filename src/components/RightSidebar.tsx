import { Link } from "react-router-dom";
import { BadgeCheck, TrendingUp, Calendar, UserPlus } from "lucide-react";
import { dummyProfiles, hackathons } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const RightSidebar = () => {
  // slice starting from 1 to exclude current user (dummyProfiles[0]) from suggestions
  const suggested = dummyProfiles.slice(1, 5);

  return (
    <aside className="space-y-3">
      {/* Trending Hackathon */}
      <div className="card-premium p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Live Hackathon</h3>
        </div>
        <div className="rounded-lg overflow-hidden mb-2">
          <img
            src={hackathons[0].banner}
            alt={hackathons[0].title}
            className="w-full h-24 object-cover"
            loading="lazy"
          />
        </div>
        <p className="font-semibold text-sm">{hackathons[0].title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{hackathons[0].company}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs font-bold text-green-600 dark:text-green-400">{hackathons[0].prize}</span>
          <span className="text-xs text-muted-foreground">{hackathons[0].participants.toLocaleString()} participants</span>
        </div>
        <Link to="/hackathons" className="btn-outline w-full mt-3 text-xs py-2">
          View & Register
        </Link>
      </div>

      {/* Suggested Connections */}
      <div className="card-premium p-4">
        <h3 className="font-semibold text-sm mb-3">People You May Know</h3>
        <div className="space-y-3">
          {suggested.map((profile) => (
            <div key={profile.id} className="flex items-center gap-2.5">
              <Link to={`/profile/${profile.handle}`}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-9 h-9 rounded-full object-cover hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <Link to={`/profile/${profile.handle}`} className="text-xs font-semibold hover:text-primary truncate">
                    {profile.name}
                  </Link>
                  {profile.verified && <BadgeCheck className="h-3 w-3 text-primary shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{profile.role}</p>
              </div>
              <button className="shrink-0 p-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors">
                <UserPlus className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        <Link to="/network" className="text-xs text-primary font-medium hover:underline block mt-3">
          See more suggestions →
        </Link>
      </div>

      {/* Top Companies */}
      <div className="card-premium p-4">
        <h3 className="font-semibold text-sm mb-3">Verified Companies</h3>
        {[
          { name: "OriginX Labs", desc: "AI Infrastructure", hiring: true },
          { name: "Razorpay", desc: "FinTech · Payments", hiring: true },
          { name: "Polygon Labs", desc: "Blockchain · Web3", hiring: false },
          { name: "CRED", desc: "Premium Finance", hiring: true },
        ].map((company) => (
          <div key={company.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold">{company.name}</span>
                <BadgeCheck className="h-3 w-3 text-primary" />
              </div>
              <p className="text-[11px] text-muted-foreground">{company.desc}</p>
            </div>
            {company.hiring && (
              <span className="text-[10px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-full">
                Hiring
              </span>
            )}
          </div>
        ))}
        <Link to="/company/1" className="text-xs text-primary font-medium hover:underline block mt-2">
          Browse companies →
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="card-premium p-4">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary" />
          Upcoming Events
        </h3>
        {[
          { title: "Bangalore Tech Summit 2025", date: "Mar 15", attendees: 1200 },
          { title: "AI Research Symposium", date: "Mar 22", attendees: 450 },
          { title: "FinTech Forward India", date: "Apr 2", attendees: 890 },
        ].map((event) => (
          <div key={event.title} className="py-2 border-b border-border last:border-0">
            <p className="text-xs font-medium">{event.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-primary font-medium">{event.date}</span>
              <span className="text-[11px] text-muted-foreground">· {event.attendees.toLocaleString()} attending</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
