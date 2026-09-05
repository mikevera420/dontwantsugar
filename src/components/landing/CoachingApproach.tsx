import { Button } from "@/components/ui/button";

const CoachingApproach = () => {

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
              This isn't about handing you a plan and sending you off. It's real conversations, adjustments when something isn't landing, and a coach who understands the science and the human side of behavior change.
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
                45 minutes to explore your situation, understand what might be driving your cravings, and see if coaching is a good fit. No pressure, no pitch, just an honest conversation.
              </p>
              <a                 href="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=248613&hide_package_images=false&primary_color=000000"                 target="_blank"                 rel="noopener noreferrer"               >                 <Button                   size="lg"                   className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"                 >                   Book Your Discovery Session                 </Button>               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingApproach;
