import { Button } from "@/components/ui/button";
import React from "react";
// import Image from "next/image";
// import Link from "next/link";
import AnimatedStepper from "@/components/animated-stepper";
// import { CustomComboBox } from "@/components/custom-combo-box";
import AgeRange from "./steps/AgeRange";
import Category from "./steps/Category";
import SubCategory from "./steps/SubCategory";
import AdditionalInfo from "./steps/AdditionalInfo";
import LevelOfDetail from "./steps/LevelOfDetail";
import Logo from "@/components/Logo";
import { useContent } from "./store/contentStore";
import { usePostCategoryData } from "./hooks/queryHooks";

interface Step {
  number: number;
  label: string;
  storeObjectKey: string;
  component: React.FC;
}
const steps: Step[] = [
  { number: 1, label: "Yaş Aralığı", storeObjectKey: "age", component: AgeRange },
  { number: 2, label: "Kategori", storeObjectKey: "mainCategory", component: Category },
  { number: 3, label: "Konu", storeObjectKey: "innerCategory", component: SubCategory },
  { number: 4, label: "Ek Bilgi", storeObjectKey: "additionalInfo", component: AdditionalInfo },
  { number: 5, label: "Detay", storeObjectKey: "detail", component: LevelOfDetail },
];

export default function SelectCategories() {

  const mutation = usePostCategoryData();
  const contentObject = useContent()

  const [currentStep, setCurrentStep] = React.useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleStepClick = (stepNumber: number) => {
    if(checkIfStepIsCompleted(stepNumber - 1)){
      setCurrentStep(stepNumber);
    }
  };

  const checkIfStepIsCompleted = (stepNumber: number) => {
    return steps.slice(0, stepNumber).every((step) => {
      const value = contentObject[step.storeObjectKey as keyof typeof contentObject];
      return value !== "" && value !== null && value !== undefined;
    });
  }

  const handleSubmit = () => {
    mutation.mutate(contentObject, {
      onSuccess: (data: string) => {
        console.log("Data submitted successfully:", data);
      },
      onError: (error: unknown) => {
        console.error("Error submitting data:", error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="flex flex-col items-center text-center m-8">
        <Logo />
        <h1 className="font-bold text-3xl">Bilge Kuoka</h1>
      </div>

      <div className="flex m-4 items-center">
        <div className="bg-white dark:bg-primary-foreground border-[1px] shadow-lg rounded-lg mx-auto p-6 space-y-6">
          <div className="flex justify-center">
          </div>
          <div className="flex justify-center items-center text-center">
            <h1 className="font-normal text-2xl">
              {steps[currentStep - 1].label}
            </h1>
          </div>
          <AnimatedStepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          <div className="flex justify-center items-center">
            {React.createElement(steps[currentStep - 1].component, {})}
          </div>
          <div className="mt-8 flex justify-between select-none">
            <Button
              onClick={handlePrev}
              variant="secondary"
              disabled={currentStep === 1}
            >
              Önceki
            </Button>
            {currentStep === steps.length ? (
              <Button
                disabled={currentStep !== steps.length}
                onClick={handleSubmit}
              >
                Kuoka!
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length || !checkIfStepIsCompleted(currentStep)}
              >
                Sonraki
              </Button>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
