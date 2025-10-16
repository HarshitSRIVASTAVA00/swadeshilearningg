import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizBuilder from "@/components/quiz/QuizBuilder";
import { Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ADMIN_PASSWORD = "swadeshi2024"; // In production, use proper authentication

const QuizBuilderPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("quiz_builder_auth", "true");
    }
  };

  // Check if already authenticated
  useState(() => {
    const auth = localStorage.getItem("quiz_builder_auth");
    if (auth === "true") setIsAuthenticated(true);
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <CardTitle>Admin Access Required</CardTitle>
                </div>
                <CardDescription>
                  Enter the admin password to access the Quiz Builder
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button onClick={handleLogin} className="w-full">
                    Access Quiz Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold gradient-text mb-4">Quiz Builder</h1>
          <p className="text-muted-foreground mb-8">
            Create and export custom quizzes for the Swadeshi Learning platform
          </p>
          <QuizBuilder />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizBuilderPage;
