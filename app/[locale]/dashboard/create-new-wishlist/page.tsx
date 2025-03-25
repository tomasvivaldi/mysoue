"use client";

import FormStepTwo from "@/components/FormStep2";
import GhostButtonBlack from "@/components/GhostButtonBlack";
import React, { useState } from "react";
import ReviewStep from "@/components/ReviewStep";
import ConfirmationStep from "@/components/ConfirmationStep";
import { useMutation } from "@apollo/client";
import { ADD_WISHLIST } from "@/graphql/mutations";
import { useTranslations } from "next-intl";
import Head from "next/head";

// Define the type for each step's data
type StepData = {
  listType: string;
  listName: string;
  description: string;
  dueDate: string;
  provideAddress: boolean;
  address?: string;
};

interface ListOption {
  value: string;
  label: string;
}

const CreateNewWishlist = () => {
  const t = useTranslations("Dashboard-CreateNewWishlist");
  const listOptions: ListOption[] = [
    { value: "", label: "Select a type" },
    { value: "baby-shower", label: "Baby shower wishlist" },
    { value: "christmas", label: "Christmas wishlist" },
    { value: "birthday", label: "Birthday wishlist" },
    { value: "marriage", label: "Marriage wishlist" },
  ];

  // Destructure the loading flag from useMutation
  const [addWishlist, { loading: mutationLoading }] = useMutation(ADD_WISHLIST);

  // Start at step 1 (welcome screen)
  const [currentStep, setCurrentStep] = useState(1);
  const [listType, setListType] = useState("");
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [address, setAddress] = useState("");
  const [provideAddress, setProvideAddress] = useState(false);
  // Store the step's data once validated; null until then
  const [formData, setFormData] = useState<StepData | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [triggerShake, setTriggerShake] = useState(false);

  const goNextStep = () => {
    if (isNextDisabled) return;

    // Validate only on the form step
    if (currentStep === 2) {
      const stepData: StepData = {
        listType,
        listName,
        description,
        dueDate,
        provideAddress,
        ...(provideAddress && { address }),
      };

      const newErrors: { [key: string]: boolean } = {};
      if (!listType) newErrors.listType = true;
      if (!listName.trim()) newErrors.listName = true;
      if (!dueDate) newErrors.dueDate = true;
      if (provideAddress && !address.trim()) newErrors.address = true;
      if (!description.trim()) newErrors.description = true;

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        // Trigger shake animation on errors
        setTriggerShake(true);
        setTimeout(() => setTriggerShake(false), 500);
        return;
      }

      // Save the validated step data
      setFormData(stepData);
    }

    // Prevent button spam
    setIsNextDisabled(true);
    setTimeout(() => setIsNextDisabled(false), 1000);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleEdit = () => {
    // Allow user to edit the form by returning to the form step
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    if (!formData || !formData.listName || !formData.listType) {
      console.error("Invalid form data. Please complete all required fields.");
      return;
    }

    const userId = "28"; // Ideally, fetch this dynamically
    const now = new Date().toISOString();

    addWishlist({
      variables: {
        user_id: userId,
        title: formData.listName,
        type: formData.listType,
        description: formData.description,
        due_date: formData.dueDate,
        require_address: formData.provideAddress,
        address: formData.address || "",
        created_at: now,
        updated_at: now,
      },
    })
      .then((response) => {
        console.log("Wishlist added successfully:", response.data);
        // Move to confirmation step
        setCurrentStep((prevStep) => prevStep + 1);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center p-4 h-full">
            <div
              className="text-center my-auto flex flex-col gap-4 rounded-md border-gray-200 
              bg-[#fbf9f4] px-4 md:px-12 py-6 w-[90%] sm:w-[80%] lg:w-[50%] mx-auto shadow-xl"
            >
              <h2 className="text-4xl font-medium mb-4">{t("stepOneTitle")}</h2>
              <p className="mb-8">{t("stepOneDescription")}</p>
              <GhostButtonBlack text={t("stepOneButton")} onClick={goNextStep} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center p-4 h-full w-full">
            <FormStepTwo
              errors={errors}
              setErrors={setErrors}
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
              triggerShake={triggerShake}
            />
          </div>
        );
      case 3:
        return (
          formData && (
            <ReviewStep
              formData={formData}
              onEdit={handleEdit}
              onSubmit={handleSubmit}
              loading={mutationLoading} // Pass the mutation loading state
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

export default CreateNewWishlist;