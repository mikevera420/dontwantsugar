import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 70vh)
      const heroHeight = window.innerHeight * 0.7;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToQuiz = () => {
    const quizSection = document.getElementById("sugar-quiz");
    quizSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float-in">
      <Button
        onClick={scrollToQuiz}
        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-6 py-3 text-base font-medium rounded-full"
      >
        Take the Free Assessment
      </Button>
    </div>
  );
};

export default FloatingCTA;
