import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateGeneratorProps {
  userName: string;
  quizTitle: string;
  score: number;
  total: number;
  date: string;
}

const CertificateGenerator = ({ userName, quizTitle, score, total, date }: CertificateGeneratorProps) => {
  const { toast } = useToast();
  const percentage = ((score / total) * 100).toFixed(0);

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Achievement', canvas.width / 2, 150);

    // Subtitle
    ctx.font = '30px Arial';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('Swadeshi Learning Platform', canvas.width / 2, 200);

    // Awarded to
    ctx.font = '25px Arial';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('This is to certify that', canvas.width / 2, 300);

    // Name
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(userName, canvas.width / 2, 370);

    // Achievement text
    ctx.font = '25px Arial';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText('has successfully completed', canvas.width / 2, 430);

    // Quiz name
    ctx.font = 'bold 35px Arial';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(quizTitle, canvas.width / 2, 490);

    // Score
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`with a score of ${percentage}%`, canvas.width / 2, 550);
    ctx.fillText(`(${score}/${total} correct answers)`, canvas.width / 2, 590);

    // Date
    ctx.font = '20px Arial';
    ctx.fillStyle = '#e5e7eb';
    ctx.fillText(new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), canvas.width / 2, 680);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${quizTitle.replace(/\s+/g, '-')}-certificate.png`;
      link.click();
      
      toast({
        title: "Certificate Generated",
        description: "Your certificate has been downloaded"
      });
    });
  };

  const shareResults = () => {
    const shareText = `I scored ${percentage}% on "${quizTitle}" on Swadeshi Learning! 🎓`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Results',
        text: shareText,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Share text copied to clipboard"
      });
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-6">
      <Button variant="outline" onClick={generateCertificate}>
        <Download className="h-4 w-4 mr-2" />
        Download Certificate
      </Button>
      <Button variant="outline" onClick={shareResults}>
        <Share2 className="h-4 w-4 mr-2" />
        Share Results
      </Button>
    </div>
  );
};

export default CertificateGenerator;
