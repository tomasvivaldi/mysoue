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

  // Split the answer string into paragraphs wherever a line break occurs
  const answerParagraphs = answer
    .split(/\\n|\n/)
    .filter((paragraph) => paragraph.trim());

  return (
    <div className="border-b h-fit">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900 font-nunito">
          {question}
        </h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out  ${
          isOpen ? "max-h-96" : "max-h-0"
        } overflow-hidden`}
      >
        {answerParagraphs.map((paragraph, index) => (
          <p className="p-2 font-nunito" key={index}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FAQItem;
