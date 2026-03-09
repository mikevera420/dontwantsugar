import Hero from "@/components/landing/Hero";
import FloatingCTA from "@/components/landing/FloatingCTA";
import ProblemSection from "@/components/landing/ProblemSection";
import SugarQuiz from "@/components/landing/SugarQuiz";
import FreedomCalculator from "@/components/landing/FreedomCalculator";
import FrameworkSection from "@/components/landing/FrameworkSection";
import ComparisonTable from "@/components/landing/ComparisonTable";
import CoachingApproach from "@/components/landing/CoachingApproach";
import Credentials from "@/components/landing/Credentials";
import SocialProof from "@/components/landing/SocialProof";
import IntakeForm from "@/components/landing/IntakeForm";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SugarQuiz />
      <FreedomCalculator />
      <FrameworkSection />
      <CoachingApproach />
      <Credentials />
      <SocialProof />
      <ComparisonTable />
      <IntakeForm />
      <FAQ />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default Index;
