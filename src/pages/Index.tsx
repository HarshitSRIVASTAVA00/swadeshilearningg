import { Rocket, PlayCircle, BookOpen, Users, Trophy, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import FeatureCard from "@/components/FeatureCard";
import AnimatedSection from "@/components/AnimatedSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-to-content focus-visible-custom">
        Skip to main content
      </a>
      <Navbar />

      {/* Hero Section */}
      <section 
        id="main-content"
        className="min-h-screen flex items-center pt-24 pb-12 pattern-dots relative overflow-hidden"
        role="banner"
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-gradient-radial opacity-50" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                LEARN ➤ TEACH ➤ GROW
                <span className="block text-2xl md:text-3xl mt-4 text-muted-foreground">WITH</span>
                <span className="block gradient-text mt-2">Swadeshi Learning</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-balance">
                Exchange skills without money. Earn Skill Points. Build an Atmanirbhar Bharat through
                gamified peer-to-peer learning.
              </p>
              <div className="flex flex-wrap gap-4" role="group" aria-label="Call to action buttons">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 focus-visible-custom"
                  aria-label="Get started with Swadeshi Learning"
                >
                  <Rocket className="mr-2" size={20} aria-hidden="true" />
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 focus-visible-custom"
                  aria-label="Watch demonstration video"
                >
                  <PlayCircle className="mr-2" size={20} aria-hidden="true" />
                  Watch Demo
                </Button>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left" delay={200}>
              <div className="grid grid-cols-2 gap-4 md:gap-6" role="region" aria-label="Platform statistics">
                <StatsCard value={2542} label="Skill Swaps" suffix="+" />
                <StatsCard value={1230} label="Active Mentors" suffix="+" />
                <StatsCard value={15000} label="Skill Points" suffix="+" />
                <StatsCard value={5840} label="Active Users" suffix="+" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card/30 relative" aria-labelledby="about-heading">
        <div className="divider-gradient absolute top-0 left-1/4 right-1/4" aria-hidden="true" />
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection animation="fade">
              <div className="glass-card rounded-3xl p-8 md:p-12 hover-glow">
                <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text text-center mb-4">
                  What is Swadeshi Learning?
                </h2>
                <p className="text-xl text-muted-foreground text-center mb-12 text-balance">
                  Empowering Atmanirbhar Bharat through Skill Exchange
                </p>

                <div className="space-y-6" role="list" aria-label="Platform information">
                  <AnimatedSection animation="slide-up" delay={100}>
                    <article className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]" role="listitem">
                      <h3 className="text-xl font-semibold text-primary mb-3">The Problem</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Students and young professionals lack access to affordable and practical skill learning.
                        India's Swadeshi knowledge systems remain underutilized, forcing learners to depend on
                        costly foreign platforms.
                      </p>
                    </article>
                  </AnimatedSection>

                  <AnimatedSection animation="slide-up" delay={200}>
                    <article className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]" role="listitem">
                      <h3 className="text-xl font-semibold text-primary mb-3">Our Solution</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        A gamified platform where you exchange skills without money. Teach pottery, learn coding.
                        Earn Skill Points through peer-to-peer learning while exploring Swadeshi innovations and
                        Indian-origin skills.
                      </p>
                    </article>
                  </AnimatedSection>

                  <AnimatedSection animation="slide-up" delay={300}>
                    <article className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]" role="listitem">
                      <h3 className="text-xl font-semibold text-primary mb-3">Key Features</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Gamification with quizzes, leaderboards, and badges. Curated Swadeshi Library of Indian
                        innovators and startups. AI-based recommendations tailored to your interests. Multi-language
                        support across India.
                      </p>
                    </article>
                  </AnimatedSection>

                  <AnimatedSection animation="slide-up" delay={400}>
                    <article className="glass-card rounded-2xl p-6 hover-glow transition-all hover:scale-[1.02]" role="listitem">
                      <h3 className="text-xl font-semibold text-primary mb-3">Our Impact</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Building a Swadeshi knowledge ecosystem across schools, colleges, and startups. Promoting
                        Atmanirbhar Bharat values through accessible peer-to-peer learning for everyone.
                      </p>
                    </article>
                  </AnimatedSection>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden" aria-labelledby="features-heading">
        <div className="pattern-lines absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade">
            <header className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose <span className="gradient-text">Swadeshi Learning</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                Experience a revolutionary way to learn and teach skills through our indigenous platform
              </p>
            </header>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Platform features">
            <AnimatedSection animation="scale" delay={100}>
              <div role="listitem">
                <FeatureCard
                  icon={BookOpen}
                  title="Skill Exchange"
                  description="Learn new skills by teaching what you know. No money involved, just pure knowledge sharing."
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div role="listitem">
                <FeatureCard
                  icon={Trophy}
                  title="Gamification"
                  description="Earn skill points, unlock badges, and climb leaderboards as you learn and teach."
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div role="listitem">
                <FeatureCard
                  icon={Users}
                  title="Community Learning"
                  description="Connect with mentors and learners across India. Build lasting relationships."
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={400}>
              <div role="listitem">
                <FeatureCard
                  icon={Lightbulb}
                  title="Swadeshi Knowledge"
                  description="Access curated content from Indian innovators, startups, and traditional wisdom."
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={500}>
              <div role="listitem">
                <FeatureCard
                  icon={Rocket}
                  title="AI Recommendations"
                  description="Get personalized learning paths based on your interests and goals."
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={600}>
              <div role="listitem">
                <FeatureCard
                  icon={PlayCircle}
                  title="Multi-Language"
                  description="Learn in your preferred language. Supporting all major Indian languages."
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
