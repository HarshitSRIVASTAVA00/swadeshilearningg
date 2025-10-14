import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-8 hover-glow transition-all hover:-translate-y-2 animate-fade-in group">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
        <Icon size={32} className="text-white" />
      </div>
      <h4 className="text-xl font-semibold mb-3 text-center">{title}</h4>
      <p className="text-muted-foreground text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
