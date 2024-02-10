// components/ReviewStep.tsx

import React from "react";
import GhostButtonBlack from "./GhostButtonBlack";

type StepData = {
  listType: string;
  listName: string;
  description: string;
  dueDate: string;
  provideAddress: boolean;
};

type ReviewStepProps = {
  formData: StepData;
  onEdit: () => void; // Function to go back and edit the form
  onSubmit: () => void; // Function to submit the form
};

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onEdit,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <div className="rounded-md border-gray-200 bg-white px-12 py-6 w-[50%] mx-auto shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">Review Your Wishlist</h2>
        <div className="text-left mb-8">
          <p>
            <strong>Type of List:</strong> {formData.listType}
          </p>
          <p>
            <strong>Name of the List:</strong> {formData.listName}
          </p>
          <p>
            <strong>Description:</strong> {formData.description}
          </p>
          <p>
            <strong>Due Date:</strong> {formData.dueDate}
          </p>
          <p>
            <strong>Provide Address:</strong>{" "}
            {formData.provideAddress ? "Yes" : "No"}
          </p>
        </div>
        <button
          className=" text-black font-medium py-2 px-4 rounded mb-4"
          onClick={onEdit}
        >
          Back
        </button>

        <GhostButtonBlack text="Submit Wishlist " onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ReviewStep;
