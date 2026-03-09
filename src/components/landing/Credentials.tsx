import mikeHeadshot from "@/assets/mike-vera-headshot.png";

const Credentials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Headshot - smaller, not dominating */}
            <div className="w-36 h-36 rounded-2xl bg-sage overflow-hidden flex-shrink-0">
              <img
                src={mikeHeadshot}
                alt="Mike Vera, Founder"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  Founder
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Mike Vera, MS, NBC-HWC
                </h2>
              </div>

              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Sugar and I go way back. It was woven into my childhood, the foods that meant comfort, celebration, love. That relationship didn't just disappear when I grew up. It followed me through college and into adulthood, showing up every single day.
                </p>
                <p>
                  I didn't understand why it had such a grip on me until I started learning what was actually happening beneath the surface. That's what changed everything, not fighting harder, but finally seeing what sugar was actually doing. And what it wasn't.
                </p>
                <p>
                  I'm a National Board Certified Health & Wellness Coach with a Master's degree in Exercise Science and Health Promotion. As a former Health Coach at Stanford University School of Medicine, I learned firsthand how behavior change works when you stop fighting and start understanding. That experience is the foundation of how our team coaches today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
