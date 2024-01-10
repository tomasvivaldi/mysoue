// pages/faq.tsx or components/FAQSection.tsx
import React from "react";
import FAQItem from "../components/FAQItem";

const FAQSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className=" text-gray-900 heading2">Any questions?</h2>
        <p className="mt-4 text-gray-900 heading1">Check out our FAQs</p>
        <p className="mt-2 text-base text-gray-500 ">
          Have Questions? We've Got Answers! Dive Into Our FAQ Section To Find
          Detailed Responses To Common Queries.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Repeat FAQItem for each question */}
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />
        <FAQItem
          question="Why Choose Us?"
          answer="Some explanation text here."
        />

        {/* ... other FAQItem components ... */}
      </div>
    </div>
  );
};

export default FAQSection;
