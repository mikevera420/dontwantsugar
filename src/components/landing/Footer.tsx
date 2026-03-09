const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground py-12 px-6">
      <div className="container-narrow">
        <div className="text-center space-y-4">
          <p className="text-sm opacity-80">
            Coaching services provided by <a href="https://avantiahealthoptimization.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-footer-foreground transition-colors">Avantia Health Optimization</a>
          </p>
          <p className="text-sm opacity-60">© 2026</p>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-8 border-t border-footer-foreground/10">
          <p className="text-xs text-footer-foreground/50 text-center max-w-3xl mx-auto leading-relaxed">
            The information provided through DontWantSugar.com is for educational purposes only and is not intended as medical advice, diagnosis, or treatment. Health coaching supports lifestyle and behavior change but is not a substitute for medical care. Please consult your healthcare provider before making significant changes to your diet or lifestyle.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
