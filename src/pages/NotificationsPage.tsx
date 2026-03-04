import { useState } from "react";
import { Bell, Check, Trash2, BadgeCheck, Heart, MessageSquare, UserPlus, Award } from "lucide-react";
import { notifications } from "@/data/dummyData";
import { cn } from "@/lib/utils";

const NotificationsPage = () => {
  const [items, setItems] = useState(notifications.map((n) => ({ ...n, read: n.read })));
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllRead = () => setItems((p) => p.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setItems((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id: number) => setItems((p) => p.filter((n) => n.id !== id));

  const displayed = filter === "unread" ? items.filter((n) => !n.read) : items;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl">Notifications</h1>
        <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="flex items-center gap-2 mb-4 border-b border-border">
        {(["all", "unread"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn("px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize", filter === t ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
          >
            {t === "unread" ? `Unread (${items.filter((n) => !n.read).length})` : "All"}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {displayed.map((notif) => (
          <div
            key={notif.id}
            className={cn("flex items-start gap-3 p-4 rounded-xl transition-colors cursor-pointer group", !notif.read ? "bg-primary/5 hover:bg-primary/8" : "hover:bg-muted/50")}
            onClick={() => markRead(notif.id)}
          >
            {notif.user ? (
              <img src={notif.user.avatar} alt={notif.user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bell className="h-5 w-5 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed">
                {notif.user && <span className="font-semibold">{notif.user.name} </span>}
                {notif.action}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{notif.time}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notif.read && (
                <button onClick={(e) => { e.stopPropagation(); markRead(notif.id); }} className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
              <button onClick={(e) => { e.stopPropagation(); remove(notif.id); }} className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center">
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
          </div>
        ))}
        {displayed.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Bell className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
