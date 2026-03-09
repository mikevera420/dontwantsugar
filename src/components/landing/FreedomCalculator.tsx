import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const FreedomCalculator = () => {
  const [weeklySpend, setWeeklySpend] = useState(25);
  const [minutesPerDay, setMinutesPerDay] = useState(20);
  const [crashesPerDay, setCrashesPerDay] = useState(2);

  const yearlyMoney = weeklySpend * 52;
  const yearlyHours = Math.round((minutesPerDay * 365) / 60);
  const yearlyDays = Math.round(yearlyHours / 24);
  const yearlyCrashes = crashesPerDay * 365;

  const scrollToCoaching = () => {
    const coachingSection = document.getElementById("coaching-approach");
    coachingSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Would You Reclaim?
          </h2>
          <p className="text-muted-foreground text-lg">
            Move the sliders to see what freedom actually looks like — in numbers.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-10 mb-12">
          {/* Slider 1: Weekly Spend */}
          <div className="space-y-4">
            <label className="text-foreground font-medium block">
              How much do you spend on sugary stuff per week?
            </label>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-12">$5</span>
              <Slider
                value={[weeklySpend]}
                onValueChange={(value) => setWeeklySpend(value[0])}
                min={5}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-muted-foreground w-12 text-right">$100</span>
            </div>
            <p className="text-center text-primary font-semibold text-lg">${weeklySpend}/week</p>
          </div>

          {/* Slider 2: Minutes per day */}
          <div className="space-y-4">
            <label className="text-foreground font-medium block">
              How many minutes per day do you spend in the craving cycle — wanting it, resisting it, giving in, feeling bad about it?
            </label>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-12">5 min</span>
              <Slider
                value={[minutesPerDay]}
                onValueChange={(value) => setMinutesPerDay(value[0])}
                min={5}
                max={60}
                step={1}
                className="flex-1"
              />
              <span className="text-muted-foreground w-12 text-right">60 min</span>
            </div>
            <p className="text-center text-primary font-semibold text-lg">{minutesPerDay} minutes/day</p>
          </div>

          {/* Slider 3: Energy crashes */}
          <div className="space-y-4">
            <label className="text-foreground font-medium block">
              How many times per day does your energy crash after sugar?
            </label>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground w-12">1</span>
              <Slider
                value={[crashesPerDay]}
                onValueChange={(value) => setCrashesPerDay(value[0])}
                min={1}
                max={5}
                step={1}
                className="flex-1"
              />
              <span className="text-muted-foreground w-12 text-right">5</span>
            </div>
            <p className="text-center text-primary font-semibold text-lg">{crashesPerDay} crashes/day</p>
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-sage rounded-2xl p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            In One Year, You'd Reclaim:
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                ${yearlyMoney.toLocaleString()}
              </p>
              <p className="text-muted-foreground font-medium">back in your pocket</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {yearlyHours.toLocaleString()} hours
              </p>
              <p className="text-muted-foreground font-medium">of mental freedom</p>
              <p className="text-sm text-muted-foreground mt-1">
                That's {yearlyDays} full days of your life
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                {yearlyCrashes.toLocaleString()}
              </p>
              <p className="text-muted-foreground font-medium">fewer energy crashes</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-foreground/80 mb-6 italic">
            What would you do with that time, money, and energy if it was just... yours again?
          </p>
          <Button
            onClick={scrollToCoaching}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
          >
            I want that back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FreedomCalculator;
