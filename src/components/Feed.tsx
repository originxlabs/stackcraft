import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ThumbsUp, MessageCircle, Repeat2, Send, Bookmark,
  MoreHorizontal, BadgeCheck, Code2,
  Flag, EyeOff, BellOff, UserPlus, UserMinus, TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { feedPosts } from "@/data/dummyData";
import PostComposer from "@/components/PostComposer";

const reactions = [
  { icon: "👍", label: "Like", color: "text-primary" },
  { icon: "💡", label: "Insightful", color: "text-amber-500" },
  { icon: "🤝", label: "Support", color: "text-green-500" },
  { icon: "🎉", label: "Celebrate", color: "text-pink-500" },
  { icon: "❤️", label: "Love", color: "text-red-500" },
  { icon: "😂", label: "Laugh", color: "text-yellow-500" },
];

interface PostCardProps {
  post: (typeof feedPosts)[0];
}

const PostCard = ({ post }: PostCardProps) => {
  const [reactionOpen, setReactionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const handleReact = (reaction: string) => {
    setUserReaction(userReaction === reaction ? null : reaction);
    setReactionOpen(false);
    setLiked(true);
  };

  return (
    <article className="feed-post animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <Link to={`/profile/${post.author.handle}`}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link to={`/profile/${post.author.handle}`} className="font-semibold text-sm hover:text-primary transition-colors">
                {post.author.name}
              </Link>
              {post.isVerified && (
                <BadgeCheck className="h-4 w-4 text-primary fill-primary/20" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{post.author.role} · {post.author.company}</p>
            <p className="text-[11px] text-muted-foreground">{post.time}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-card border border-border rounded-xl shadow-float z-20 py-1 animate-scale-in">
              {[
                { icon: Bookmark, label: "Save post" },
                { icon: BellOff, label: "Unfollow author" },
                { icon: UserPlus, label: "Follow author" },
                { icon: UserMinus, label: "Disconnect" },
                { icon: EyeOff, label: "Hide post" },
                { icon: TrendingDown, label: "Not interested" },
                { icon: Flag, label: "Report post" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{post.content}</p>
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs text-primary hover:underline cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Code Block */}
      {post.type === "code" && post.code && (
        <div className="code-block mb-3 relative overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-mono">Solidity</span>
            </div>
            <button className="text-xs text-primary hover:underline">Copy</button>
          </div>
          <pre className="text-xs font-mono overflow-x-auto">
            <code className="text-foreground">{post.code}</code>
          </pre>
        </div>
      )}

      {/* Image */}
      {post.image && (
        <div className="rounded-lg overflow-hidden mb-3 -mx-5">
          <img
            src={post.image}
            alt="Post media"
            className="w-full h-52 object-cover hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* Reaction counts */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b border-border">
        <span className="hover:text-primary cursor-pointer hover:underline">
          {(post.reactions.like + (liked ? 1 : 0)).toLocaleString()} reactions
        </span>
        <div className="flex items-center gap-3">
          <span className="hover:text-primary cursor-pointer hover:underline">{post.comments} comments</span>
          <span className="hover:text-primary cursor-pointer hover:underline">{post.reposts} reposts</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-1">
        {/* React button */}
        <div className="relative flex-1">
          <button
            className={cn(
              "btn-ghost w-full gap-1.5 py-1.5 text-xs rounded-lg",
              userReaction && "text-primary bg-primary/10"
            )}
            onMouseEnter={() => setReactionOpen(true)}
            onMouseLeave={() => setReactionOpen(false)}
            onClick={() => handleReact("Like")}
          >
            {userReaction ? (
              <span>{reactions.find((r) => r.label === userReaction)?.icon || "👍"}</span>
            ) : (
              <ThumbsUp className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{userReaction || "React"}</span>
          </button>

          {reactionOpen && (
            <div
              className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-full px-2 py-1.5 flex items-center gap-1 shadow-float z-10 animate-scale-in"
              onMouseEnter={() => setReactionOpen(true)}
              onMouseLeave={() => setReactionOpen(false)}
            >
              {reactions.map((r) => (
                <button
                  key={r.label}
                  title={r.label}
                  className="text-xl hover:scale-125 transition-transform duration-150 px-1"
                  onClick={() => handleReact(r.label)}
                >
                  {r.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn-ghost flex-1 gap-1.5 py-1.5 text-xs rounded-lg"
          onClick={() => setCommentOpen(!commentOpen)}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Comment</span>
        </button>

        <button className="btn-ghost flex-1 gap-1.5 py-1.5 text-xs rounded-lg">
          <Repeat2 className="h-4 w-4" />
          <span className="hidden sm:inline">Repost</span>
        </button>

        <button className="btn-ghost flex-1 gap-1.5 py-1.5 text-xs rounded-lg">
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>

        <button
          className={cn("btn-ghost px-2 py-1.5 rounded-lg", saved && "text-primary")}
          onClick={() => setSaved(!saved)}
        >
          <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
        </button>
      </div>

      {/* Comment input */}
      {commentOpen && (
        <div className="mt-3 flex gap-2 animate-fade-in">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="You"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Write a thoughtful comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-9 px-3 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}
    </article>
  );
};

// PostComposer is imported from PostComposer.tsx

const Feed = () => {
  return (
    <div className="space-y-3">
      <PostComposer />
      {feedPosts.map((post, i) => (
        <div
          key={post.id}
          style={{ animationDelay: `${i * 0.1}s` }}
          className="opacity-0 animate-fade-in"
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
