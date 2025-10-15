import { Award, BookOpen, TrendingUp, Users, Trophy, Target, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "Priya Sharma",
    skillPoints: 1250,
    rank: 42,
    badges: 8,
    coursesCompleted: 3,
    coursesInProgress: 2,
  };

  const enrolledCourses = [
    {
      title: "Web Development Basics",
      progress: 75,
      nextLesson: "JavaScript Functions",
      instructor: "Rahul Kumar",
      dueDate: "2 days",
    },
    {
      title: "Indian Classical Music",
      progress: 40,
      nextLesson: "Raag Bhairav Practice",
      instructor: "Lakshmi Iyer",
      dueDate: "5 days",
    },
  ];

  const completedCourses = [
    { title: "Yoga & Meditation", completedDate: "Dec 2024", skillPoints: 150 },
    { title: "Traditional Pottery", completedDate: "Nov 2024", skillPoints: 200 },
    { title: "Photography Basics", completedDate: "Oct 2024", skillPoints: 190 },
  ];

  const badges = [
    { name: "First Course", icon: "🎯", earned: "Oct 2024" },
    { name: "5 Skills", icon: "⭐", earned: "Nov 2024" },
    { name: "Top Learner", icon: "🏆", earned: "Nov 2024" },
    { name: "Mentor Helper", icon: "🤝", earned: "Dec 2024" },
    { name: "100 Days", icon: "📅", earned: "Dec 2024" },
    { name: "Community Star", icon: "✨", earned: "Dec 2024" },
    { name: "Fast Learner", icon: "⚡", earned: "Jan 2025" },
    { name: "Skill Master", icon: "🎓", earned: "Jan 2025" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <AnimatedSection animation="fade">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome back, <span className="gradient-text">{userData.name}</span>!
              </h1>
              <p className="text-xl text-muted-foreground">
                Continue your learning journey and unlock new skills
              </p>
            </div>
          </AnimatedSection>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <AnimatedSection animation="scale" delay={100}>
              <div className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="text-primary" size={24} />
                  <h3 className="text-sm text-muted-foreground">Skill Points</h3>
                </div>
                <p className="text-3xl font-bold gradient-text">{userData.skillPoints}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={200}>
              <div className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-secondary" size={24} />
                  <h3 className="text-sm text-muted-foreground">Rank</h3>
                </div>
                <p className="text-3xl font-bold">#{userData.rank}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={300}>
              <div className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-primary" size={24} />
                  <h3 className="text-sm text-muted-foreground">Badges</h3>
                </div>
                <p className="text-3xl font-bold">{userData.badges}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scale" delay={400}>
              <div className="glass-card rounded-2xl p-6 hover-lift">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-secondary" size={24} />
                  <h3 className="text-sm text-muted-foreground">Completed</h3>
                </div>
                <p className="text-3xl font-bold">{userData.coursesCompleted}</p>
              </div>
            </AnimatedSection>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Courses */}
              <AnimatedSection animation="slide-up">
                <div className="glass-card rounded-3xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <BookOpen className="text-primary" size={28} />
                      Courses in Progress
                    </h2>
                    <Link to="/courses">
                      <Button variant="outline" className="border-primary/30 hover:border-primary">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {enrolledCourses.map((course, index) => (
                      <div
                        key={index}
                        className="glass-card rounded-2xl p-6 hover-glow transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {course.instructor}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold gradient-text">{course.progress}%</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock size={12} /> Due in {course.dueDate}
                            </p>
                          </div>
                        </div>

                        <Progress value={course.progress} className="h-2 mb-3" />

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Next: {course.nextLesson}
                          </p>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                            Continue Learning
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Completed Courses */}
              <AnimatedSection animation="slide-up" delay={100}>
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <CheckCircle className="text-secondary" size={28} />
                    Completed Courses
                  </h2>

                  <div className="space-y-3">
                    {completedCourses.map((course, index) => (
                      <div
                        key={index}
                        className="glass-card rounded-xl p-4 flex items-center justify-between hover-lift"
                      >
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">{course.completedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-primary font-semibold">+{course.skillPoints} SP</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <AnimatedSection animation="slide-left">
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Target className="text-primary" size={28} />
                    Quick Actions
                  </h2>

                  <div className="space-y-3">
                    <Link to="/teach">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary justify-start">
                        <Users size={20} className="mr-2" />
                        Become a Mentor
                      </Button>
                    </Link>
                    <Link to="/courses">
                      <Button variant="outline" className="w-full border-primary/30 hover:border-primary justify-start">
                        <BookOpen size={20} className="mr-2" />
                        Request a Course
                      </Button>
                    </Link>
                    <Link to="/community">
                      <Button variant="outline" className="w-full border-primary/30 hover:border-primary justify-start">
                        <Users size={20} className="mr-2" />
                        Join Community
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>

              {/* Badges */}
              <AnimatedSection animation="slide-left" delay={100}>
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Award className="text-primary" size={28} />
                    Your Badges
                  </h2>

                  <div className="grid grid-cols-4 gap-3">
                    {badges.map((badge, index) => (
                      <div
                        key={index}
                        className="glass-card rounded-xl p-3 text-center hover-scale cursor-pointer"
                        title={`${badge.name} - Earned ${badge.earned}`}
                      >
                        <div className="text-3xl mb-1">{badge.icon}</div>
                        <p className="text-xs text-muted-foreground truncate">{badge.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
