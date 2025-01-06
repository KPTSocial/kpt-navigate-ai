import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface EmergingChallengesSectionProps {
  emergingChallenges: string[];
  register: any;
}

const EmergingChallengesSection = ({
  emergingChallenges,
  register,
}: EmergingChallengesSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-kpt-dark">
        Which of the following emerging challenges for 2025 concerns you the most? (Choose 1)
      </h3>
      <RadioGroup {...register("emergingChallenge", { required: true })}>
        {emergingChallenges.map((challenge) => (
          <div key={challenge} className="flex items-center space-x-2">
            <RadioGroupItem
              value={challenge}
              id={`emerging-${challenge}`}
              className="border-kpt-dark"
            />
            <Label htmlFor={`emerging-${challenge}`} className="text-kpt-dark">
              {challenge}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default EmergingChallengesSection;