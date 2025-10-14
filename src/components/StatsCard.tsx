import { useEffect, useRef, useState } from "react";

interface StatsCardProps {
  value: number;
  label: string;
  suffix?: string;
}

const StatsCard = ({ value, label, suffix = "" }: StatsCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-2xl p-6 text-center hover-glow transition-all hover:-translate-y-1 animate-scale-in"
    >
      <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default StatsCard;
