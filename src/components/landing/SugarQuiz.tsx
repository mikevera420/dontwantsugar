import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

type DimensionKey = "stress_eater" | "blood_sugar_coaster" | "habit_loop" | "reward_seeker";

interface QuizAnswer {
  questionId: number;
  value: string;
  score: Record<DimensionKey, number>;
}

interface DimensionScores {
  stress_eater: number;
  blood_sugar_coaster: number;
  habit_loop: number;
  reward_seeker: number;
}

const DIMENSIONS: Record<DimensionKey, { name: string; color: string; bgLight: string; description: string; insight: string }> = {
  stress_eater: {
    name: "Stress Response",
    color: "bg-rose-500",
    bgLight: "bg-rose-100",
    description: "Your cravings tend to spike alongside emotional pressure. When stress, boredom, or overwhelm hits, sugar becomes a way to find relief. The craving isn't really about sweetness; it's about comfort.",
    insight: "Research shows that motivation to eat highly palatable foods peaks during negative emotional states. These cravings may be less about sugar itself and more about what sugar is doing for your nervous system in those moments.",
  },
  blood_sugar_coaster: {
    name: "Energy Patterns",
    color: "bg-amber-500",
    bgLight: "bg-amber-100",
    description: "Your cravings are closely tied to what's happening physiologically. Energy crashes, afternoon slumps, and that shaky feeling when you skip a meal all point to a pattern where your body is chasing stable energy through quick sugar hits.",
    insight: "When blood sugar spikes and then crashes, the brain registers a deficit and sends urgent signals for fast-acting fuel. This creates a cycle that feels like a lack of discipline but is actually a metabolic pattern that can be shifted.",
  },
  habit_loop: {
    name: "Routine Triggers",
    color: "bg-sky-500",
    bgLight: "bg-sky-100",
    description: "Your sugar consumption has become woven into your daily routines. You reach for something sweet at the same times, in the same places, often without consciously deciding to.",
    insight: "Brain imaging studies show that food cues can trigger dopamine release in areas of the brain responsible for habit learning. These cravings may be a conditioned response to environmental triggers rather than genuine hunger or desire.",
  },
  reward_seeker: {
    name: "Reward Patterns",
    color: "bg-emerald-500",
    bgLight: "bg-emerald-100",
    description: "Sugar plays a role in how you mark moments and recharge. After a long day, after finishing something hard, or when you want to celebrate, sweetness is how you give yourself a break.",
    insight: "The brain's dopamine system doesn't just respond to rewards; it responds to the anticipation of rewards. Over time, the brain can build tolerance, requiring more to achieve the same feeling. This isn't a character flaw; it's how reward circuits work.",
  },
};

