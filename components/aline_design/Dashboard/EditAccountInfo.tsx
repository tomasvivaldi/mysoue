"use client";

import { useState } from "react";
import { UPDATE_USER_INFO } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useTranslations } from "next-intl"; // Import translation hook

interface EditAccountInfoProps {
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  birthdate?: string;
  gender?: string;
  onCancel: () => void;
}

const EditAccountInfo: React.FC<EditAccountInfoProps> = ({
  first_name,
  last_name,
  username,
  email,
  birthdate,
  gender,
  onCancel,
}) => {
  const t = useTranslations("EditAccountInfo"); // Use translations

  // Function to format the birthdate correctly
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ""; // Keep it empty if no date
    return new Date(dateString).toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  const [formData, setFormData] = useState({
    first_name: first_name || "",
    last_name: last_name || "",
    birthdate: formatDate(birthdate), // Ensure correct date format
    gender: gender || "",
  });

  const [updateUserInfo, { loading, error }] = useMutation(UPDATE_USER_INFO);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the birthdate is either properly formatted or set to null
    const formattedBirthdate = formData.birthdate ? formData.birthdate : null;

    try {
      await updateUserInfo({
        variables: {
          email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          birthdate: formattedBirthdate,
          gender: formData.gender,
        },
      });
      alert(t("profileUpdated"));
      onCancel(); // Close the form after saving
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg w-full">
      <h2 className="text-lg font-bold mb-4">{t("editYourInfo")}</h2>

      {error && <p className="text-red-500">{error.message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-bold">{t("firstName")}</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-bold">{t("lastName")}</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Birthdate (FIX APPLIED HERE) */}
        <div>
          <label className="block text-sm font-bold">{t("birthdate")}</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-bold">{t("gender")}</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">{t("selectGender")}</option>
            <option value="Male">{t("male")}</option>
            <option value="Female">{t("female")}</option>
            <option value="Other">{t("other")}</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-400 text-gray-600 font-bold rounded-full px-6 py-2 hover:bg-gray-200 transition"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="bg-[#A5282C] text-white font-bold py-2 px-6 rounded-full hover:bg-[#8B1E26] transition"
            disabled={loading}
          >
            {loading ? t("saving") : t("saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountInfo;