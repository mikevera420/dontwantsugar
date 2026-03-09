import { Button } from "@/components/ui/button";

const IntakeForm = () => {
  return (
    <section className="section-padding bg-background" id="intake-form">
      <div className="container-narrow">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Explore?
          </h2>
          <p className="text-muted-foreground mb-8">
            Book a $1 Discovery Session. 30 minutes to talk through your situation, explore what might be driving your cravings, and see if coaching is a good fit.
          </p>
          <a
            href="https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=3464974&require_offering=true&offering_id=229095&hide_package_images=false&primary_color=000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            >
              Book Your Discovery Session
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntakeForm;
