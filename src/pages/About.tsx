import { Target, Eye, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const teamMembers = [
    { name: "Rajesh Kumar", role: "Founder & CEO", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh" },
    { name: "Priya Sharma", role: "Head of Education", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya" },
    { name: "Amit Patel", role: "Tech Lead", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit" },
    { name: "Sneha Reddy", role: "Community Manager", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="gradient-text">Swadeshi Learning</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to democratize education and empower Atmanirbhar Bharat through
              indigenous knowledge sharing and peer-to-peer learning.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="glass-card rounded-3xl p-8 hover-glow animate-slide-up group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To create a vibrant ecosystem where every Indian can learn and teach skills freely,
                promoting self-reliance and indigenous knowledge systems. We believe in making quality
                education accessible to all, breaking down financial barriers through skill exchange.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 hover-glow animate-slide-up group" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To build India's largest peer-learning network that celebrates indigenous knowledge,
                fosters innovation, and creates a truly Atmanirbhar generation of learners and teachers.
                We envision a future where skill-sharing is the norm, not the exception.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-20 hover-glow">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Swadeshi First</h3>
                <p className="text-sm text-muted-foreground">
                  Celebrating and promoting indigenous Indian knowledge, innovations, and traditions.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Equality</h3>
                <p className="text-sm text-muted-foreground">
                  Everyone can learn and teach. No financial barriers, only passion and dedication.
                </p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building strong connections between learners and mentors across India.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Users size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals working to transform education in India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="glass-card rounded-2xl p-6 text-center hover-glow transition-all hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/30">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
