import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Network, GitBranch } from "lucide-react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  category: string;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

export const KnowledgeGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { id: "vedas", label: "Vedas", x: 300, y: 100, category: "scripture" },
    { id: "upanishads", label: "Upanishads", x: 200, y: 200, category: "scripture" },
    { id: "gita", label: "Bhagavad Gita", x: 400, y: 200, category: "scripture" },
    { id: "cosmology", label: "Cosmology", x: 300, y: 300, category: "science" },
    { id: "ayurveda", label: "Ayurveda", x: 150, y: 350, category: "science" },
    { id: "medicine", label: "Modern Medicine", x: 150, y: 450, category: "modern" },
    { id: "biochem", label: "Biochemistry", x: 300, y: 450, category: "modern" },
    { id: "yoga", label: "Yoga", x: 450, y: 350, category: "practice" },
    { id: "dharma", label: "Dharma", x: 500, y: 200, category: "philosophy" },
  ];

  const edges: Edge[] = [
    { from: "vedas", to: "upanishads", label: "evolved to" },
    { from: "vedas", to: "gita", label: "foundation of" },
    { from: "upanishads", to: "cosmology", label: "discusses" },
    { from: "gita", to: "dharma", label: "teaches" },
    { from: "vedas", to: "ayurveda", label: "basis of" },
    { from: "ayurveda", to: "medicine", label: "influenced" },
    { from: "ayurveda", to: "biochem", label: "parallels" },
    { from: "gita", to: "yoga", label: "prescribes" },
    { from: "yoga", to: "biochem", label: "validated by" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = "rgba(147, 51, 234, 0.3)";
    ctx.lineWidth = 2;
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const isHovered = hoveredNode?.id === node.id;
      
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? 30 : 25, 0, 2 * Math.PI);
      
      // Color based on category
      const colors: Record<string, string> = {
        scripture: "#9333ea",
        science: "#0ea5e9",
        modern: "#10b981",
        practice: "#f59e0b",
        philosophy: "#ef4444",
      };
      ctx.fillStyle = colors[node.category] || "#9333ea";
      ctx.fill();
      ctx.strokeStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = "#ffffff";
      ctx.font = isHovered ? "bold 12px sans-serif" : "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y + 45);
    });
  }, [hoveredNode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = nodes.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setHoveredNode(node || null);
  };

  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Knowledge Graph</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Explore connections between ancient wisdom and modern science
      </p>

      <div className="relative bg-background rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredNode(null)}
          className="w-full cursor-pointer"
        />
        
        {hoveredNode && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
            <p className="font-semibold text-sm text-foreground">{hoveredNode.label}</p>
            <p className="text-xs text-muted-foreground capitalize">{hoveredNode.category}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9333ea]" />
            <span className="text-xs text-muted-foreground">Scriptures</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0ea5e9]" />
            <span className="text-xs text-muted-foreground">Ancient Science</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span className="text-xs text-muted-foreground">Modern Science</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="text-xs text-muted-foreground">Practices</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="text-xs text-muted-foreground">Philosophy</span>
          </div>
        </div>
      </div>
    </Card>
  );
};