const QUESTIONS = [
  {
    id: 1,
    category: "Craving Pattern",
    question: "When do your sugar cravings hit the hardest?",
    options: [
      { text: "After a stressful day or during emotional moments", score: { stress_eater: 3, blood_sugar_coaster: 0, habit_loop: 1, reward_seeker: 0 } },
      { text: "Mid-afternoon, when my energy crashes", score: { stress_eater: 0, blood_sugar_coaster: 3, habit_loop: 1, reward_seeker: 0 } },
      { text: "At specific times or places (after dinner, at my desk, watching TV)", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 3, reward_seeker: 1 } },
      { text: "When I feel like I deserve a treat or want to celebrate", score: { stress_eater: 1, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 3 } },
    ],
  },
  {
    id: 2,
    category: "Craving Pattern",
    question: "What usually triggers a craving?",
    options: [
      { text: "Feeling overwhelmed, anxious, or bored", score: { stress_eater: 3, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 1 } },
      { text: "Skipping meals or eating something light", score: { stress_eater: 0, blood_sugar_coaster: 3, habit_loop: 0, reward_seeker: 0 } },
      { text: "Seeing or smelling something sweet nearby", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 3, reward_seeker: 1 } },
      { text: "Finishing a task or wanting to wind down", score: { stress_eater: 1, blood_sugar_coaster: 0, habit_loop: 1, reward_seeker: 3 } },
    ],
  },
  {
    id: 3,
    category: "Craving Pattern",
    question: "How would you describe the intensity of your cravings?",
    options: [
      { text: "They feel urgent, almost desperate, like I need relief now", score: { stress_eater: 3, blood_sugar_coaster: 1, habit_loop: 0, reward_seeker: 0 } },
      { text: "They start mild but become overwhelming if I don't eat", score: { stress_eater: 0, blood_sugar_coaster: 3, habit_loop: 0, reward_seeker: 1 } },
      { text: "I don't always realize I'm doing it until I've already started eating", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 3, reward_seeker: 0 } },
      { text: "I think about it for a while, anticipating how good it'll taste", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 3 } },
    ],
  },
  {
    id: 4,
    category: "Previous Attempts",
    question: "What have you tried before to reduce sugar?",
    options: [
      { text: "Cutting it out completely (cold turkey, sugar detox, elimination diet)", score: { stress_eater: 1, blood_sugar_coaster: 1, habit_loop: 1, reward_seeker: 1 } },
      { text: "Replacing it with artificial sweeteners or \"healthier\" alternatives", score: { stress_eater: 0, blood_sugar_coaster: 2, habit_loop: 1, reward_seeker: 1 } },
      { text: "Trying not to think about it or using willpower", score: { stress_eater: 2, blood_sugar_coaster: 0, habit_loop: 2, reward_seeker: 0 } },
      { text: "I haven't really tried yet, but I know something needs to change", score: { stress_eater: 1, blood_sugar_coaster: 1, habit_loop: 1, reward_seeker: 1 } },
    ],
  },
  {
    id: 5,
    category: "Previous Attempts",
    question: "When you try to cut back on sugar, what usually happens?",
    options: [
      { text: "I do fine until something stressful happens, then it all falls apart", score: { stress_eater: 3, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 1 } },
      { text: "I get shaky, irritable, or feel like my energy bottoms out", score: { stress_eater: 0, blood_sugar_coaster: 3, habit_loop: 0, reward_seeker: 0 } },
      { text: "I don't even notice I've gone back to my old patterns until days later", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 3, reward_seeker: 0 } },
      { text: "I start feeling deprived and eventually give myself permission to have some", score: { stress_eater: 1, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 3 } },
    ],
  },
  {
    id: 6,
    category: "Lifestyle",
    question: "How would you describe your sleep over the past month?",
    options: [
      { text: "Consistently poor (trouble falling asleep, waking up tired)", score: { stress_eater: 2, blood_sugar_coaster: 2, habit_loop: 0, reward_seeker: 0 } },
      { text: "It varies, some good nights and some bad ones", score: { stress_eater: 1, blood_sugar_coaster: 1, habit_loop: 1, reward_seeker: 1 } },
      { text: "Generally fine, but I stay up later than I should", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 2, reward_seeker: 2 } },
      { text: "Pretty good overall", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 1, reward_seeker: 1 } },
    ],
  },
  {
    id: 7,
    category: "Lifestyle",
    question: "How would you rate your overall stress level?",
    options: [
      { text: "High: I feel stressed most days", score: { stress_eater: 3, blood_sugar_coaster: 1, habit_loop: 0, reward_seeker: 0 } },
      { text: "Moderate: some stressful periods but manageable", score: { stress_eater: 1, blood_sugar_coaster: 1, habit_loop: 1, reward_seeker: 1 } },
      { text: "Low: I feel pretty balanced", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 1, reward_seeker: 1 } },
      { text: "I'm not sure, I've been running on autopilot for a while", score: { stress_eater: 2, blood_sugar_coaster: 0, habit_loop: 2, reward_seeker: 0 } },
    ],
  },
  {
    id: 8,
    category: "Readiness",
    question: "How ready are you to make a real change with sugar?",
    options: [
      { text: "Very ready. I've been thinking about this for a while.", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 0 } },
      { text: "Mostly ready, though I'm not sure where to start", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 0 } },
      { text: "Curious but not sure if now is the right time", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 0 } },
      { text: "Just exploring, no pressure", score: { stress_eater: 0, blood_sugar_coaster: 0, habit_loop: 0, reward_seeker: 0 } },
    ],
  },
];

