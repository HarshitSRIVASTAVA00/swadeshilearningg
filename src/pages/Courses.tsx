import { useState } from "react";
import { Code, Palette, Music, Leaf, Dumbbell, BookOpen, ChefHat, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "tech", name: "Technology" },
    { id: "arts", name: "Arts & Crafts" },
    { id: "wellness", name: "Wellness" },
    { id: "skills", name: "Life Skills" },
  ];

  const courses = [
    {
      icon: Code,
      title: "Web Development Basics",
      category: "tech",
      description: "Learn HTML, CSS, and JavaScript from scratch. Build your first website.",
      skillPoints: 250,
      duration: "8 weeks",
    },
    {
      icon: Palette,
      title: "Traditional Indian Pottery",
      category: "arts",
      description: "Master the ancient art of pottery with hands-on practice and guidance.",
      skillPoints: 200,
      duration: "6 weeks",
    },
    {
      icon: Music,
      title: "Indian Classical Music",
      category: "arts",
      description: "Learn tabla, sitar, or vocal music from experienced practitioners.",
      skillPoints: 300,
      duration: "12 weeks",
    },
    {
      icon: Leaf,
      title: "Ayurveda & Natural Healing",
      category: "wellness",
      description: "Understand Ayurvedic principles and natural remedies for wellness.",
      skillPoints: 180,
      duration: "5 weeks",
    },
    {
      icon: Dumbbell,
      title: "Yoga & Meditation",
      category: "wellness",
      description: "Practice traditional yoga asanas and meditation techniques.",
      skillPoints: 150,
      duration: "4 weeks",
    },
    {
      icon: BookOpen,
      title: "Sanskrit Language",
      category: "skills",
      description: "Explore the mother of all languages and ancient scriptures.",
      skillPoints: 220,
      duration: "10 weeks",
    },
    {
      icon: ChefHat,
      title: "Indian Cuisine Mastery",
      category: "skills",
      description: "Cook authentic Indian dishes from different regions of India.",
      skillPoints: 160,
      duration: "6 weeks",
    },
    {
      icon: Camera,
      title: "Photography Basics",
      category: "arts",
      description: "Capture stunning photos with your smartphone or camera.",
      skillPoints: 190,
      duration: "5 weeks",
    },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover a wide range of skills from technology to traditional arts. Learn from peers
              and earn skill points along the way.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary"
                    : "border-primary/30 hover:border-primary hover:bg-primary/10"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.title}
                  className="glass-card rounded-2xl p-6 hover-glow transition-all hover:-translate-y-2 animate-scale-in group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-primary font-semibold">{course.skillPoints} SP</span>
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:border-primary hover:bg-primary/10 group-hover:bg-primary/10"
                  >
                    Learn More
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
