import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface TimelineItem {
  era: string;
  period: string;
  innovations: string;
  color: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative py-12">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden lg:block" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelinePoint key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

const TimelinePoint = ({ item, index }: { item: TimelineItem; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3, triggerOnce: true });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid lg:grid-cols-2 gap-8 items-center",
        "opacity-0 transition-all duration-700",
        isVisible && "opacity-100"
      )}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      {/* Content - Desktop */}
      <div className={cn(
        "hidden lg:block",
        isLeft ? "text-right pr-12" : "lg:col-start-2 pl-12"
      )}>
        <div className="inline-block text-left">
          <h3 className={cn(
            "text-2xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
            item.color
          )}>
            {item.era}
          </h3>
          <p className="text-sm text-muted-foreground font-medium mb-3">{item.period}</p>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-md">
            {item.innovations}
          </p>
        </div>
      </div>

      {/* Timeline dot - Desktop */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
        <div className={cn(
          "w-6 h-6 rounded-full border-4 border-background transition-all duration-500",
          `bg-gradient-to-br ${item.color}`,
          isVisible && "scale-110 shadow-lg shadow-primary/50"
        )} />
      </div>

      {/* Content - Mobile */}
      <div className="lg:hidden glass-card p-6 rounded-lg border-l-4 hover-glow" 
           style={{ borderLeftColor: `hsl(var(--primary))` }}>
        <h3 className={cn(
          "text-xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
          item.color
        )}>
          {item.era}
        </h3>
        <p className="text-sm text-muted-foreground font-medium mb-3">{item.period}</p>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {item.innovations}
        </p>
      </div>
    </div>
  );
};

export default Timeline;