const SugarQuiz = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState<DimensionScores | null>(null);
  const [readinessAnswer, setReadinessAnswer] = useState("");

  const totalQuestions = QUESTIONS.length;
  const progress = currentStep === 0 ? 0 : Math.min((currentStep / (totalQuestions + 1)) * 100, 100);

  const calculateScores = (allAnswers: QuizAnswer[]): DimensionScores => {
    const totals: DimensionScores = {
      stress_eater: 0,
      blood_sugar_coaster: 0,
      habit_loop: 0,
      reward_seeker: 0,
    };

    allAnswers.forEach((answer) => {
      Object.entries(answer.score).forEach(([key, value]) => {
        totals[key as DimensionKey] += value;
      });
    });

    return totals;
  };

  const getSortedDimensions = (dimScores: DimensionScores) => {
    return (Object.entries(dimScores) as [DimensionKey, number][])
      .sort((a, b) => b[1] - a[1]);
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    if (selectedOption === null) return;

    const question = QUESTIONS[currentStep - 1];
    const option = question.options[selectedOption];

    const newAnswer: QuizAnswer = {
      questionId: question.id,
      value: option.text,
      score: option.score,
    };

    if (question.id === 8) {
      setReadinessAnswer(option.text);
    }

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentStep === totalQuestions) {
      const calculatedScores = calculateScores(updatedAnswers);
      setScores(calculatedScores);
      setCurrentStep(totalQuestions + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep <= 1) {
      setCurrentStep(0);
      return;
    }
    setAnswers(answers.slice(0, -1));
    setSelectedOption(null);
    setCurrentStep(currentStep - 1);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !firstName.trim()) {
      toast({ title: "Please fill in both fields", variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const sorted = getSortedDimensions(scores!);
      const primaryDimension = sorted[0][0];

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          stress_score: scores!.stress_eater,
          energy_score: scores!.blood_sugar_coaster,
          habit_score: scores!.habit_loop,
          reward_score: scores!.reward_seeker,
          primary_dimension: primaryDimension,
          readiness: readinessAnswer,
          answers: answers.map((a) => ({ questionId: a.questionId, value: a.value })),
        }),
      });

      setCurrentStep(totalQuestions + 2);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setCurrentStep(totalQuestions + 2);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Intro screen
  if (currentStep === 0) {
    return (
      <section className="section-padding bg-background" id="sugar-quiz">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm text-primary uppercase tracking-wider font-medium">
              Craving pattern check
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What's Really Driving Your Sugar Cravings?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Map your craving patterns in a few minutes.
              You'll see your craving patterns on this page. The Sugar Reset, a short guide, arrives in your email.
              
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              8 questions. No judgment. Just clarity.
            </p>
            <Button
              onClick={() => setCurrentStep(1)}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg"
            >
              Start the pattern check
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Results screen
  if (currentStep === totalQuestions + 2 && scores) {
    const sorted = getSortedDimensions(scores);
    const totalScore = sorted.reduce((sum, [, s]) => sum + s, 0);
    const topTwo = sorted.slice(0, 2);

    return (
      <section className="section-padding bg-background" id="sugar-quiz">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm text-primary uppercase tracking-wider font-medium">
                Your Craving Patterns
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-2">
                Here's What Showed Up
              </h2>
              <p className="text-muted-foreground">
                Based on your responses, here's how your craving patterns break down.
                Most people see a mix of patterns, not just one.
              </p>
            </div>

            {/* Pattern Spectrum Bars */}
            <div className="bg-sage rounded-2xl p-6 md:p-8 mb-6">
              <div className="space-y-5">
                {sorted.map(([key, score]) => {
                  const dim = DIMENSIONS[key];
                  const percentage = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;

                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-foreground">
                          {dim.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {percentage}%
                        </span>
                      </div>
                      <div className={`w-full h-3 rounded-full ${dim.bgLight}`}>
                        <div
                          className={`h-3 rounded-full ${dim.color} transition-all duration-700 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top pattern insights */}
            <div className="space-y-4 mb-8">
              {topTwo.map(([key], index) => {
                const dim = DIMENSIONS[key];
                return (
                  <div key={key} className="bg-sage rounded-2xl p-6 md:p-8">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {index === 0 ? "Your strongest pattern: " : "Also showing up: "}
                      {dim.name}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      {dim.description}
                    </p>
                    <div className="bg-background/50 rounded-xl p-5">
                      <p className="text-sm text-primary font-medium mb-2">
                        What the research says:
                      </p>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {dim.insight}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-background border border-border rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                The Sugar Reset is going to your email
              </h3>
              <p className="text-muted-foreground mb-6">
                Check that inbox (and spam). The pattern breakdown above is already yours.
                
              </p>
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to go deeper? A 45-minute coaching call is just $1.
                </p>
                <a
                  href="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=248613&hide_package_images=false&primary_color=000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Book a $1 Discovery Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Email capture screen
  if (currentStep === totalQuestions + 1 && scores) {
    return (
      <section className="section-padding bg-background" id="sugar-quiz">
        <div className="container-narrow">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-sm text-primary uppercase tracking-wider font-medium">
                Pattern check complete
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-2">
                Your results are ready
              </h2>
              <p className="text-muted-foreground">
                Enter your email to unlock the pattern breakdown on this page. I'll send The Sugar Reset to this inbox.
                
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-first-name">First Name</Label>
                <Input
                  id="quiz-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="bg-background border-border focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiz-email">Email</Label>
                <Input
                  id="quiz-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-background border-border focus:border-primary"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-lg"
              >
                {isSubmitting ? "Loading your results..." : "See My Pattern Breakdown"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No spam. Your patterns show up next. The Sugar Reset comes by email. Unsubscribe anytime. 

              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Question screens
  const question = QUESTIONS[currentStep - 1];
  return (
    <section className="section-padding bg-background" id="sugar-quiz">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentStep} of {totalQuestions}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {question.category}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedOption === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-background"
                }`}
              >
                <span className="text-foreground/80">{option.text}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-1 w-4 h-4" />
              Back
            </button>
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
            >
              {currentStep === totalQuestions ? "See My Results" : "Next"}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SugarQuiz;
