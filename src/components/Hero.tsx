import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-kpt-dark text-white px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="container mx-auto text-center z-10 animate-fade-in">
        <img 
          src="/lovable-uploads/250054ea-9352-4331-8db7-2320bbec86d3.png" 
          alt="KPT Social Logo" 
          className="w-48 md:w-64 mx-auto mb-8"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Navigate the Future of AI
        </h1>
        <p className="text-kpt-silver text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Empowering businesses to confidently embrace AI technology with expert guidance and simplified solutions.
        </p>
        <Button 
          className="bg-kpt-gold hover:bg-kpt-gold/90 text-kpt-dark font-semibold px-8 py-6 text-lg group"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;