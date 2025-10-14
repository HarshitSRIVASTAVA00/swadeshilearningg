import { Rocket, PlayCircle, BookOpen, Users, Trophy, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                LEARN ➤ TEACH ➤ GROW
                <span className="block text-2xl md:text-3xl mt-4 text-muted-foreground">WITH</span>
                <span className="block gradient-text mt-2">Swadeshi Learning</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Exchange skills without money. Earn Skill Points. Build an Atmanirbhar Bharat through
                gamified peer-to-peer learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Rocket className="mr-2" size={20} />
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                  <PlayCircle className="mr-2" size={20} />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <StatsCard value={2542} label="Skill Swaps" suffix="+" />
              <StatsCard value={1230} label="Active Mentors" suffix="+" />
              <StatsCard value={15000} label="Skill Points" suffix="+" />
              <StatsCard value={5840} label="Active Users" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 hover-glow">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-center mb-4">
                What is Swadeshi Learning?
              </h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Empowering Atmanirbhar Bharat through Skill Exchange
              </p>

              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-primary mb-3">The Problem</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Students and young professionals lack access to affordable and practical skill learning.
                    India's Swadeshi knowledge systems remain underutilized, forcing learners to depend on
                    costly foreign platforms.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-primary mb-3">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A gamified platform where you exchange skills without money. Teach pottery, learn coding.
                    Earn Skill Points through peer-to-peer learning while exploring Swadeshi innovations and
                    Indian-origin skills.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-primary mb-3">Key Features</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gamification with quizzes, leaderboards, and badges. Curated Swadeshi Library of Indian
                    innovators and startups. AI-based recommendations tailored to your interests. Multi-language
                    support across India.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]">
                  <h3 className="text-xl font-semibold text-primary mb-3">Our Impact</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building a Swadeshi knowledge ecosystem across schools, colleges, and startups. Promoting
                    Atmanirbhar Bharat values through accessible peer-to-peer learning for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Swadeshi Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience a revolutionary way to learn and teach skills through our indigenous platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Skill Exchange"
              description="Learn new skills by teaching what you know. No money involved, just pure knowledge sharing."
            />
            <FeatureCard
              icon={Trophy}
              title="Gamification"
              description="Earn skill points, unlock badges, and climb leaderboards as you learn and teach."
            />
            <FeatureCard
              icon={Users}
              title="Community Learning"
              description="Connect with mentors and learners across India. Build lasting relationships."
            />
            <FeatureCard
              icon={Lightbulb}
              title="Swadeshi Knowledge"
              description="Access curated content from Indian innovators, startups, and traditional wisdom."
            />
            <FeatureCard
              icon={Rocket}
              title="AI Recommendations"
              description="Get personalized learning paths based on your interests and goals."
            />
            <FeatureCard
              icon={PlayCircle}
              title="Multi-Language"
              description="Learn in your preferred language. Supporting all major Indian languages."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
