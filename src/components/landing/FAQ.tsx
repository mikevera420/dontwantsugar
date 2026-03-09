import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a diet program?",
    answer:
      "No. This isn't about restriction or meal plans. It's about understanding what's driving your cravings and making changes that support your biology — not fight it.",
  },
  {
    question: "I've tried everything. Why would this be different?",
    answer:
      "Most approaches focus on willpower and restriction — which ignore the biological patterns underneath. This approach starts with understanding those patterns first.",
  },
  {
    question: "Do I have to quit sugar completely?",
    answer:
      "That's not the goal. The goal is freedom — cravings that don't control you. For most people, as their systems rebalance, the grip sugar has naturally loosens.",
  },
  {
    question: "What happens in the discovery session?",
    answer:
      "We talk through your situation, look at what patterns might be at play, and see if coaching is a good fit. It's a conversation, not a sales pitch.",
  },
  {
    question: "Is this coaching or therapy?",
    answer:
      "Coaching. Our coaches are board-certified health and wellness coaches (NBC-HWC), not therapists or doctors. The focus is on behavior change, habit formation, and lifestyle factors, not diagnosis or treatment.",
  },
  {
    question: "What if I have an eating disorder?",
    answer:
      "If you're actively struggling with an eating disorder, working with a specialized treatment provider is the right first step. Health coaching can be a great complement to that work, but it's not a substitute for clinical care.",
  },
];

const FAQ = () => {
  return (
    <section className="section-padding bg-sage">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Common Questions
        </h2>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background rounded-xl border border-border px-6"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
