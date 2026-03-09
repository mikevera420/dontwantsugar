import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

type ProfileType = "stress_eater" | "blood_sugar_coaster" | "habit_loop" | "reward_seeker";

interface QuizAnswer {
  questionId: number;
  value: string;
  score: Record<ProfileType, number>;
}

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

const PROFILES: Record<ProfileType, { title: string; description: string; insight: string }> = {
  stress_eater: {
    title: "The Stress Eater",
    description: "Your cravings are closely tied to your emotional state. When stress, boredom, or overwhelm hits, sugar becomes a way to find relief. The craving isn't really about sweetness; it's about comfort.",
    insight: "Research shows that motivation to eat highly palatable foods peaks during negative emotional states. Your cravings may be less about sugar itself and more about what sugar is doing for your nervous system in those moments.",
  },
  blood_sugar_coaster: {
    title: "The Blood Sugar Roller Coaster",
    description: "Your cravings are driven by what's happening physiologically. Energy crashes, afternoon slumps, and that shaky feeling when you skip a meal all point to a pattern where your body is chasing stable energy through quick sugar hits.",
    insight: "When blood sugar spikes and then crashes, the brain registers a deficit and sends urgent signals for fast-acting fuel. This creates a cycle that feels like a lack of discipline but is actually a metabolic pattern that can be shifted.",
  },
  habit_loop: {
    title: "The Habit Loop",
    description: "Your sugar consumption has become automatic. You reach for something sweet at the same times, in the same places, often without consciously deciding to. The craving is wired into your daily routine.",
    insight: "Brain imaging studies show that food cues can trigger dopamine release in areas of the brain responsible for habit learning. Your cravings may be a conditioned response to environmental triggers rather than genuine hunger or desire.",
  },
  reward_seeker: {
    title: "The Reward Seeker",
    description: "Sugar is your reward system. After a long day, after finishing something hard, or when you want to celebrate, sweetness is how you mark the moment. The anticipation of the treat is almost as powerful as eating it.",
    insight: "The brain's dopamine system doesn't just respond to rewards; it responds to the anticipation of rewards. Over time, the brain can build tolerance, requiring more to achieve the same feeling. This isn't a character flaw; it's how reward circuits work.",
  },
};

const SugarQuiz = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-8 = questions, 9 = email capture, 10 = results
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [readinessAnswer, setReadinessAnswer] = useState("");

  const totalQuestions = QUESTIONS.length;
  const progress = currentStep === 0 ? 0 : Math.min((currentStep / (totalQuestions + 1)) * 100, 100);

  const calculateProfile = (allAnswers: QuizAnswer[]): ProfileType => {
    const totals: Record<ProfileType, number> = {
      stress_eater: 0,
      blood_sugar_coaster: 0,
      habit_loop: 0,
      reward_seeker: 0,
    };

    allAnswers.forEach((answer) => {
      Object.entries(answer.score).forEach(([key, value]) => {
        totals[key as ProfileType] += value;
      });
    });

    return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0] as ProfileType;
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

    // Store readiness answer separately
    if (question.id === 8) {
      setReadinessAnswer(option.text);
    }

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentStep === totalQuestions) {
      // All questions answered, show email capture
      const calculatedProfile = calculateProfile(updatedAnswers);
      setProfile(calculatedProfile);
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
    // Remove last answer
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
      await fetch("https://n8n.avantiaautomation.com/webhook/sugar-quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          craving_profile: profile,
          readiness: readinessAnswer,
          answers: answers.map((a) => ({ questionId: a.questionId, value: a.value })),
        }),
      });

      setCurrentStep(totalQuestions + 2); // Show results
    } catch (error) {
      console.error("Error submitting quiz:", error);
      // Still show results even if webhook fails
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
              Free Assessment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
              What's Really Driving Your Sugar Cravings?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Take this 3-minute assessment to discover your unique craving pattern.
              You'll get a personalized profile and a free guide with research-backed strategies
              tailored to your type.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              8 questions. No judgment. Just clarity.
            </p>
            <Button
              onClick={() => setCurrentStep(1)}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg"
            >
              Start the Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Results screen
  if (currentStep === totalQuestions + 2 && profile) {
    const profileData = PROFILES[profile];
    return (
      <section className="section-padding bg-background" id="sugar-quiz">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm text-primary uppercase tracking-wider font-medium">
                Your Craving Profile
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                {profileData.title}
              </h2>
            </div>

            <div className="bg-sage rounded-2xl p-8 md:p-10 mb-8">
              <p className="text-foreground/80 leading-relaxed mb-6">
                {profileData.description}
              </p>
              <div className="bg-background/50 rounded-xl p-6">
                <p className="text-sm text-primary font-medium mb-2">What the research says:</p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {profileData.insight}
                </p>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Your free guide is on its way
              </h3>
              <p className="text-muted-foreground mb-6">
                Check your email for "The Sugar Reset" with strategies personalized to your craving profile.
              </p>
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Want to go deeper? A 30-minute discovery call is just $1.
                </p>
                <a
                  href="https://avantia.clientsecure.me/request/service"
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

  // Email capture screen (after quiz, before results)
  if (currentStep === totalQuestions + 1 && profile) {
    const profileData = PROFILES[profile];
    return (
      <section className="section-padding bg-background" id="sugar-quiz">
        <div className="container-narrow">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-sm text-primary uppercase tracking-wider font-medium">
                Assessment Complete
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-3 mb-2">
                Your results are ready
              </h2>
              <p className="text-muted-foreground">
                You're a <span className="text-foreground font-medium">{profileData.title}</span>.
                Enter your email to see your full profile and get a free guide with strategies tailored to your pattern.
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
                {isSubmitting ? "Loading your results..." : "See My Results & Get the Free Guide"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                No spam. Just your results and a short email series with research-backed strategies.
                Unsubscribe anytime.
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
