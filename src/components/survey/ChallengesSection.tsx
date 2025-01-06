import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChallengesSectionProps {
  challenges: string[];
  selectedChallenges: string[];
  onChallengeChange: (checked: boolean, value: string) => void;
}

const ChallengesSection = ({
  challenges,
  selectedChallenges,
  onChallengeChange,
}: ChallengesSectionProps) => {
  return (
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
              onCheckedChange={(checked) => onChallengeChange(checked as boolean, challenge)}
              className="border-kpt-dark"
            />
            <Label htmlFor={challenge} className="text-kpt-dark">
              {challenge}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesSection;