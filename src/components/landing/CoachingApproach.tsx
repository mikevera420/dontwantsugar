import { Button } from "@/components/ui/button";

const CoachingApproach = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("intake-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-sage" id="coaching-approach">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            What Working Together Looks Like
          </h2>

          <div className="space-y-4 text-foreground/80 leading-relaxed mb-12">
            <p>
              You work one-on-one with a dedicated coach over a series of sessions. Each one builds on the last. There's a process, not random conversation. You'll get resources between sessions and support when you need it.
            </p>
            <p>
              This isn't about handing you a plan and sending you off. It's real conversations, adjustments when something isn't landing, and a coach who understands what you're going through because they've been through it too.
            </p>
            <p className="font-medium text-foreground">
              The goal is to get to a place where sugar simply doesn't have the same pull it used to.
            </p>
          </div>

          {/* CTA Box - Dark background for visual weight */}
          <div className="bg-dark rounded-2xl p-8 md:p-10">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-foreground mb-4">
                $1 Discovery Session
              </h3>
              <p className="text-dark-foreground/70 max-w-xl mx-auto mb-8">
                30 minutes to explore your situation, understand what might be driving your cravings, and see if coaching is a good fit. No pressure, no pitch — just an honest conversation.
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              >
                Book Your Discovery Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingApproach;
