import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/landing/Footer";

const PAGE_TITLE =
  "Sugar Craving Assessment: Understand Your Pattern Without Judgment";
const PAGE_DESCRIPTION =
  "Use a nonjudgmental sugar craving assessment to explore stress, energy, habit, and reward patterns—without turning reflection into a diagnosis.";
const CANONICAL = "https://idontwantsugar.com/sugar-craving-assessment";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

const SugarCravingAssessment = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    upsertMeta("name", "description", PAGE_DESCRIPTION);
    upsertMeta("property", "og:title", PAGE_TITLE);
    upsertMeta("property", "og:description", PAGE_DESCRIPTION);
    upsertMeta("property", "og:url", CANONICAL);
    upsertCanonical(CANONICAL);

    // Signal vite-plugin-prerender that the route is ready to snapshot.
    document.dispatchEvent(new Event("prerender-ready"));

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← IDontWantSugar
          </Link>
          <Link
            to="/#sugar-quiz"
            className="text-sm font-medium text-teal underline-offset-4 hover:underline"
          >
            Pattern check
          </Link>
        </div>
      </header>

      <article className="px-6 py-12 md:py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-display prose-headings:font-normal prose-a:text-teal prose-strong:text-foreground">
          <h1>Sugar Craving Assessment: Understand Your Pattern Without Judgment</h1>

          <p>
            If you keep wondering, “Why do I crave sugar?”, you are not alone—and you do not
            need another reason to criticize yourself. A craving is information about a moment,
            not proof of weak willpower or a character flaw.
          </p>

          <p>
            This sugar craving assessment is a gentle reflection exercise. It can help you notice
            what tends to happen before, during, and after a craving so you can choose a more
            useful next question. It is not a medical test, a diagnosis, or a measure of how
            “good” you are with food.
          </p>

          <h2>Before you take the assessment</h2>

          <p>
            Treat the prompts as an invitation, not an assignment. You can skip any question,
            stop at any time, and return later. There is no score to pass and no result that
            tells you what you must eat or avoid.
          </p>

          <p>
            A pattern check can be useful for describing your experience. It cannot diagnose
            sugar addiction, an eating disorder, diabetes, or another medical condition. If
            cravings are new, intense, physically concerning, or connected with significant
            distress, speak with a qualified healthcare professional.
          </p>

          <blockquote>
            <p>
              <strong>In short:</strong> A sugar craving assessment is a reflection tool that may
              point to Stress response, Energy patterns, Habit loops, or Reward circuits. It
              cannot diagnose sugar addiction, an eating disorder, diabetes, or another medical
              condition.
            </p>
          </blockquote>

          <h2>The four-pattern assessment</h2>

          <p>
            For a recent craving, pause and ask:{" "}
            <strong>
              What happened before it? What did I notice in my body or emotions? What did I hope
              the food would do for me? What happened afterward?
            </strong>
          </p>

          <p>
            You might write a few words, think quietly, or discuss the experience with a trusted
            person. Look for what feels familiar rather than trying to prove a single cause.
          </p>

          <h3>Stress response</h3>

          <p>
            Sugar cravings may show up after pressure, conflict, mental overload, loneliness, or
            fatigue. Sweet food can seem appealing when you need comfort, relief, a pause, or
            something predictable. That does not mean every craving during stress is “emotional
            eating.” Stress may simply make a familiar option more noticeable or easier to reach.
          </p>

          <p>Reflect on:</p>
          <ul>
            <li>What was happening in the hour before the craving?</li>
            <li>Was I carrying pressure, frustration, sadness, boredom, or decision fatigue?</li>
            <li>Did I need comfort, a break, connection, or a way to transition out of work?</li>
            <li>What changed after I ate, resisted, or postponed the craving?</li>
          </ul>

          <p>
            The useful observation is not “stress makes me crave sugar.” It may be more specific:
            “After difficult conversations, I look for something sweet and quiet,” or “I want a
            reward when the workday ends.” Specific observations leave room for choice without
            assigning blame.
          </p>

          <h3>Energy patterns</h3>

          <p>
            The timing of a craving can offer context. Afternoon sugar cravings, for example, may
            overlap with a long gap between meals, a demanding morning, poor sleep, a change in
            activity, or a perceived shift in energy. But timing alone does not establish a cause,
            and not every afternoon craving is an energy crash.
          </p>

          <p>Reflect on:</p>
          <ul>
            <li>When did I last eat, and what was the day like before this moment?</li>
            <li>How did I sleep, and how do I feel physically right now?</li>
            <li>Did my energy, concentration, mood, or hunger seem to change?</li>
            <li>Am I noticing a repeated pattern, or was this an unusual day?</li>
          </ul>

          <p>
            Use this section to notice context—not to create a rigid eating rule or prescribe a
            diet for yourself. If you have health concerns about blood sugar, appetite, fatigue, or
            other symptoms, a clinician can help you evaluate them safely.
          </p>

          <h3>Habit loops</h3>

          <p>
            Some cravings are closely connected to cues: a time of day, a place, a commute, a
            screen, a meeting, a shop, or the sequence after dinner. A familiar cue can bring a
            familiar urge before you have consciously decided what you want. That is a learned
            association, not a moral failure.
          </p>

          <p>Reflect on:</p>
          <ul>
            <li>Where was I, and what was I doing when the craving appeared?</li>
            <li>Was it linked with a particular time, route, task, show, or person?</li>
            <li>What usually happens immediately before and after this moment?</li>
            <li>Is there a transition—such as arriving home or finishing dinner—that repeats?</li>
          </ul>

          <p>
            You do not have to change the habit immediately. First, make the loop visible. “I want
            candy when I open my laptop after lunch” gives you more information than “I have no
            control.” Once the context is clearer, you can consider a small, non-punishing
            adjustment or another form of support.
          </p>

          <h3>Reward circuits</h3>

          <p>
            Sweet food can be part of celebration, relief, pleasure, connection, or a moment that
            feels like it belongs to you. Cravings may also intensify when you have spent the day
            treating food as something you must earn or strictly avoid. Cycles of restriction and
            permission can make a food feel especially urgent without telling you that you are
            clinically addicted.
          </p>

          <p>Reflect on:</p>
          <ul>
            <li>
              What did I want this food to represent or provide: celebration, comfort, relief, fun,
              or a pause?
            </li>
            <li>Did I feel I had to be “good” earlier in the day?</li>
            <li>
              Was I looking forward to a familiar pleasure, or trying to escape a difficult
              feeling?
            </li>
            <li>
              What other kinds of reward, rest, or connection might support me in this moment?
            </li>
          </ul>

          <p>
            There is nothing wrong with enjoying food. The goal of this reflection is not to remove
            pleasure or moralize it. It is to understand what role the craving is playing so you can
            respond with more flexibility.
          </p>

          <h2>Read the result as a starting hypothesis</h2>

          <p>Do not turn your notes into a diagnostic score. Instead, use three simple categories:</p>
          <ul>
            <li>
              <strong>Most familiar:</strong> This pattern often resembles the situation I
              described.
            </li>
            <li>
              <strong>Sometimes present:</strong> This may be part of the picture, but it is not
              consistent.
            </li>
            <li>
              <strong>Not sure yet:</strong> I need more context, or this pattern may not fit.
            </li>
          </ul>

          <p>
            More than one pattern can be present. A stressful afternoon may follow a short night of
            sleep, occur at the same desk each day, and carry a strong need for relief. Patterns can
            also change with seasons, schedules, health, relationships, and circumstances.
          </p>

          <p>
            A good reflection leaves you curious and supported. It does not leave you with a label
            or a list of foods to fear.
          </p>

          <h2>What this cannot tell you</h2>

          <p>
            A self-assessment cannot tell you whether you have “sugar addiction.” There is no
            responsible shortcut from a few craving questions to a diagnosis. It also cannot
            determine whether you have diabetes, hypoglycemia, an eating disorder, depression,
            anxiety, or another condition.
          </p>

          <p>
            A pattern reflection is different from a clinical assessment. A qualified clinician can
            review your symptoms, history, medications, physical health, and eating experience.
            Contact a healthcare professional if you have persistent or worrying symptoms, or if
            cravings and eating concerns are interfering with daily life.
          </p>

          <h2>If eating feels unsafe or distressing</h2>

          <p>
            Stop the self-assessment if tracking cravings or answering food questions increases
            distress. Seek qualified eating-disorder support if eating involves bingeing, purging,
            severe restriction, compulsive exercise, intense fear around food or body changes, or a
            feeling that you are unsafe. If there is immediate danger, contact local emergency
            services or an urgent crisis resource.
          </p>

          <p>
            This page is not an eating-disorder treatment protocol, and coaching is not a
            substitute for appropriate medical or mental-health care. You deserve support that fits
            the seriousness of what you are experiencing.
          </p>

          <h2>Choose one compassionate next question</h2>

          <p>
            You do not need to solve every craving today. Choose one question and answer it without
            judgment:
          </p>
          <ol>
            <li>
              <strong>What happened before the craving?</strong>
            </li>
            <li>
              <strong>What support did I need in that moment?</strong>
            </li>
            <li>
              <strong>What small option would make the next hour easier?</strong>
            </li>
          </ol>

          <p>
            A small option might be taking a real pause, changing rooms, contacting someone,
            getting rest, eating in a way that feels supportive, or simply noticing the urge
            without immediately arguing with it. The right next step is the one that increases
            safety and care—not the one that creates the strictest rule.
          </p>

          <h2>Continue with support</h2>

          <p>
            If you would like guided reflection, you can try the free{" "}
            <a href="/#sugar-quiz">Sugar Reset and pattern check</a>. It is optional, and you can
            use what you notice as a starting point rather than treating the result as a diagnosis.
          </p>

          <p>
            You can also learn about the{" "}
            <a href="/#coaching-approach">optional $1 discovery conversation</a> to explore whether
            coaching is a good fit. In the scope of NBC-HWC coaching, the focus is on listening,
            reflection, behavior-change support, and your goals—not diagnosing or treating a
            medical or eating disorder.
          </p>

          <h2>Common questions</h2>

          <h3>What is a sugar craving assessment?</h3>
          <p>
            A sugar craving assessment is a reflection tool that helps you notice what tends to
            happen before, during, and after a craving. It can point to Stress response, Energy
            patterns, Habit loops, or Reward circuits, but it cannot diagnose sugar addiction, an
            eating disorder, diabetes, or another medical condition.
          </p>

          <h3>Why do I crave sugar in the afternoon?</h3>
          <p>
            Afternoon cravings can overlap with routine cues, stress, sleep, long gaps between
            eating, perceived energy changes, or a desire for reward. Instead of assuming one
            cause, note what happened before the craving and what you needed. Repeated or
            distressing concerns belong in a qualified professional conversation.
          </p>

          <h3>Is this a sugar addiction quiz?</h3>
          <p>
            No. Self-reflection can help describe a pattern, but it should not label you with an
            addiction or replace clinical assessment. If eating involves severe restriction,
            bingeing, purging, compulsive exercise, intense fear, or significant distress, stop
            quiz-style reflection and seek appropriate eating-disorder support.
          </p>

          <h3>What should I do after identifying a possible pattern?</h3>
          <p>
            Choose one compassionate next question, notice whether the pattern repeats, and
            consider what support would help. You do not need to make a sweeping food rule. If you
            want structured, nonjudgmental support, explore the optional resources above.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default SugarCravingAssessment;
