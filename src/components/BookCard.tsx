import { Book, Download, ExternalLink, CheckCircle2, Languages } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AnimatedSection from "@/components/AnimatedSection";

interface BookCardProps {
  title: string;
  author: string;
  era: string;
  theme: string;
  background: string;
  keyQuote: string;
  relevanceToday: string;
  coverImage: string;
  verified: boolean;
  citation: string;
  sanskritAvailable: boolean;
  file?: string;
  sourceUrl?: string;
  pdfUrl?: string;
  isPublicDomain?: boolean;
  source?: string;
  delay?: number;
}

const BookCard = ({
  title,
  author,
  era,
  theme,
  background,
  keyQuote,
  relevanceToday,
  coverImage,
  verified,
  citation,
  sanskritAvailable,
  file,
  sourceUrl,
  pdfUrl,
  isPublicDomain,
  source,
  delay = 0
}: BookCardProps) => {

  return (
    <AnimatedSection animation="slide-up" delay={delay}>
      <Card className="group relative overflow-hidden glass-card border-2 border-transparent hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-xl gradient-text mb-1 line-clamp-1">{title}</CardTitle>
              <CardDescription className="text-sm">
                <span className="font-medium text-foreground/80">{author}</span>
                <span className="mx-2">•</span>
                <span className="text-muted-foreground">{era}</span>
              </CardDescription>
            </div>
            {verified && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant="outline" className="text-xs">{theme}</Badge>
            {sanskritAvailable && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Languages className="h-3 w-3" />
                Sanskrit
              </Badge>
            )}
            {isPublicDomain && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                Public Domain
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="relative flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {background}
          </p>

          <div className="glass-card p-3 rounded-lg border border-primary/20 mb-4">
            <p className="text-sm font-medium italic text-primary/90 leading-relaxed">
              "{keyQuote}"
            </p>
            <p className="text-xs text-muted-foreground mt-2">— {citation}</p>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              Relevance Today
              <span className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {relevanceToday}
            </p>
          </div>
        </CardContent>

        <CardFooter className="relative flex gap-2 flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="flex-1 group/btn">
                <Book className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </DialogTrigger>
...
          </Dialog>

          {(file || pdfUrl || sourceUrl) && (
            <>
              <Button 
                variant="outline" 
                className="flex-1 hover-glow"
                asChild
              >
                <a 
                  href={pdfUrl || sourceUrl || `/books/${file}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Online
                </a>
              </Button>
              
              {pdfUrl && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="hover-glow"
                  asChild
                >
                  <a 
                    href={pdfUrl} 
                    download={file || title}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </>
          )}
          
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

export default BookCard;