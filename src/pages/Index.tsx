import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Survey from "@/components/Survey";

const Index = () => {
  return (
    <main className="bg-kpt-dark min-h-screen">
      <Hero />
      <Services />
      <Survey />
      <Contact />
    </main>
  );
};

export default Index;