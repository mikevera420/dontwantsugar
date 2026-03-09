const FrameworkSection = () => {
  return (
    <section className="section-padding bg-teal">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Why the Fight Never Ends
            </h2>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Willpower works until it doesn't. You can resist for a day, a week, maybe longer. But the craving doesn't go away — it waits. And when your guard is down, it wins.
              </p>
              <p>
                That's not weakness. That's what happens when you're fighting something while still wanting it.
              </p>
              <p className="font-medium text-foreground">
                The goal isn't to get better at resisting. It's to stop wanting it the same way. That's a different process entirely — and it's what we work on together.
              </p>
            </div>
          </div>

          {/* Right side - subtle visual or empty space */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default FrameworkSection;
