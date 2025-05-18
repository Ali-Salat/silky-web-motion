
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimationShowcase from '@/components/AnimationShowcase';
import NotesApp from '@/components/NotesApp';
import { ChevronUp } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="animate-fade-in py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Smooth Animations & Transitions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of CSS animations, transitions, and local storage persistence
          with dynamic JavaScript behavior.
        </p>
      </header>
      
      <main className="container px-4 py-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Tabs defaultValue="animations" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
            <TabsTrigger value="animations" className="transition-all duration-300">
              Animations
            </TabsTrigger>
            <TabsTrigger value="notes" className="transition-all duration-300">
              Notes App
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="animations" className="animate-fade-in">
            <AnimationShowcase />
          </TabsContent>
          
          <TabsContent value="notes" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold gradient-text mb-6 text-center">
                Persistent Notes with Local Storage
              </h2>
              <NotesApp />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-8 text-center text-muted-foreground">
        <p>CSS Transitions & Animations Demo</p>
      </footer>
      
      {/* Scroll to top button */}
      <Button
        variant="outline"
        size="icon"
        className={`fixed bottom-6 right-6 rounded-full transition-all duration-500 shadow-md ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Index;
