import { useState } from "react";
import {
  Search, MapPin, Briefcase, Clock, Users, BadgeCheck,
  Building2, Filter, Bookmark, ChevronRight, Zap, Star, TrendingUp
} from "lucide-react";
import { jobs } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [saved, setSaved] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = jobs.filter((j) => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "remote" && j.mode !== "Remote") return false;
    if (filter === "hybrid" && j.mode !== "Hybrid") return false;
    return true;
  });

  const toggleSave = (id: number) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-24 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Find Your Next Role</h1>
        <p className="text-muted-foreground text-sm">Verified jobs from India's top tech companies</p>
      </div>

      {/* Search + Filters */}
      <div className="card-premium p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Job title, company, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "hybrid", "remote"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize",
                filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f === "all" ? "All Jobs" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
        {/* Job List */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{filtered.length} jobs found</p>
          {filtered.map((job, i) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={cn(
                "card-premium p-4 cursor-pointer transition-all duration-150 animate-fade-in",
                selectedJob?.id === job.id ? "border-primary/50 bg-primary/5" : "hover:border-border"
              )}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg border border-border overflow-hidden shrink-0">
                  <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-semibold">{job.title}</h3>
                        {job.urgent && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-1.5 py-0.5 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                        {job.verified && <BadgeCheck className="h-3 w-3 text-primary" />}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(job.id); }}
                      className={cn("shrink-0 transition-colors", saved.includes(job.id) ? "text-primary" : "text-muted-foreground hover:text-primary")}
                    >
                      <Bookmark className={cn("h-4 w-4", saved.includes(job.id) && "fill-current")} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />{job.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Briefcase className="h-3 w-3" />{job.mode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-primary">{job.salary}</span>
                    <span className="text-[11px] text-muted-foreground">{job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail */}
        {selectedJob && (
          <div className="card-premium p-6 sticky top-20 h-fit animate-scale-in">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl border border-border overflow-hidden shrink-0">
                <img src={selectedJob.companyLogo} alt={selectedJob.company} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm text-muted-foreground">{selectedJob.company}</span>
                  {selectedJob.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </div>
              </div>
            </div>

            {/* Job meta */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: MapPin, label: "Location", val: selectedJob.location },
                { icon: Briefcase, label: "Type", val: `${selectedJob.type} · ${selectedJob.mode}` },
                { icon: TrendingUp, label: "Salary", val: selectedJob.salary },
                { icon: Users, label: "Applicants", val: `${selectedJob.applicants} applied` },
                { icon: Clock, label: "Posted", val: selectedJob.posted },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] text-muted-foreground">{label}</p>
                    <p className="text-xs font-medium">{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob.skills.map((skill) => (
                  <span key={skill} className="text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">About This Role</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="btn-primary flex-1">
                Apply Now
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleSave(selectedJob.id)}
                className={cn(
                  "btn-outline px-3 py-2.5",
                  saved.includes(selectedJob.id) && "bg-primary/10"
                )}
              >
                <Bookmark className={cn("h-4 w-4", saved.includes(selectedJob.id) && "fill-current")} />
              </button>
            </div>

            {/* Match Score */}
            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold">92% Profile Match</p>
                <p className="text-[11px] text-muted-foreground">Your skills match most requirements</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
