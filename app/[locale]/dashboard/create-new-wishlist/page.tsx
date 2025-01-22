"use client";

import FormStepTwo from "@/components/FormStep2";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import React, { useState } from "react";
import ReviewStep from "@/components/ReviewStep";
import ConfirmationStep from "@/components/ConfirmationStep";
import { useMutation, gql } from "@apollo/client";
import { ADD_WISHLIST } from "@/graphql/mutations"; // Adjust the import path to where your mutations are defined
import { useTranslations } from "next-intl";
import Head from "next/head";

// Define the type for each step's data if needed
type StepData = {
  listType: string;
  listName: string;
  description: string;
  dueDate: string;
  provideAddress: boolean;
  address?: string | undefined;
};

interface ListOption {
  value: string;
  label: string;
}

const createNewWishlist = () => {
  const t = useTranslations("Dashboard-CreateNewWishlist");
  const listOptions: ListOption[] = [
    { value: "", label: "Select a type" },
    { value: "baby-shower", label: "Baby shower wishlist" },
    { value: "christmas", label: "Christmas wishlist" },
    { value: "birthday", label: "Birthday wishlist" },
    { value: "marriage", label: "Marriage wishlist" },
  ];

  const [addWishlist, { data, loading, error }] = useMutation(ADD_WISHLIST);

  const [currentStep, setCurrentStep] = useState(2);
  const [listType, setListType] = useState("");
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [address, setAddress] = useState("");
  const [provideAddress, setProvideAddress] = useState(false);
  const [formData, setFormData] = useState<StepData[]>([]);

  const goNextStep = () => {
    // Check if you're moving away from the step that involves FormStepTwo
    if (currentStep === 2) {
      // Create an object with the form data
      const stepData: StepData = {
        listType,
        listName,
        description,
        dueDate,
        provideAddress,
        ...(provideAddress && { address }), // Include address conditionally
      };

      // Set formData state
      setFormData([...formData, stepData]); // This assumes formData is meant to accumulate data from all steps
    }

    // Proceed to the next step
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
  
    // Ensure we have valid data
    if (formData.length === 0 || !formData[0].listName || !formData[0].listType) {
      console.error("Invalid form data. Please complete all required fields.");
      return;
    }
  
    // Prepare mutation variables
    const userId = "28"; // This should be dynamically fetched, not hardcoded
    const now = new Date().toISOString();
  
    addWishlist({
      variables: {
        user_id: userId,
        title: formData[0].listName,
        type: formData[0].listType,
        description: formData[0].description,
        due_date: formData[0].dueDate,
        require_address: formData[0].provideAddress,
        address: formData[0].address || "",
        created_at: now,
        updated_at: now,
      },
    })
      .then((response) => {
        console.log("Wishlist added successfully:", response.data);
        // Proceed to confirmation step
        setCurrentStep((prevStep) => prevStep + 1);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
              className="text-center my-auto flex flex-col gap-4 rounded-md border-gray-200 bg-[#fbf9f4]
              px-4 md:px-12 py-6 w-[90%] sm:w-[80%] lg:w-[50%] mx-auto shadow-xl"
            >
              <h2 className="text-4xl font-medium mb-4">{t("stepOneTitle")}</h2>
              <p className="mb-8">{t("stepOneDescription")}</p>

              <GhostButtonBlack
                text={t("stepOneButton")}
                onClick={goNextStep}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-4 h-full w-full">
            <FormStepTwo
              onNext={goNextStep}
              listOptions={listOptions}
              listType={listType}
              setListType={setListType}
              listName={listName}
              setListName={setListName}
              description={description}
              setDescription={setDescription}
              dueDate={dueDate}
              setDueDate={setDueDate}
              provideAddress={provideAddress}
              setProvideAddress={setProvideAddress}
              address={address}
              setAddress={setAddress}
            />
          </div>
        );
      case 3:
        return (
          formData.length > 0 && (
            <ReviewStep
              formData={formData[formData.length - 1]}
              onEdit={handleEdit}
              onSubmit={handleSubmit}
            />
          )
        );
      case 4:
        return <ConfirmationStep />;
      default:
        return <div>Review and Submit Form</div>;
    }
  };

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="w-full">{renderStep()}</div>
    </>
  );
};

export default createNewWishlist;
