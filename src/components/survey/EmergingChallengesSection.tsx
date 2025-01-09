import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface EmergingChallengesSectionProps {
  emergingChallenges: string[];
  register: any;
}

const EmergingChallengesSection = ({
  emergingChallenges,
  register,
}: EmergingChallengesSectionProps) => {
  const { toast } = useToast();
  const [selectedChallenges, setSelectedChallenges] = React.useState<string[]>([]);

  const handleChallengeChange = (checked: boolean, value: string) => {
    console.log('Emerging challenge selection changed:', { checked, value });
    if (checked) {
      if (selectedChallenges.length < 2) {
        const newSelected = [...selectedChallenges, value];
        setSelectedChallenges(newSelected);
        // Update the form value
        register("emergingChallenge").onChange({
          target: { value: newSelected, name: "emergingChallenge" }
        });
      } else {
        toast({
          title: "Maximum Selection Reached",
          description: "Please select only up to 2 challenges",
          variant: "destructive",
        });
      }
    } else {
      const newSelected = selectedChallenges.filter((c) => c !== value);
      setSelectedChallenges(newSelected);
      // Update the form value
      register("emergingChallenge").onChange({
        target: { value: newSelected, name: "emergingChallenge" }
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-kpt-dark">
        Which of the following emerging challenges for 2025 concerns you the most? (Choose 2)
      </h3>
      <div className="space-y-2">
        {emergingChallenges.map((challenge) => (
          <div key={challenge} className="flex items-center space-x-2">
            <Checkbox
              id={`emerging-${challenge}`}
              checked={selectedChallenges.includes(challenge)}
              onCheckedChange={(checked) => handleChallengeChange(checked as boolean, challenge)}
              className="border-kpt-dark"
            />
            <Label htmlFor={`emerging-${challenge}`} className="text-kpt-dark">
              {challenge}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergingChallengesSection;