import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SurveyHeader from "./survey/SurveyHeader";
import ChallengesSection from "./survey/ChallengesSection";
import EmergingChallengesSection from "./survey/EmergingChallengesSection";
import ResourcesSection from "./survey/ResourcesSection";
import IndustrySection from "./survey/IndustrySection";

interface SurveyData {
  challenges: string[];
  emergingChallenge: string[];
  resources: string;
  industry: string;
  otherIndustry?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const Survey = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const { register, handleSubmit, watch, getValues } = useForm<SurveyData>();

  const challenges = [
    "Access to funding and capital",
    "Managing cash flow effectively",
    "Building a strong online presence and brand",
    "Navigating tax and legal requirements",
    "Hiring and retaining qualified employees",
    "Time management and balancing responsibilities",
    "Finding and retaining customers/clients",
  ];

  const emergingChallenges = [
    "Rising costs of goods and services (inflation)",
    "Increased competition in saturated markets",
    "Adapting to AI and new technology trends",
    "Meeting sustainability and environmental standards",
    "Shifts in customer behavior and expectations",
    "Lack of mentorship or guidance in the early stages",
  ];

  const industries = [
    "Retail",
    "Technology",
    "Hospitality",
    "Health & Wellness",
    "Services",
    "Other",
  ];

  const handleChallengeChange = (checked: boolean, value: string) => {
    if (checked) {
      if (selectedChallenges.length < 3) {
        setSelectedChallenges([...selectedChallenges, value]);
      } else {
        toast({
          title: "Maximum Selection Reached",
          description: "Please select only up to 3 challenges",
          variant: "destructive",
        });
      }
    } else {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== value));
    }
  };

  const onSubmit = async (data: SurveyData) => {
    console.log("Form submission started", { data, selectedChallenges });
    setIsSubmitting(true);
    
    // Format the data according to the spreadsheet structure
    const formattedData = {
      name: data.firstName && data.lastName 
        ? `${data.firstName} ${data.lastName}`
        : data.firstName || "Anonymous",
      email: data.email || "Not provided",
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      topChallenge1: selectedChallenges[0] || "",
      topChallenge2: selectedChallenges[1] || "",
      topChallenge3: selectedChallenges[2] || "",
      emergingChallenge1: data.emergingChallenge[0] || "",
      emergingChallenge2: data.emergingChallenge[1] || "",
      specificResources: data.resources,
      industry: data.industry === "Other" ? data.otherIndustry : data.industry
    };

    console.log("Formatted survey data:", formattedData);

    try {
      console.log("Sending request to webhook...");
      const response = await fetch("https://hook.us2.make.com/9hueg4pdetgfk88iqf485d9bo6yh2v63", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      console.log("Webhook response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        console.log("Survey submitted successfully");
        toast({
          title: "Thank you for taking the time to complete my survey.",
          description: "If you have questions about KPT Social please leave your message below.",
        });

        // Trigger the auto-fill of the contact form
        const event = new CustomEvent('surveyCompleted', {
          detail: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          }
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast({
        title: "Submission Error",
        description: "Failed to submit the survey. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-2xl mx-auto space-y-8 p-6 bg-kpt-gold rounded-lg shadow-lg"
    >
      <SurveyHeader />

      <div className="space-y-6">
        <ChallengesSection
          challenges={challenges}
          selectedChallenges={selectedChallenges}
          onChallengeChange={handleChallengeChange}
        />

        <EmergingChallengesSection
          emergingChallenges={emergingChallenges}
          register={register}
        />

        <ResourcesSection register={register} />

        <IndustrySection
          industries={industries}
          register={register}
          watch={watch}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-kpt-dark">
            Would you like to receive tailored resources? (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("firstName")}
              placeholder="First Name"
              className="bg-white text-kpt-dark placeholder:text-kpt-dark/60"
            />
            <Input
              {...register("lastName")}
              placeholder="Last Name (Optional)"
              className="bg-white text-kpt-dark placeholder:text-kpt-dark/60"
            />
          </div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
            className="bg-white text-kpt-dark placeholder:text-kpt-dark/60"
          />
          <div className="text-sm text-kpt-dark/80 space-y-2">
            <p>Your response will remain confidential and will not be shared.</p>
            <p>
              By submitting this form, you agree to our{" "}
              <a 
                href="https://s3.privyr.com/privacy/privacy-policy.html?d=eyJlbWFpbCI6InRpbW90aHl0QGtwdHNvY2lhbC5jb20iLCJjb21wYW55IjoiS1BUIFNvY2lhbCIsImdlbl9hdCI6IjIwMjQtMDktMjVUMDA6MDM6MzkuNDU3WiJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kpt-dark underline hover:text-kpt-dark/80"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-kpt-dark text-white hover:bg-kpt-dark/90" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Survey"}
      </Button>
    </form>
  );
};

export default Survey;