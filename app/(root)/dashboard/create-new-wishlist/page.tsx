"use client";

import FormStepTwo from "@/components/FormStep2";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import React, { useState } from "react";
import ReviewStep from "@/components/ReviewStep";
import ConfirmationStep from "@/components/ConfirmationStep";

// Define the type for each step's data if needed
type StepData = {
  listType: string;
  listName: string;
  description: string;
  dueDate: string;
  provideAddress: boolean;
};

const createNewWishlist = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StepData[]>([]);

  const goNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to handle form data submission of each step
  const handleFormData = (stepData: StepData) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[currentStep - 1] = stepData;
      return newData;
    });
    goNextStep();
  };

  const handleEdit = () => {
    // Go back to the first step to edit the form
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    console.log("Submitting form data:", formData);
    // Submit your form data here, then go to the confirmation step
    setCurrentStep(currentStep + 1);
  };

  const mockFormData: StepData = {
    listType: "Birthday",
    listName: "30th Birthday Bash",
    description:
      "A collection of items I would love for my 30th birthday celebration!",
    dueDate: "2024-05-23",
    provideAddress: true,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div
              className="text-center my-auto flex flex-col gap-4 rounded-md border-gray-200 bg-white
               px-12 py-6 w-[50%] mx-auto shadow-xl
"
            >
              <h2 className="text-4xl font-medium mb-4">
                CREATE YOUR WISH LIST NOW!
              </h2>
              <p className="mb-8">
                Provide all the details for the gift list you'd like to create.
                This ensures your loved ones have the information they need.
                {/* Whether someone wants to create a surprise list and share it
                with friends or offer it to you, everything is possible here. */}
              </p>

              <GhostButtonBlack text="Create Your List" onClick={goNextStep} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-4 h-full w-full">
            <FormStepTwo
              onNext={() => setCurrentStep((prevStep) => prevStep + 1)}
            />
          </div>
        );
      case 3:
        return (
          <ReviewStep
            formData={mockFormData}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
          />
        );
      case 4:
        return <ConfirmationStep />;
      default:
        return <div>Review and Submit Form</div>; // Final step or submission message
    }
  };

  return <div className="w-full">{renderStep()}</div>;
};

export default createNewWishlist;
