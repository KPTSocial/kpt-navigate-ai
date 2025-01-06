import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section className="py-20 bg-kpt-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your AI Journey
          </h2>
          <p className="text-kpt-silver">
            Ready to transform your business with AI? Get in touch with us today.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              placeholder="Name"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
          </div>
          <Input
            placeholder="Subject"
            className="bg-white/5 border-kpt-silver/20 text-white"
          />
          <Textarea
            placeholder="Message"
            className="bg-white/5 border-kpt-silver/20 text-white h-32"
          />
          <Button
            type="submit"
            className="w-full bg-kpt-gold hover:bg-kpt-gold/90 text-kpt-dark font-semibold"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;