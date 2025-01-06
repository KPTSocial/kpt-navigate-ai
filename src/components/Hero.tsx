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
      </div>
    </div>
  );
};

export default Hero;