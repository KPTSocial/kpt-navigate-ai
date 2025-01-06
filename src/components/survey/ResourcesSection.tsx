import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ResourcesSectionProps {
  register: any;
}

const ResourcesSection = ({ register }: ResourcesSectionProps) => {
  return (
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
  );
};

export default ResourcesSection;