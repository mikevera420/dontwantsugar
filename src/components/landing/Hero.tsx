import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center section-padding bg-background">
      <div className="container-narrow w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground text-balance">
              Freedom From Sugar Isn't About{" "}
              <span className="text-primary">Fighting Harder.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Willpower fails because it doesn't change what you actually want. There's another way, one that doesn't require white-knuckling through every craving.
            </p>
            <button
              onClick={() => document.getElementById("sugar-quiz")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Take the Free Assessment
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* Subtle abstract visual element */}
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 rounded-full bg-sage/60 blur-3xl" />
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-teal/50 blur-2xl" />
              <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/10 blur-xl" />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex flex-col items-center mt-16 opacity-60">
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
