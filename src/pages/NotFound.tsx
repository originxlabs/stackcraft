import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Layers } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 mb-12 group">
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg">
          <img src="/stackcraft-logo.svg" alt="StackCraft" className="w-full h-full" />
        </div>
        <span className="text-lg font-black tracking-tight">
          Stack<span className="text-primary">Craft</span>
        </span>
      </Link>

      {/* 404 card */}
      <div className="w-full max-w-md text-center">

        {/* Stacked layers icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Layers className="h-12 w-12 text-primary/60" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
            <span className="text-xs font-black text-destructive">!</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-2">
          <span className="text-8xl font-black text-primary/20 leading-none select-none">404</span>
        </div>
        <h1 className="text-2xl font-black mb-3 -mt-2">Page not found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          The route <code className="text-xs bg-muted border border-border rounded-md px-2 py-0.5 font-mono text-foreground/80">{location.pathname}</code> doesn't exist on StackCraft.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          It may have been moved, deleted, or you might have mistyped the URL.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "Feed",          to: "/feed"          },
              { label: "Network",       to: "/network"       },
              { label: "Jobs",          to: "/jobs"          },
              { label: "Hackathons",    to: "/hackathons"    },
              { label: "Business",      to: "/business"      },
              { label: "Notifications", to: "/notifications" },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-muted border border-border hover:border-primary/30 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-muted-foreground/50">
        © 2026 StackCraft Connect · All rights reserved
      </p>
    </div>
  );
};

export default NotFound;
