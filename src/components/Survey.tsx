import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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

  const industry = watch("industry");

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
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-kpt-dark">Business Owner Survey 2025</h2>
        <p className="text-kpt-dark">
          Thank you for participating in this quick survey! Your responses will help us better understand
          the common challenges faced by new business owners and provide solutions tailored to your needs.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-kpt-dark">
            What are your top 3 challenges as a new business owner? (Choose up to 3)
          </h3>
          <div className="grid gap-4">
            {challenges.map((challenge) => (
              <div key={challenge} className="flex items-center space-x-2">
                <Checkbox
                  id={challenge}
                  checked={selectedChallenges.includes(challenge)}
                  onCheckedChange={(checked) => handleChallengeChange(checked as boolean, challenge)}
                  className="border-kpt-dark"
                />
                <Label htmlFor={challenge} className="text-kpt-dark">{challenge}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-kpt-dark">
            Which of the following emerging challenges for 2025 concerns you the most? (Choose 1)
          </h3>
          <RadioGroup {...register("emergingChallenge", { required: true })}>
            {emergingChallenges.map((challenge) => (
              <div key={challenge} className="flex items-center space-x-2">
                <RadioGroupItem value={challenge} id={`emerging-${challenge}`} className="border-kpt-dark" />
                <Label htmlFor={`emerging-${challenge}`} className="text-kpt-dark">{challenge}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-kpt-dark">
            What specific resources or support would help you the most?
          </h3>
          <Textarea
            {...register("resources", { required: true })}
            placeholder="Example: Access to affordable loans or Training in digital marketing tools"
            className="min-h-[100px] bg-white text-kpt-dark placeholder:text-kpt-dark/60"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-kpt-dark">What industry or niche is your business in?</h3>
          <RadioGroup {...register("industry", { required: true })}>
            {industries.map((ind) => (
              <div key={ind} className="flex items-center space-x-2">
                <RadioGroupItem value={ind} id={`industry-${ind}`} className="border-kpt-dark" />
                <Label htmlFor={`industry-${ind}`} className="text-kpt-dark">{ind}</Label>
              </div>
            ))}
          </RadioGroup>
          {watch("industry") === "Other" && (
            <Input
              {...register("otherIndustry")}
              placeholder="Please specify your industry"
              className="mt-2 bg-white text-kpt-dark placeholder:text-kpt-dark/60"
            />
          )}
        </div>

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
          <p className="text-sm text-kpt-dark/80">
            Your response will remain confidential and will not be shared.
          </p>
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