import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { SemanticSearch } from "@/components/SemanticSearch";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Search, GitBranch, MessageCircle } from "lucide-react";

const AIIntelligence = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">AI Intelligence Layer</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore ancient wisdom with modern AI. Search semantically, visualize knowledge connections,
              and chat with an AI trained on ancient Indian texts.
            </p>
          </div>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Semantic Search
              </TabsTrigger>
              <TabsTrigger value="graph" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Knowledge Graph
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                AI Companion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-4">
              <SemanticSearch />
            </TabsContent>

            <TabsContent value="graph" className="space-y-4">
              <KnowledgeGraph />
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <AIChat />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIIntelligence;