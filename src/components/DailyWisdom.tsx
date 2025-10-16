import { useState, useEffect } from "react";
import { RefreshCw, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WisdomQuote {
  text: string;
  translation: string;
  source: string;
  category: string;
}

interface DailyWisdomProps {
  quotes: WisdomQuote[];
}

const DailyWisdom = ({ quotes }: DailyWisdomProps) => {
  const [currentQuote, setCurrentQuote] = useState<WisdomQuote | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    // Get daily quote based on date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, [quotes]);

  if (!currentQuote) return null;

  return (
    <div className="glass-card p-6 rounded-lg border border-primary/20 relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Daily Wisdom</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className={cn(
              "h-8 w-8 hover:bg-primary/10 transition-all",
              isRefreshing && "animate-spin"
            )}
            aria-label="Refresh quote"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className={cn(
          "transition-opacity duration-300",
          isRefreshing ? "opacity-0" : "opacity-100"
        )}>
          {currentQuote.text !== currentQuote.translation && (
            <p className="text-base font-medium text-primary/90 mb-2 italic leading-relaxed">
              {currentQuote.text}
            </p>
          )}
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            {currentQuote.translation}
          </p>
          <p className="text-xs text-muted-foreground">
            — {currentQuote.source}
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function for className
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default DailyWisdom;