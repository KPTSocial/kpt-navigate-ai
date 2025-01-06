import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IndustrySectionProps {
  industries: string[];
  register: any;
  watch: any;
}

const IndustrySection = ({ industries, register, watch }: IndustrySectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-kpt-dark">
        What industry or niche is your business in?
      </h3>
      <RadioGroup {...register("industry", { required: true })}>
        {industries.map((ind) => (
          <div key={ind} className="flex items-center space-x-2">
            <RadioGroupItem value={ind} id={`industry-${ind}`} className="border-kpt-dark" />
            <Label htmlFor={`industry-${ind}`} className="text-kpt-dark">
              {ind}
            </Label>
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
  );
};

export default IndustrySection;