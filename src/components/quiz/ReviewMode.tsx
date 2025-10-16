import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Question {
  id: number;
  type: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  category?: string;
}

interface ReviewModeProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  quizCategory: string;
}

const ReviewMode = ({ questions, userAnswers, quizCategory }: ReviewModeProps) => {
  const getRelatedLink = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Ancient Texts': '/bharatiya-gyaan-kosh',
      'Science & Mathematics': '/bharatiya-gyaan-kosh',
      'Modern India': '/bharatiya-gyaan-kosh',
      'Philosophy': '/bharatiya-gyaan-kosh',
    };
    
    return categoryMap[category] || '/bharatiya-gyaan-kosh';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold gradient-text">Review Mode</h2>
        <Link to={getRelatedLink(quizCategory)}>
          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Explore Related Content
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[idx];
          const isCorrect = userAnswer === q.answer;
          
          return (
            <Card key={idx} className={`border-2 ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Question {idx + 1}</Badge>
                      <Badge variant="secondary">{q.type}</Badge>
                      {q.category && <Badge>{q.category}</Badge>}
                    </div>
                    <CardTitle className="text-base font-semibold">{q.question}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {q.options && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Options:</p>
                    {q.options.map((option, optIdx) => {
                      const isUserAnswer = option === userAnswer;
                      const isCorrectAnswer = option === q.answer;
                      
                      return (
                        <div 
                          key={optIdx}
                          className={`p-3 rounded-lg border ${
                            isCorrectAnswer 
                              ? 'bg-green-500/10 border-green-500/50'
                              : isUserAnswer 
                              ? 'bg-red-500/10 border-red-500/50'
                              : 'bg-muted/30'
                          }`}
                        >
                          {option}
                          {isCorrectAnswer && <Badge className="ml-2 bg-green-500">Correct</Badge>}
                          {isUserAnswer && !isCorrectAnswer && <Badge className="ml-2 bg-red-500">Your Answer</Badge>}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-semibold mb-2">Explanation:</p>
                  <p className="text-sm leading-relaxed">{q.explanation}</p>
                </div>

                {!isCorrect && (
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Learn More
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewMode;
