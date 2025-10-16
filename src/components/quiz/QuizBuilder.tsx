import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  type: 'mcq' | 'true-false';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  difficulty: string;
  questions: Question[];
}

const QuizBuilder = () => {
  const { toast } = useToast();
  const [quiz, setQuiz] = useState<Quiz>({
    id: '',
    title: '',
    description: '',
    category: '',
    duration: 600,
    difficulty: 'medium',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 1,
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    answer: '',
    explanation: ''
  });

  const addQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.answer || !currentQuestion.explanation) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestion.type === 'mcq' && currentQuestion.options?.some(opt => !opt)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all answer options",
        variant: "destructive"
      });
      return;
    }

    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion, id: prev.questions.length + 1 }]
    }));

    setCurrentQuestion({
      id: quiz.questions.length + 2,
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      answer: '',
      explanation: ''
    });

    toast({
      title: "Question Added",
      description: "Question successfully added to quiz"
    });
  };

  const removeQuestion = (id: number) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const exportQuiz = () => {
    if (!quiz.id || !quiz.title || quiz.questions.length === 0) {
      toast({
        title: "Export Error",
        description: "Please complete the quiz details and add at least one question",
        variant: "destructive"
      });
      return;
    }

    const dataStr = JSON.stringify(quiz, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-${quiz.id}.json`;
    link.click();

    toast({
      title: "Quiz Exported",
      description: "Quiz JSON file downloaded successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quiz-id">Quiz ID</Label>
              <Input
                id="quiz-id"
                value={quiz.id}
                onChange={(e) => setQuiz(prev => ({ ...prev, id: e.target.value }))}
                placeholder="ancient-knowledge"
              />
            </div>
            <div>
              <Label htmlFor="quiz-title">Title</Label>
              <Input
                id="quiz-title"
                value={quiz.title}
                onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ancient Indian Knowledge"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="quiz-desc">Description</Label>
            <Textarea
              id="quiz-desc"
              value={quiz.description}
              onChange={(e) => setQuiz(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Test your knowledge of..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quiz-category">Category</Label>
              <Input
                id="quiz-category"
                value={quiz.category}
                onChange={(e) => setQuiz(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Ancient Texts"
              />
            </div>
            <div>
              <Label htmlFor="quiz-duration">Duration (seconds)</Label>
              <Input
                id="quiz-duration"
                type="number"
                value={quiz.duration}
                onChange={(e) => setQuiz(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="quiz-difficulty">Difficulty</Label>
              <Select value={quiz.difficulty} onValueChange={(value) => setQuiz(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="q-type">Question Type</Label>
            <Select value={currentQuestion.type} onValueChange={(value: 'mcq' | 'true-false') => 
              setCurrentQuestion(prev => ({ 
                ...prev, 
                type: value,
                options: value === 'mcq' ? ['', '', '', ''] : undefined
              }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple Choice</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="q-question">Question</Label>
            <Textarea
              id="q-question"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
              placeholder="Enter your question here..."
            />
          </div>

          {currentQuestion.type === 'mcq' && (
            <div className="space-y-2">
              <Label>Answer Options</Label>
              {currentQuestion.options?.map((option, idx) => (
                <Input
                  key={idx}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(currentQuestion.options || [])];
                    newOptions[idx] = e.target.value;
                    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                  }}
                  placeholder={`Option ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div>
            <Label htmlFor="q-answer">Correct Answer</Label>
            {currentQuestion.type === 'mcq' ? (
              <Select value={currentQuestion.answer} onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, answer: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.filter(opt => opt).map((option, idx) => (
                    <SelectItem key={idx} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Select value={currentQuestion.answer} onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, answer: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">True</SelectItem>
                  <SelectItem value="false">False</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label htmlFor="q-explanation">Explanation</Label>
            <Textarea
              id="q-explanation"
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
              placeholder="Explain why this answer is correct..."
            />
          </div>

          <Button onClick={addQuestion} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {quiz.questions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Questions ({quiz.questions.length})</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="default" size="sm" onClick={exportQuiz}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quiz.questions.map((q, idx) => (
                <div key={q.id} className="flex items-start justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{idx + 1}</Badge>
                      <Badge variant="secondary">{q.type}</Badge>
                    </div>
                    <p className="font-medium">{q.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">Answer: {q.answer}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(q.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizBuilder;
