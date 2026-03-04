import { Link, useLocation } from "react-router-dom";
import { Home, Users, Plus, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const location = useLocation();
  const links = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Users, label: "Network", path: "/network" },
    { icon: Plus, label: "Post", path: "/feed", isAction: true },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/profile/arjunmehta" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ icon: Icon, label, path, isAction }) => (
          <Link
            key={label}
            to={path}
            className={cn(
              "flex flex-col items-center gap-0.5 flex-1 transition-colors duration-150",
              isAction
                ? "relative"
                : location.pathname === path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isAction ? (
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-blue -mt-5">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
            ) : (
              <>
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
