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
  emergingChallenge: string;
  resources: string;
  industry: string;
  otherIndustry?: string;
  email?: string;
}

const Survey = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const { register, handleSubmit, watch } = useForm<SurveyData>();

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
    setIsSubmitting(true);
    console.log("Submitting survey data:", { ...data, challenges: selectedChallenges });

    try {
      const response = await fetch("YOUR_MAKE_WEBHOOK_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          challenges: selectedChallenges,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Survey Submitted",
          description: "Thank you for participating in our survey!",
        });
      } else {
        throw new Error("Failed to submit survey");
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