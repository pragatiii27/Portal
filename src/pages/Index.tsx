import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BathingDates from "@/components/BathingDates";
import AttractionsSection from "@/components/AttractionsSection";
import InfrastructureHighlights from "@/components/InfrastructureHighlights";
import Footer from "@/components/Footer";
import Leaders from "@/components/Leaders";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Leaders />
     
      <BathingDates />
      <AttractionsSection />
      <InfrastructureHighlights />
      <Footer />
    </div>
  );
};

export default Index;
