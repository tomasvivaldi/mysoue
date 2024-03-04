import React, { useState } from "react";
import GhostButtonBlack from "./GhostButtonBlack";

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
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-md border-gray-200 px-4 md:px-12 py-6  shadow-xl">
      <h2 className="text-2xl font-semibold text-left">Create Your Wishlist</h2>
      <p className="text-left ">Fill in the details to create a new wishlist</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block mb-2 text-left">Type of List</label>
          <select
            className="w-full p-2 border rounded"
            value={listType}
            onChange={(e) => setListType(e.target.value)}
          >
            {listOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-left">Due Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-left">Name of the List</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-start">
          <label className="block text-left mr-4 mb-4">
            Would you like to provide a delivery address?
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
              <span className="ml-2">Yes</span>
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
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>
      </div>
      {provideAddress && (
        <div className="col-span-1">
          <label className="block -mt-2 mb-2 text-left">Address</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your address"
            value={address} // Make sure you have a state for this
            onChange={(e) => setAddress(e.target.value)} // And a method to update it
          />
        </div>
      )}

      <div className=" col-span-1 ">
        <label className="block mb-2 text-left">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter list description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <GhostButtonBlack text=" Next Step" onClick={onNext} />
    </div>
  );
};

export default FormStepTwo;
