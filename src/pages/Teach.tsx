import { useState } from "react";
import { GraduationCap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Teach = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Application Submitted! 🎉",
        description: "We'll review your application and get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        experience: "",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                <GraduationCap size={40} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Become a <span className="gradient-text">Mentor</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Share your expertise and earn skill points while empowering others. Join our community
                of passionate teachers.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-12 hover-glow animate-scale-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-muted/30 border-border focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-muted/30 border-border focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                    placeholder="+91 1234567890"
                  />
                </div>

                <div>
                  <label htmlFor="skills" className="block text-sm font-semibold mb-2">
                    Skills You Can Teach *
                  </label>
                  <Input
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                    placeholder="e.g., Web Development, Yoga, Pottery, Music"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold mb-2">
                    Years of Experience *
                  </label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="bg-muted/30 border-border focus:border-primary"
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Why do you want to teach? *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-muted/30 border-border focus:border-primary resize-none"
                    placeholder="Tell us about your passion for teaching and what motivates you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Application
                      <Send size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-6 text-center">
                <h3 className="text-3xl font-bold gradient-text mb-2">100+</h3>
                <p className="text-sm text-muted-foreground">Active Mentors</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <h3 className="text-3xl font-bold gradient-text mb-2">500+</h3>
                <p className="text-sm text-muted-foreground">Students Taught</p>
              </div>
              <div className="glass-card rounded-2xl p-6 text-center">
                <h3 className="text-3xl font-bold gradient-text mb-2">4.8★</h3>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Teach;
