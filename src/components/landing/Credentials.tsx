import mikeHeadshot from "@/assets/mike-vera-headshot.png";

const Credentials = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Headshot */}
          <div className="flex justify-center md:justify-start">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-sage overflow-hidden">
              <img 
                src={mikeHeadshot} 
                alt="Mike Vera, Health & Wellness Coach" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Your Coach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Mike Vera, MS, NBC-HWC
              </h2>
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Sugar and I go way back. It was woven into my childhood — the foods that meant comfort, celebration, love. That relationship didn't just disappear when I grew up. It followed me through college and into adulthood, showing up every single day.
              </p>
              <p>
                I didn't understand why it had such a grip on me until I started learning what was actually happening beneath the surface. That's what changed everything — not fighting harder, but finally seeing what sugar was actually doing. And what it wasn't.
              </p>
              <p>
                I'm a National Board Certified Health & Wellness Coach with a Master's degree in Exercise Science and Health Promotion. As a former Health Coach at Stanford University School of Medicine, I learned firsthand how behavior change works when you stop fighting and start understanding. Now I work with people who are tired of the willpower approach and ready to try something that actually addresses what's going on underneath.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
