import { useState, useMemo } from "react";
import { Search, BookOpen, Users, FlaskConical, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import Timeline from "@/components/Timeline";
import DailyWisdom from "@/components/DailyWisdom";
import MultimediaCard from "@/components/MultimediaCard";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import scripturesData from "@/data/scriptures.json";

const BharatiyaGyaanKosh = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");
  const [eraFilter, setEraFilter] = useState<string>("all");

  // Combine all scriptures
  const allScriptures = [
    ...scripturesData.ancientTexts,
    ...scripturesData.modernThinkers,
    ...scripturesData.scientificHeritage
  ];

  // Get unique values for filters
  const themes = useMemo(() => 
    Array.from(new Set(allScriptures.map(s => s.theme))),
    [allScriptures]
  );

  const eras = useMemo(() => 
    Array.from(new Set(allScriptures.map(s => s.era))).sort(),
    [allScriptures]
  );

  // Filter scriptures
  const filteredScriptures = useMemo(() => {
    return allScriptures.filter(scripture => {
      const matchesSearch = 
        scripture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scripture.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scripture.background.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || scripture.category === categoryFilter;
      const matchesTheme = themeFilter === "all" || scripture.theme === themeFilter;
      const matchesEra = eraFilter === "all" || scripture.era === eraFilter;

      return matchesSearch && matchesCategory && matchesTheme && matchesEra;
    });
  }, [allScriptures, searchQuery, categoryFilter, themeFilter, eraFilter]);

  const hasActiveFilters = categoryFilter !== "all" || themeFilter !== "all" || eraFilter !== "all";

  const clearFilters = () => {
    setCategoryFilter("all");
    setThemeFilter("all");
    setEraFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        
        <div className="container mx-auto relative">
          <AnimatedSection animation="fade">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Bharatiya Gyaan Kosh</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Indian Knowledge Repository — A digital library preserving and sharing the timeless wisdom of ancient texts, modern thinkers, and scientific heritage.
              </p>
            </div>
          </AnimatedSection>

          {/* Daily Wisdom Widget */}
          <AnimatedSection animation="scale" delay={200} className="max-w-2xl mx-auto mb-12">
            <DailyWisdom quotes={scripturesData.dailyWisdom} />
          </AnimatedSection>

          {/* Search and Filters */}
          <AnimatedSection animation="slide-up" delay={300}>
            <div className="glass-card p-6 rounded-lg max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, author, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Ancient Texts">Ancient Texts</SelectItem>
                      <SelectItem value="Modern Thinkers">Modern Thinkers</SelectItem>
                      <SelectItem value="Scientific Heritage">Scientific Heritage</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={themeFilter} onValueChange={setThemeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Themes</SelectItem>
                      {themes.map(theme => (
                        <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={eraFilter} onValueChange={setEraFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Era" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Eras</SelectItem>
                      {eras.map(era => (
                        <SelectItem key={era} value={era}>{era}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button variant="ghost" size="icon" onClick={clearFilters}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="ancient" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Ancient</span>
              </TabsTrigger>
              <TabsTrigger value="modern" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Modern</span>
              </TabsTrigger>
              <TabsTrigger value="scientific" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span className="hidden sm:inline">Scientific</span>
              </TabsTrigger>
            </TabsList>

            {/* All Scriptures */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScriptures.map((scripture, index) => (
                  <BookCard
                    key={scripture.id}
                    {...scripture}
                    delay={index * 50}
                  />
                ))}
              </div>
              {filteredScriptures.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No scriptures found matching your criteria.</p>
                  <Button variant="link" onClick={clearFilters} className="mt-2">
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Ancient Texts */}
            <TabsContent value="ancient">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scripturesData.ancientTexts
                  .filter(s => 
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.author.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((scripture, index) => (
                    <BookCard
                      key={scripture.id}
                      {...scripture}
                      delay={index * 50}
                    />
                  ))}
              </div>
            </TabsContent>

            {/* Modern Thinkers */}
            <TabsContent value="modern">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scripturesData.modernThinkers
                  .filter(s => 
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.author.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((scripture, index) => (
                    <BookCard
                      key={scripture.id}
                      {...scripture}
                      delay={index * 50}
                    />
                  ))}
              </div>
            </TabsContent>

            {/* Scientific Heritage */}
            <TabsContent value="scientific">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scripturesData.scientificHeritage
                  .filter(s => 
                    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.author.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((scripture, index) => (
                    <BookCard
                      key={scripture.id}
                      {...scripture}
                      delay={index * 50}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto">
          <AnimatedSection animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Timeline of Indian Knowledge</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A chronological journey through India's intellectual heritage — from ancient wisdom to modern innovation.
              </p>
            </div>
          </AnimatedSection>

          <Timeline items={scripturesData.timeline} />
        </div>
      </section>

      {/* Multimedia Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Learn Through Multimedia</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Lectures, recitations, and educational videos on Indian philosophy, mathematics, and science.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scripturesData.multimedia.map((media, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={index * 100}>
                <MultimediaCard {...media} type={media.type as "video" | "audio"} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BharatiyaGyaanKosh;