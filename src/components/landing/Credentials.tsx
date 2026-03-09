import { Award, GraduationCap, HeartPulse } from "lucide-react";

const Credentials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              Who's Behind This
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Built on Science, Backed by Experience
            </h2>
          </div>

          <div className="space-y-4 text-foreground/80 leading-relaxed mb-10">
            <p>
              The Craving Code was built by a team of board-certified health and wellness coaches who specialize in the behavioral and biological side of cravings. Every coach on our team holds an NBC-HWC credential, and our approach is grounded in exercise science, health promotion, and real-world coaching experience.
            </p>
            <p>
              Our team has coached inside clinical settings, including Stanford University School of Medicine, and brings that same evidence-based rigor to every client interaction. This isn't theory from a textbook. It's a process refined through hundreds of coaching sessions with people in exactly the same cycle you're in now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-sage rounded-xl p-6 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground text-sm">NBC-HWC Certified</p>
              <p className="text-xs text-muted-foreground mt-1">National Board Certified Health & Wellness Coaches</p>
            </div>
            <div className="bg-sage rounded-xl p-6 text-center">
              <GraduationCap className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground text-sm">Stanford Medicine</p>
              <p className="text-xs text-muted-foreground mt-1">Clinical coaching experience at Stanford School of Medicine</p>
            </div>
            <div className="bg-sage rounded-xl p-6 text-center">
              <HeartPulse className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground text-sm">Behavior-First Approach</p>
              <p className="text-xs text-muted-foreground mt-1">Grounded in exercise science and health promotion</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
