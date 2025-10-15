import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
}

const AnimatedSection = ({ 
  children, 
  className, 
  delay = 0,
  animation = "fade"
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const animationClasses = {
    fade: "opacity-0 transition-opacity duration-700",
    "slide-up": "opacity-0 translate-y-10 transition-all duration-700",
    "slide-left": "opacity-0 translate-x-10 transition-all duration-700",
    "slide-right": "opacity-0 -translate-x-10 transition-all duration-700",
    scale: "opacity-0 scale-95 transition-all duration-700"
  };

  const visibleClasses = {
    fade: "opacity-100",
    "slide-up": "opacity-100 translate-y-0",
    "slide-left": "opacity-100 translate-x-0",
    "slide-right": "opacity-100 translate-x-0",
    scale: "opacity-100 scale-100"
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && visibleClasses[animation],
        className
      )}
      style={{ 
        transitionDelay: isVisible ? `${delay}ms` : "0ms"
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
