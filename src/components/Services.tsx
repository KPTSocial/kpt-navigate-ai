import { Bot, Lightbulb, Shield } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Integration",
    description: "Seamlessly integrate AI solutions into your existing business processes with our expert guidance.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Implement AI with confidence knowing your data and operations are protected by industry-leading security measures.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Innovation",
    description: "Transform challenges into opportunities with AI-driven solutions tailored to your industry.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-kpt-dark to-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          Our Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-kpt-dark/50 backdrop-blur-sm p-8 rounded-lg border border-kpt-silver/10 hover:border-kpt-gold/30 transition-all duration-300"
            >
              <service.icon className="w-12 h-12 text-kpt-gold mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-kpt-silver">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;