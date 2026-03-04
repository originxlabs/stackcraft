import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, MessageSquare, Search, Menu, X, Moon, Sun, Plus } from "lucide-react";
import logo from "@/assets/stackcraft-logo.svg";
import { notifications } from "@/data/dummyData";
import { cn } from "@/lib/utils";

interface TopNavProps {
  darkMode: boolean;
  toggleDark: () => void;
}

const TopNav = ({ darkMode, toggleDark }: TopNavProps) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { path: "/feed", label: "Home" },
    { path: "/network", label: "Network" },
    { path: "/jobs", label: "Jobs" },
    { path: "/hackathons", label: "Hackathons" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border h-14">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Stackcraft" className="h-8 w-8" />
          <span className="font-bold text-lg tracking-tight hidden sm:block">Stackcraft</span>
        </Link>

        {/* Search */}
        <div className={cn("relative flex-1 max-w-sm transition-all duration-200", searchFocused ? "max-w-md" : "")}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search professionals, jobs, companies..."
            className="w-full h-9 pl-9 pr-4 rounded-full bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden lg:flex items-center gap-1 ml-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150",
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted transition-colors relative"
            >
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-float animate-scale-in z-50">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors",
                        !notif.read && "bg-primary/5"
                      )}
                    >
                      {notif.user ? (
                        <img
                          src={notif.user.avatar}
                          alt={notif.user.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Bell className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-relaxed">
                          {notif.user && <span className="font-semibold">{notif.user.name} </span>}
                          {notif.action}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <Link to="/notifications" className="text-xs text-primary font-medium hover:underline">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Messages — opens floating ChatWidget (handled globally) */}

          {/* Profile Avatar */}
          <Link to="/profile/arjunmehta">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20 hover:border-primary/50 transition-colors"
            />
          </Link>

          {/* Mobile menu */}
          <button
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 py-3 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default TopNav;
