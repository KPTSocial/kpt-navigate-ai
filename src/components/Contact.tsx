import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const handleSurveyCompleted = (event: CustomEvent) => {
      const { firstName, lastName, email } = event.detail;
      if (firstName || lastName || email) {
        setFormData(prev => ({
          ...prev,
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || ""
        }));
      }
    };

    window.addEventListener('surveyCompleted', handleSurveyCompleted as EventListener);
    return () => {
      window.removeEventListener('surveyCompleted', handleSurveyCompleted as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://hook.us2.make.com/ennju6m6o423htrx5yom1og2d741c5ri", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="bg-white/5 border-kpt-silver/20 text-white"
            />
          </div>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="bg-white/5 border-kpt-silver/20 text-white"
          />
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            className="bg-white/5 border-kpt-silver/20 text-white h-32"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-kpt-gold hover:bg-kpt-gold/90 text-kpt-dark font-semibold"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;