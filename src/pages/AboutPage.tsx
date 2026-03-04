import { Link } from "react-router-dom";
import { BadgeCheck, TrendingUp, Users, Globe, Shield, Zap, Trophy, ArrowRight, Heart } from "lucide-react";
import logo from "@/assets/stackcraft-logo.svg";
import prof1 from "@/assets/prof1.jpg";
import prof2 from "@/assets/prof2.jpg";
import prof3 from "@/assets/prof3.jpg";
import prof4 from "@/assets/prof4.jpg";

const AboutPage = () => (
  <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-24">
    {/* Hero */}
    <div className="text-center py-16">
      <div className="flex items-center justify-center gap-3 mb-6">
        <img src={logo} alt="Stackcraft" className="h-12 w-12" />
        <span className="font-black text-3xl tracking-tight">Stackcraft</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black mb-4">Built for the professionals<br /><span className="text-gradient">who build the future.</span></h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
        Stackcraft is India's first verified professional network — where identity is trusted, skills are scored, and opportunity is transparent.
      </p>
    </div>

    {/* Mission */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <h2 className="text-3xl font-black mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Professional networking is broken. Fake profiles. Spam messages. Opaque algorithms. Gatekept opportunities.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          We built Stackcraft to fix that — with verified identities, transparent AI, and a platform that respects your time and privacy.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Every engineer, designer, researcher, and founder deserves a professional home that matches their calibre.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: BadgeCheck, title: "Verified", desc: "MCA + domain + skill verification" },
          { icon: Shield, title: "Private", desc: "Granular privacy controls by default" },
          { icon: TrendingUp, title: "Transparent", desc: "Algorithm explains every recommendation" },
          { icon: Zap, title: "Intelligent", desc: "AI that works for you, not against you" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-premium p-4">
            <Icon className="h-6 w-6 text-primary mb-2" />
            <p className="font-bold text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Team */}
    <div className="mb-24">
      <h2 className="text-3xl font-black mb-2 text-center">The Team</h2>
      <p className="text-muted-foreground text-center mb-10">World-class engineers, designers and operators.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "Anand K.", role: "CTO & Co-founder", img: prof1 },
          { name: "Priya S.", role: "VP Engineering", img: prof2 },
          { name: "Rahul K.", role: "Head of Design", img: prof3 },
          { name: "Sneha P.", role: "VP Product", img: prof4 },
        ].map((m) => (
          <div key={m.name} className="card-premium p-5 text-center">
            <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-primary/10" />
            <p className="font-semibold text-sm">{m.name}</p>
            <p className="text-xs text-muted-foreground">{m.role}</p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center card-premium p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
      <h2 className="text-3xl font-black mb-3">Join our mission</h2>
      <p className="text-muted-foreground mb-6">We're hiring world-class talent to build the future of professional networking.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/feed" className="btn-primary py-3 px-8">Join Stackcraft</Link>
        <Link to="/jobs" className="btn-outline py-3 px-8">View Open Roles</Link>
      </div>
    </div>
  </div>
);

export default AboutPage;
