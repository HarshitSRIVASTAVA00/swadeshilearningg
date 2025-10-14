import { Book, BookOpen, Scroll, History, BookMarked, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const AncientScripture = () => {
  const sections = [
    {
      id: "history",
      title: "History",
      icon: History,
      content: "Hindu scriptures have a rich history spanning thousands of years, forming the foundation of one of the world's oldest living religions. These sacred texts evolved through oral traditions before being documented, preserving ancient wisdom, philosophical insights, and spiritual practices that continue to guide millions today."
    },
    {
      id: "shruti",
      title: "Shruti",
      icon: BookOpen,
      subsections: [
        {
          title: "Vedas",
          content: "The Vedas are the most ancient Hindu scriptures, considered divinely revealed (shruti). They consist of four collections: Rigveda, Yajurveda, Samaveda, and Atharvaveda. Each Veda contains hymns, mantras, and rituals that form the bedrock of Hindu philosophy and practice."
        },
        {
          title: "Upanishads",
          content: "The Upanishads are philosophical texts that explore the nature of reality, the self (Atman), and the ultimate reality (Brahman). They represent the culmination of Vedic thought and are considered the foundation of Vedanta philosophy, emphasizing meditation, morality, and the pursuit of knowledge."
        }
      ]
    },
    {
      id: "smriti",
      title: "Smriti",
      icon: Book,
      subsections: [
        {
          title: "Puranas",
          content: "The Puranas are encyclopedic texts that contain stories of creation, genealogies of gods and sages, and accounts of cosmic cycles. The 18 major Puranas include the Vishnu Purana, Shiva Purana, and Bhagavata Purana, each dedicated to different deities and aspects of Hindu cosmology."
        },
        {
          title: "Mahabharata",
          content: "The Mahabharata is one of the longest epic poems in the world, narrating the conflict between the Pandavas and Kauravas. It contains the Bhagavad Gita, a philosophical dialogue between Prince Arjuna and Lord Krishna, which addresses duty, righteousness, and the path to spiritual liberation."
        },
        {
          title: "Ramayana",
          content: "The Ramayana, composed by sage Valmiki, tells the story of Prince Rama's quest to rescue his wife Sita from the demon king Ravana. This epic embodies ideals of dharma, devotion, and moral conduct, making it one of the most beloved texts in Hindu tradition."
        }
      ]
    },
    {
      id: "other-texts",
      title: "Other Hindu Texts",
      icon: BookMarked,
      content: "Beyond the major scriptures, Hindu literature includes the Dharma Shastras (law books), Agamas (ritualistic texts), Tantras (esoteric teachings), Bhakti literature (devotional poetry), and numerous commentaries by great scholars. These texts cover ethics, law, temple architecture, yoga, meditation, and devotional practices."
    },
    {
      id: "historical-significance",
      title: "Historical Significance",
      icon: Scroll,
      content: "Hindu scriptures have profoundly influenced Indian culture, philosophy, art, and social structures for millennia. They have shaped ethical frameworks, inspired classical arts, influenced scientific inquiry, and provided spiritual guidance. Their teachings on universal truths, meditation, and self-realization have gained global recognition and continue to inspire seekers worldwide."
    }
  ];

  const references = [
    { title: "The Vedas", author: "Translated by Wendy Doniger" },
    { title: "The Upanishads", author: "Translated by Eknath Easwaran" },
    { title: "The Bhagavad Gita", author: "Translated by Eknath Easwaran" },
    { title: "Hindu Scriptures", author: "Edited by Dominic Goodall" },
    { title: "The Cultural Heritage of India", author: "Ramakrishna Mission Institute" }
  ];

  const externalLinks = [
    { title: "Sacred Texts Archive", url: "#" },
    { title: "Vedic Heritage Portal", url: "#" },
    { title: "Digital Library of India", url: "#" },
    { title: "Sanskrit Documents", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
              <Scroll className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Ancient Scripture</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the timeless wisdom of Hindu sacred texts that have guided humanity for thousands of years
            </p>
          </div>

          {/* Table of Contents */}
          <Card className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Contents
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2">
                  <li>
                    <a href="#history" className="text-primary hover:underline">History</a>
                  </li>
                  <li>
                    <a href="#shruti" className="text-primary hover:underline">Shruti</a>
                    <ul className="ml-6 mt-1 space-y-1">
                      <li><a href="#shruti" className="text-muted-foreground hover:text-primary">Vedas</a></li>
                      <li><a href="#shruti" className="text-muted-foreground hover:text-primary">Upanishads</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#smriti" className="text-primary hover:underline">Smriti</a>
                    <ul className="ml-6 mt-1 space-y-1">
                      <li><a href="#smriti" className="text-muted-foreground hover:text-primary">Puranas</a></li>
                      <li><a href="#smriti" className="text-muted-foreground hover:text-primary">Mahabharata</a></li>
                      <li><a href="#smriti" className="text-muted-foreground hover:text-primary">Ramayana</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li><a href="#other-texts" className="text-primary hover:underline">Other Hindu Texts</a></li>
                  <li><a href="#historical-significance" className="text-primary hover:underline">Historical Significance</a></li>
                  <li><a href="#see-also" className="text-primary hover:underline">See Also</a></li>
                  <li><a href="#references" className="text-primary hover:underline">References</a></li>
                  <li><a href="#bibliography" className="text-primary hover:underline">Bibliography</a></li>
                  <li><a href="#further-reading" className="text-primary hover:underline">Further Reading</a></li>
                  <li><a href="#external-links" className="text-primary hover:underline">External Links</a></li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Main Content Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <Card className="glass-card p-8 hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                  </div>
                  
                  {section.subsections ? (
                    <div className="space-y-6">
                      {section.subsections.map((subsection, idx) => (
                        <div key={idx} className="border-l-4 border-primary/30 pl-6">
                          <h3 className="text-xl font-semibold mb-3 text-primary">{subsection.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  )}
                </Card>
              </div>
            ))}

            {/* See Also */}
            <div id="see-also">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">See Also</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <a href="#" className="text-primary hover:underline flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Hindu Philosophy
                  </a>
                  <a href="#" className="text-primary hover:underline flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Vedic Period
                  </a>
                  <a href="#" className="text-primary hover:underline flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Sanskrit Literature
                  </a>
                  <a href="#" className="text-primary hover:underline flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Indian Philosophy
                  </a>
                </div>
              </Card>
            </div>

            {/* Notes */}
            <div id="notes">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">Notes</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The study of Hindu scriptures requires understanding their historical, cultural, and linguistic contexts. Translations may vary, and it is often recommended to consult multiple sources for comprehensive understanding.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Many texts were transmitted orally for centuries before being written down, demonstrating the remarkable preservation of ancient knowledge through oral traditions.
                </p>
              </Card>
            </div>

            {/* References */}
            <div id="references">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">References</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  {references.map((ref, idx) => (
                    <li key={idx}>
                      <span className="font-semibold">{ref.title}</span> - {ref.author}
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            {/* Bibliography */}
            <div id="bibliography">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">Bibliography</h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li>Flood, Gavin (1996). An Introduction to Hinduism. Cambridge University Press.</li>
                  <li>Klostermaier, Klaus K. (2007). A Survey of Hinduism. State University of New York Press.</li>
                  <li>Radhakrishnan, S. (1953). The Principal Upanishads. Harper Collins.</li>
                  <li>Zaehner, R.C. (1966). Hindu Scriptures. Everyman's Library.</li>
                </ul>
              </Card>
            </div>

            {/* Further Reading */}
            <div id="further-reading">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">Further Reading</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-primary/30 pl-4">
                    <h3 className="font-semibold mb-2">For Beginners</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>The Bhagavad Gita: A Walkthrough for Westerners</li>
                      <li>Hinduism: A Very Short Introduction</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-secondary/30 pl-4">
                    <h3 className="font-semibold mb-2">Advanced Study</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>The Vedas: An Introduction to Hinduism's Sacred Texts</li>
                      <li>Classical Hindu Thought: An Introduction</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* External Links */}
            <div id="external-links">
              <Card className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">External Links</h2>
                <div className="space-y-3">
                  {externalLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      className="flex items-center gap-2 text-primary hover:underline group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {link.title}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AncientScripture;
