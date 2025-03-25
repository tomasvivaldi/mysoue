// components/ReviewStep.tsx

import React from "react";
import GhostButtonBlack from "./GhostButtonBlack";
import { useTranslations } from "next-intl";

type StepData = {
  listType: string;
  listName: string;
  description: string;
  dueDate: string;
  provideAddress: boolean;
  address?: string | undefined;
};

type ReviewStepProps = {
  formData: StepData;
  onEdit: () => void; // Function to go back and edit the form
  onSubmit: () => void; // Function to submit the form
  loading: boolean;    // Flag to indicate if the mutation is loading
};

const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  onEdit,
  onSubmit,
  loading,
}) => {
  const t = useTranslations("Dashboard-CreateNewWishlist-ReviewStep");

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full w-full">
      <div className="rounded-md border-gray-200 bg-[#fbf9f4] px-4 md:px-12 py-6 w-[90%] sm:w-[80%] lg:w-[50%] mx-auto shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-4">{t("title")}</h2>
        <div className="text-left my-8 flex-col flex gap-2">
          <p>
            <strong>{t("typeOfListLabel")}</strong> {formData.listType}
          </p>
          <p>
            <strong>{t("nameOfListLabel")}</strong> {formData.listName}
          </p>
          <p>
            <strong>{t("descriptionLabel")}</strong> {formData.description}
          </p>
          <p>
            <strong>{t("dueDateLabel")}</strong> {formData.dueDate}
          </p>
          <p>
            <strong>{t("provideAddressLabel")}</strong>{" "}
            {formData.provideAddress ? t("yes") : t("no")}
          </p>
          {formData.provideAddress && formData.address && (
            <p>
              <strong>{t("addressLabel")}</strong> {formData.address}
            </p>
          )}
        </div>
        <button
          className="text-black font-medium py-2 px-4 rounded mb-4"
          onClick={onEdit}
        >
          {t("backButton")}
        </button>
        <GhostButtonBlack
          text={t("submitButton")}
          onClick={onSubmit}
          disabled={loading}  // disable the button when loading is true
        />
      </div>
    </div>
  );
};

export default ReviewStep;