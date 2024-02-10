import React, { useState } from "react";
import GhostButtonBlack from "./GhostButtonBlack";

type FormStepTwoProps = {
  onNext: () => void; // Function to proceed to the next step
};

const FormStepTwo: React.FC<FormStepTwoProps> = ({ onNext }) => {
  const [listType, setListType] = useState("");
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [provideAddress, setProvideAddress] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-md border-gray-200 px-12 py-6  shadow-xl">
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
            <option value="">Select a type</option>
            {/* Map your options here */}
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
