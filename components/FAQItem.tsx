"use client";
import React, { useState, FunctionComponent } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

const ChevronDownIcon: FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FAQItem: FunctionComponent<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className=" border-b ">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {question}
        </h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <p
        className={`mt-2 text-base text-gray-500 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 h-0"
        }`}
      >
        {answer}
      </p>
    </div>
  );
};

export default FAQItem;
