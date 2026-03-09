const ProblemSection = () => {
  return (
    <section className="section-padding bg-sage">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              You've Been Fighting the Wrong Battle
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                The cycle is exhausting: restricting, craving, giving in, feeling guilty, and doing it all over again.
              </p>
              <p>
                You've tried discipline. You've tried cutting it out completely. You've told yourself 'starting Monday' more times than you can count.
              </p>
              <p>And somehow, it keeps coming back.</p>
              <p>
                Here's the thing: you're not failing because you're weak. You're failing because you've been fighting the wrong battle. You think sugar gives you something — comfort, relief, a reward. As long as you believe that, every attempt to quit feels like sacrifice. And sacrifice runs out.
              </p>
              <p className="font-medium text-foreground">
                What if the problem isn't your willpower? What if it's what you believe sugar is doing for you?
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* Subtle abstract shape */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-2xl bg-background/50 rotate-6" />
              <div className="absolute inset-4 rounded-2xl bg-teal/30 -rotate-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
