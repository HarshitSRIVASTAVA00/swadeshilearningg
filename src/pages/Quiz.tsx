import { useState, useEffect, useMemo } from "react";
import { Clock, Award, Trophy, CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Users, Eye, Flame, Settings, Bookmark, BookmarkPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import quizzesData from "@/data/quizzes.json";
import QuizAnalytics from "@/components/quiz/QuizAnalytics";
import StreakTracker from "@/components/quiz/StreakTracker";
import ReviewMode from "@/components/quiz/ReviewMode";
import CertificateGenerator from "@/components/quiz/CertificateGenerator";
import VoiceReader from "@/components/quiz/VoiceReader";

type QuizState = "selection" | "active" | "results" | "review";

const Quiz = () => {
  const { toast } = useToast();
  const [state, setState] = useState<QuizState>("selection");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [focusMode, setFocusMode] = useState(false);
  const [smartMode, setSmartMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]);
  const [difficultyProgress, setDifficultyProgress] = useState<{ question: number; difficulty: number }[]>([]);

  const selectedQuiz = useMemo(() => 
    quizzesData.quizzes.find(q => q.id === selectedQuizId),
    [selectedQuizId]
  );

  // Load user name from localStorage
  useEffect(() => {
    const name = localStorage.getItem('quiz_username');
    if (name) setUserName(name);
    
    const bookmarks = localStorage.getItem('saved_questions');
    if (bookmarks) setSavedQuestions(JSON.parse(bookmarks));
  }, []);

  // Timer
  useEffect(() => {
    if (state === "active" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (state === "active" && timeLeft === 0) {
      handleSubmit();
    }
  }, [state, timeLeft]);

  // Autosave to localStorage
  useEffect(() => {
    if (state === "active" && selectedQuizId) {
      localStorage.setItem(`quiz_${selectedQuizId}`, JSON.stringify({
        currentQuestion,
        answers,
        timeLeft,
        timePerQuestion
      }));
    }
  }, [currentQuestion, answers, timeLeft, selectedQuizId, state, timePerQuestion]);

  // Voice commands
  useEffect(() => {
    if (state !== "active" || !('webkitSpeechRecognition' in window)) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      
      if (transcript.includes('next')) {
        nextQuestion();
      } else if (transcript.includes('previous') || transcript.includes('back')) {
        prevQuestion();
      } else if (transcript.includes('submit')) {
        handleSubmit();
      }
    };

    recognition.start();
    return () => recognition.stop();
  }, [state, currentQuestion]);

  const startQuiz = (quizId: string) => {
    const quiz = quizzesData.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    if (!userName) {
      toast({
        title: "Set Your Name",
        description: "Please set a nickname before starting the quiz",
        variant: "destructive"
      });
      return;
    }
    
    // Try to recover saved progress
    const saved = localStorage.getItem(`quiz_${quizId}`);
    if (saved) {
      const { currentQuestion: q, answers: a, timeLeft: t, timePerQuestion: tpq } = JSON.parse(saved);
      setCurrentQuestion(q);
      setAnswers(a);
      setTimeLeft(t);
      setTimePerQuestion(tpq || []);
    } else {
      setCurrentQuestion(0);
      setAnswers({});
      setTimeLeft(quiz.duration);
      setTimePerQuestion([]);
      setDifficultyProgress([]);
    }
    
    setSelectedQuizId(quizId);
    setState("active");
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      // Record time for current question
      const timeTaken = (Date.now() - questionStartTime) / 1000;
      setTimePerQuestion(prev => {
        const newTimes = [...prev];
        newTimes[currentQuestion] = timeTaken;
        return newTimes;
      });

      setCurrentQuestion(currentQuestion + 1);
      setQuestionStartTime(Date.now());

      // Smart mode: adjust difficulty visualization
      if (smartMode) {
        const isCorrect = answers[currentQuestion] === selectedQuiz.questions[currentQuestion].answer;
        const newDifficulty = isCorrect ? Math.min(5, (difficultyProgress[difficultyProgress.length - 1]?.difficulty || 2) + 0.5) : Math.max(1, (difficultyProgress[difficultyProgress.length - 1]?.difficulty || 2) - 0.5);
        setDifficultyProgress(prev => [...prev, { question: currentQuestion + 2, difficulty: newDifficulty }]);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const toggleBookmark = (questionId: number) => {
    setSavedQuestions(prev => {
      const newSaved = prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId];
      
      localStorage.setItem('saved_questions', JSON.stringify(newSaved));
      return newSaved;
    });

    toast({
      title: savedQuestions.includes(questionId) ? "Bookmark Removed" : "Question Bookmarked",
      description: savedQuestions.includes(questionId) ? "Question removed from saved questions" : "Question saved for future study"
    });
  };

  const handleSubmit = () => {
    if (!selectedQuiz) return;
    
    // Record time for last question
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    const finalTimes = [...timePerQuestion];
    finalTimes[currentQuestion] = timeTaken;
    setTimePerQuestion(finalTimes);

    let correctCount = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (q.type === "true-false") {
        if (userAnswer === q.answer) correctCount++;
      } else if (userAnswer === q.answer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setState("results");
    localStorage.removeItem(`quiz_${selectedQuizId}`);
    
    // Update streak and stats
    updateStreakData(correctCount, selectedQuiz.questions.length, selectedQuiz.category);
    
    // Save to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    leaderboard.push({
      userName,
      quiz: selectedQuiz.title,
      score: correctCount,
      total: selectedQuiz.questions.length,
      percentage: ((correctCount / selectedQuiz.questions.length) * 100).toFixed(1),
      date: new Date().toISOString(),
      timeSpent: finalTimes.reduce((a, b) => a + b, 0)
    });
    localStorage.setItem("quiz_leaderboard", JSON.stringify(leaderboard.slice(-50)));
  };

  const updateStreakData = (score: number, total: number, category: string) => {
    const today = new Date().toDateString();
    const streakData = JSON.parse(localStorage.getItem('quiz_streak_data') || '{"currentStreak":0,"longestStreak":0,"lastPlayedDate":"","totalQuizzes":0,"badges":[],"missions":[]}');
    
    // Update streak
    if (streakData.lastPlayedDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (streakData.lastPlayedDate === yesterday) {
        streakData.currentStreak++;
      } else {
        streakData.currentStreak = 1;
      }
      streakData.lastPlayedDate = today;
      streakData.longestStreak = Math.max(streakData.longestStreak, streakData.currentStreak);
    }

    streakData.totalQuizzes++;

    // Check and award badges
    if (streakData.totalQuizzes === 1 && !streakData.badges.includes('first_quiz')) {
      streakData.badges.push('first_quiz');
      toast({ title: "🎉 Badge Earned!", description: "First Steps - You've completed your first quiz!" });
    }
    if (streakData.currentStreak >= 7 && !streakData.badges.includes('week_streak')) {
      streakData.badges.push('week_streak');
      toast({ title: "🔥 Badge Earned!", description: "7-Day Warrior - You've maintained a 7-day streak!" });
    }
    if (score === total && !streakData.badges.includes('perfect_score')) {
      streakData.badges.push('perfect_score');
      toast({ title: "🏆 Badge Earned!", description: "Perfectionist - You scored 100%!" });
    }
    if (streakData.totalQuizzes >= 10 && !streakData.badges.includes('quiz_master')) {
      streakData.badges.push('quiz_master');
      toast({ title: "👑 Badge Earned!", description: "Quiz Master - You've completed 10 quizzes!" });
    }

    localStorage.setItem('quiz_streak_data', JSON.stringify(streakData));
  };

  const resetQuiz = () => {
    setSelectedQuizId(null);
    setState("selection");
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setTimePerQuestion([]);
    setDifficultyProgress([]);
  };

  const getRank = () => {
    if (!selectedQuiz) return "Learner";
    const percentage = (score / selectedQuiz.questions.length) * 100;
    if (percentage === 100) return "Acharya";
    if (percentage >= 80) return "Seeker";
    return "Learner";
  };

  const categoryPerformance = useMemo(() => {
    if (!selectedQuiz) return [];
    const categories: Record<string, { correct: number; total: number }> = {};
    
    selectedQuiz.questions.forEach((q, idx) => {
      const cat = selectedQuiz.category;
      if (!categories[cat]) {
        categories[cat] = { correct: 0, total: 0 };
      }
      categories[cat].total++;
      if (answers[idx] === q.answer) {
        categories[cat].correct++;
      }
    });

    return Object.entries(categories).map(([category, data]) => ({
      category,
      ...data
    }));
  }, [selectedQuiz, answers]);

  // Generate challenge link
  const generateChallengeLink = () => {
    const challengeId = Math.random().toString(36).substring(7);
    const link = `${window.location.origin}/quiz?challenge=${challengeId}&quiz=${selectedQuizId}`;
    
    navigator.clipboard.writeText(link);
    toast({
      title: "Challenge Link Copied!",
      description: "Share this link with friends to challenge them"
    });
  };

  // Selection Screen
  if (state === "selection") {
    const leaderboard = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]")
      .sort((a: any, b: any) => parseFloat(b.percentage) - parseFloat(a.percentage))
      .slice(0, 10);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <Tabs defaultValue="quizzes" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="leaderboard">
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </TabsTrigger>
              <TabsTrigger value="stats">
                <Flame className="h-4 w-4 mr-2" />
                Stats & Streaks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quizzes" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Knowledge Quiz System</h1>
                  <p className="text-muted-foreground">Test your understanding of Indian knowledge and heritage</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Set Nickname
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set Your Nickname</DialogTitle>
                      <DialogDescription>Your nickname will appear on the leaderboard</DialogDescription>
                    </DialogHeader>
                    <Input
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        localStorage.setItem('quiz_username', e.target.value);
                      }}
                      placeholder="Enter your nickname"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {userName && (
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="text-sm">
                      Welcome back, <span className="font-bold gradient-text">{userName}</span>! 👋
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Switch checked={smartMode} onCheckedChange={setSmartMode} />
                  <Label>Smart Mode (Adaptive Difficulty)</Label>
                </div>
              </div>
              
              <div className="grid gap-4">
                {quizzesData.quizzes.map(quiz => (
                  <Card key={quiz.id} className="hover:border-primary/50 transition-all cursor-pointer group" onClick={() => startQuiz(quiz.id)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="group-hover:text-primary transition-colors">{quiz.title}</CardTitle>
                          <CardDescription>{quiz.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{quiz.category}</Badge>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {Math.floor(quiz.duration / 60)} min
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {quiz.questions.length} questions
                        </Badge>
                        <Badge variant="secondary" className="text-xs capitalize">{quiz.difficulty}</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leaderboard.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No scores yet. Be the first to complete a quiz!</p>
                  ) : (
                    <div className="space-y-3">
                      {leaderboard.map((entry: any, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{entry.userName}</p>
                              <p className="text-sm text-muted-foreground">{entry.quiz}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold gradient-text">{entry.percentage}%</div>
                            <p className="text-xs text-muted-foreground">{entry.score}/{entry.total} correct</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <StreakTracker />
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    );
  }

  // Active Quiz
  if (state === "active" && selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;
    const isBookmarked = savedQuestions.includes(currentQuestion);

    return (
      <div className="min-h-screen bg-background">
        {!focusMode && <Navbar />}
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold gradient-text">{selectedQuiz.title}</h2>
                {smartMode && (
                  <Badge variant="outline" className="mt-1">Smart Mode Active</Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={focusMode} onCheckedChange={setFocusMode} />
                  <Label className="text-xs">Focus</Label>
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Clock className="h-5 w-5 text-primary" />
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
              </div>
            </div>

            <Progress value={progress} className="mb-6" />

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                      <VoiceReader text={question.question} />
                    </CardTitle>
                    <CardDescription className="text-base mt-2">{question.question}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(currentQuestion)}
                  >
                    {isBookmarked ? (
                      <Bookmark className="h-5 w-5 fill-primary text-primary" />
                    ) : (
                      <BookmarkPlus className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswer}>
                  {question.type === "true-false" ? (
                    <>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer transition-all">
                        <RadioGroupItem value="true" id="true" />
                        <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer transition-all">
                        <RadioGroupItem value="false" id="false" />
                        <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                      </div>
                    </>
                  ) : (
                    question.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer transition-all">
                        <RadioGroupItem value={option} id={`option-${idx}`} />
                        <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">{option}</Label>
                      </div>
                    ))
                  )}
                </RadioGroup>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  {currentQuestion < selectedQuiz.questions.length - 1 ? (
                    <Button onClick={nextQuestion} className="flex-1">
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="flex-1">
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Results Screen
  if (state === "results" && selectedQuiz) {
    const percentage = (score / selectedQuiz.questions.length) * 100;
    const xp = score * 10;

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            {percentage === 100 && (
              <div className="text-center mb-8 animate-fade-in">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-5xl font-bold gradient-text mb-2">Perfect Score!</h1>
                <p className="text-muted-foreground">Outstanding performance!</p>
              </div>
            )}

            {percentage < 100 && (
              <div className="text-center mb-8">
                <Trophy className="h-20 w-20 mx-auto mb-4 text-primary" />
                <h1 className="text-4xl font-bold gradient-text mb-2">Quiz Complete!</h1>
                <p className="text-muted-foreground">Great effort on {selectedQuiz.title}</p>
              </div>
            )}

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">{score}/{selectedQuiz.questions.length}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">{percentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">{xp} XP</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    <Award className="h-5 w-5 mr-2" />
                    {getRank()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="analytics" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="questions">Review Questions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analytics">
                <QuizAnalytics
                  score={score}
                  total={selectedQuiz.questions.length}
                  timePerQuestion={timePerQuestion}
                  categoryPerformance={categoryPerformance}
                  difficultyData={smartMode ? difficultyProgress : undefined}
                />
              </TabsContent>

              <TabsContent value="questions">
                <ReviewMode
                  questions={selectedQuiz.questions}
                  userAnswers={answers}
                  quizCategory={selectedQuiz.category}
                />
              </TabsContent>
            </Tabs>

            <CertificateGenerator
              userName={userName}
              quizTitle={selectedQuiz.title}
              score={score}
              total={selectedQuiz.questions.length}
              date={new Date().toISOString()}
            />

            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={resetQuiz}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
              <Button variant="outline" onClick={() => startQuiz(selectedQuizId!)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button variant="outline" onClick={generateChallengeLink}>
                <Users className="h-4 w-4 mr-2" />
                Challenge Friend
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default Quiz;
