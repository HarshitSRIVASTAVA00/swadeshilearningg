import { Play, Headphones, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MultimediaCardProps {
  title: string;
  type: "video" | "audio";
  duration: string;
  description: string;
  thumbnail: string;
  url: string;
}

const MultimediaCard = ({ title, type, duration, description, thumbnail, url }: MultimediaCardProps) => {
  return (
    <Card className="group overflow-hidden glass-card border-2 border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50 group-hover:scale-110 transition-transform">
            {type === "video" ? (
              <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
            ) : (
              <Headphones className="h-8 w-8 text-primary-foreground" />
            )}
          </div>
        </div>

        {/* Type badge */}
        <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground">
          {type === "video" ? "Video" : "Audio"}
        </Badge>

        {/* Duration */}
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 text-xs">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default MultimediaCard;