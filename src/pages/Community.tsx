import { MessageCircle, Send, Users as UsersIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Community = () => {
  const communityPlatforms = [
    {
      name: "Discord Server",
      icon: MessageCircle,
      description: "Join our vibrant Discord community with 5000+ members. Chat, share, and learn together.",
      members: "5,000+",
      link: "#",
      color: "from-[#5865F2] to-[#7289DA]",
    },
    {
      name: "Telegram Group",
      icon: Send,
      description: "Get instant updates, announcements, and connect with learners in real-time.",
      members: "3,500+",
      link: "#",
      color: "from-[#0088cc] to-[#00aaff]",
    },
    {
      name: "WhatsApp Community",
      icon: UsersIcon,
      description: "Join regional groups based on your location and interests for local meetups.",
      members: "2,000+",
      link: "#",
      color: "from-[#25D366] to-[#128C7E]",
    },
  ];

  const stats = [
    { label: "Total Members", value: "10,000+" },
    { label: "Daily Messages", value: "5,000+" },
    { label: "Study Groups", value: "150+" },
    { label: "Events/Month", value: "20+" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Community</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with thousands of learners and mentors across India. Share knowledge, ask
              questions, and grow together.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center hover-glow animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Community Platforms */}
          <div className="max-w-4xl mx-auto space-y-8">
            {communityPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <div
                  key={platform.name}
                  className="glass-card rounded-3xl p-8 md:p-10 hover-glow animate-slide-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                        <p className="text-muted-foreground mb-3 leading-relaxed">
                          {platform.description}
                        </p>
                        <div className="inline-flex items-center gap-2 text-sm">
                          <span className="text-primary font-semibold">{platform.members}</span>
                          <span className="text-muted-foreground">members</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className={`bg-gradient-to-r ${platform.color} hover:opacity-90 whitespace-nowrap`}
                    >
                      Join Now
                      <ExternalLink size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Community Benefits */}
          <div className="mt-20 glass-card rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Join Our <span className="gradient-text">Community</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get help anytime from fellow learners and mentors. Never feel stuck in your
                  learning journey.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Weekly Events</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Participate in webinars, workshops, and Q&A sessions with industry experts and
                  skilled mentors.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Study Groups</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Form or join study groups based on your interests. Learn collaboratively with peers.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Exclusive Resources</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access community-curated learning materials, templates, and resources shared by
                  experienced members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
