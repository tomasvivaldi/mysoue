import React from "react";
import GhostButtonBlack from "./GhostButtonBlack";
import { useTranslations } from "next-intl";

interface ListOption {
  value: string;
  label: string;
}

interface FormStepTwoProps {
  onNext: () => void;
  listOptions: ListOption[];
  listType: string;
  setListType: React.Dispatch<React.SetStateAction<string>>;
  listName: string;
  setListName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  provideAddress: boolean;
  setProvideAddress: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  errors: { [key: string]: boolean }; 
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  triggerShake: boolean;
}

const FormStepTwo: React.FC<FormStepTwoProps> = ({
  onNext,
  listOptions,
  listType,
  setListType,
  listName,
  setListName,
  description,
  setDescription,
  dueDate,
  setDueDate,
  provideAddress,
  setProvideAddress,
  address,
  setAddress,
  errors,
  setErrors,
  triggerShake
}) => {
  const t = useTranslations("Dashboard-CreateNewWishlist-FormStepTwo");

  return (
    <div className="flex flex-col gap-2 md:gap-4 rounded-xl border-gray-200 px-4 md:px-12 py-6 shadow-xl h-[85vh] lg:max-h-[511px] overflow-y-scroll">
      <h2 className="text-2xl font-semibold text-left">{t("title")}</h2>
      <p className="text-left ">{t("description")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
        <div>
          <label className="block mb-2 text-left">{t("typeOfListLabel")}</label>
          <select
            className={`w-full p-2 border rounded ${errors.listType ? "border-red-500" : ""}`}
            value={listType}
            onChange={(e) => {
              setListType(e.target.value);
              if (errors.listType) setErrors((prev) => ({ ...prev, listType: false }));
            }}
          >
            {listOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-left">{t("dueDateLabel")}</label>
          <input
            type="date"
            className={`w-full p-2 border rounded ${errors.dueDate ? "border-red-500" : ""}`}
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: false }));
            }}
          />
        </div>

        <div>
          <label className="block mb-2 text-left">{t("listNameLabel")}</label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${errors.listName ? "border-red-500" : ""}`}
            value={listName}
            onChange={(e) => {
              setListName(e.target.value);
              if (errors.listName) setErrors((prev) => ({ ...prev, listName: false }));
            }}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="block text-left mr-4 mb-4">
            {t("provideAddressLabel")}
          </label>
          <div className="flex items-center">
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="addressOption"
                value="yes"
                onChange={() => setProvideAddress(true)}
                checked={provideAddress === true}
              />
              <span className="ml-2">{t("addressYesLabel")}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="addressOption"
                value="no"
                onChange={() => setProvideAddress(false)}
                checked={provideAddress === false}
              />
              <span className="ml-2">{t("addressNoLabel")}</span>
            </label>
          </div>
        </div>
      </div>

      {provideAddress && (
        <div className="col-span-1">
          <label className="block -mt-2 mb-2 text-left">
            {t("addressLabel")}
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded ${errors.address ? "border-red-500" : ""}`}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (errors.address) setErrors((prev) => ({ ...prev, address: false }));
            }}
          />
        </div>
      )}

      <div className="col-span-1">
        <label className="block mb-2 text-left">
          {t("listDescriptionLabel")}
        </label>
        <textarea
          className={`w-full p-2 border rounded ${errors.description ? "border-red-500" : ""}`}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: false }));
          }}
        />
      </div>

      <div className={`w-full flex justify-center transition-all duration-300 ${triggerShake ? "animate-shake" : ""}`}>
        <GhostButtonBlack text={t("nextStepButton")} onClick={onNext} />
      </div>
    </div>
  );
};

export default FormStepTwo;