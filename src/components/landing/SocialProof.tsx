import { useEffect } from "react";

const SocialProof = () => {
  useEffect(() => {
    // Load the SociableKit script for Google Reviews
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://widgets.sociablekit.com/google-reviews/widget.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="section-padding bg-teal">
      <div className="container-narrow">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          What Clients Say
        </h2>

        <div className="max-w-4xl mx-auto">
          <div
            className="sk-ww-google-reviews"
            data-embed-id="25626895"
          />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
