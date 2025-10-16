import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Award, Trophy, CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import quizzesData from "@/data/quizzes.json";

type QuizState = "selection" | "active" | "results";

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [state, setState] = useState<QuizState>("selection");
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  const selectedQuiz = useMemo(() => 
    quizzesData.quizzes.find(q => q.id === selectedQuizId),
    [selectedQuizId]
  );

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
        timeLeft
      }));
    }
  }, [currentQuestion, answers, timeLeft, selectedQuizId, state]);

  const startQuiz = (quizId: string) => {
    const quiz = quizzesData.quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    // Try to recover saved progress
    const saved = localStorage.getItem(`quiz_${quizId}`);
    if (saved) {
      const { currentQuestion: q, answers: a, timeLeft: t } = JSON.parse(saved);
      setCurrentQuestion(q);
      setAnswers(a);
      setTimeLeft(t);
    } else {
      setCurrentQuestion(0);
      setAnswers({});
      setTimeLeft(quiz.duration);
    }
    
    setSelectedQuizId(quizId);
    setState("active");
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
  };

  const nextQuestion = () => {
    if (selectedQuiz && currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!selectedQuiz) return;
    
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
    
    // Save to leaderboard
    const leaderboard = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    leaderboard.push({
      quiz: selectedQuiz.title,
      score: correctCount,
      total: selectedQuiz.questions.length,
      date: new Date().toISOString()
    });
    localStorage.setItem("quiz_leaderboard", JSON.stringify(leaderboard.slice(-10)));
  };

  const resetQuiz = () => {
    setSelectedQuizId(null);
    setState("selection");
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
  };

  const getRank = () => {
    if (!selectedQuiz) return "Learner";
    const percentage = (score / selectedQuiz.questions.length) * 100;
    if (percentage === 100) return "Acharya";
    if (percentage >= 80) return "Seeker";
    return "Learner";
  };

  // Selection Screen
  if (state === "selection") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Knowledge Quiz System</h1>
            <p className="text-muted-foreground mb-8">Test your understanding of Indian knowledge and heritage</p>
            
            <div className="grid gap-4">
              {quizzesData.quizzes.map(quiz => (
                <Card key={quiz.id} className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => startQuiz(quiz.id)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{quiz.category}</Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
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
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Active Quiz
  if (state === "active" && selectedQuiz) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold gradient-text">{selectedQuiz.title}</h2>
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="h-5 w-5" />
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>

            <Progress value={progress} className="mb-6" />

            <Card>
              <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {selectedQuiz.questions.length}</CardTitle>
                <CardDescription className="text-base mt-2">{question.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswer}>
                  {question.type === "true-false" ? (
                    <>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer">
                        <RadioGroupItem value="true" id="true" />
                        <Label htmlFor="true" className="flex-1 cursor-pointer">True</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer">
                        <RadioGroupItem value="false" id="false" />
                        <Label htmlFor="false" className="flex-1 cursor-pointer">False</Label>
                      </div>
                    </>
                  ) : (
                    question.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary cursor-pointer">
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
          <div className="max-w-3xl mx-auto text-center">
            <Trophy className="h-20 w-20 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold gradient-text mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground mb-8">Great effort on {selectedQuiz.title}</p>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold gradient-text">{score}/{selectedQuiz.questions.length}</div>
                    <div className="text-sm text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">{percentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">{xp} XP</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  <Award className="h-5 w-5 mr-2" />
                  {getRank()}
                </Badge>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-8">
              {selectedQuiz.questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = userAnswer === q.answer;
                
                return (
                  <Card key={idx} className={isCorrect ? "border-green-500/50" : "border-red-500/50"}>
                    <CardHeader>
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-1" />
                        )}
                        <div className="flex-1 text-left">
                          <CardTitle className="text-base">{q.question}</CardTitle>
                          <CardDescription className="mt-2">
                            Your answer: <span className={isCorrect ? "text-green-500" : "text-red-500"}>{userAnswer || "Not answered"}</span>
                            {!isCorrect && <><br />Correct answer: <span className="text-green-500">{q.answer}</span></>}
                          </CardDescription>
                          <p className="text-sm mt-2">{q.explanation}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quizzes
              </Button>
              <Button variant="outline" onClick={() => startQuiz(selectedQuizId!)}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
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
