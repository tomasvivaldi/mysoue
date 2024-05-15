import React from "react";
import FAQItem from "./FAQItem";
import { useTranslations } from "next-intl";

const FAQSection = () => {
  const t = useTranslations("faq");
  const faqs = [
    {
      id: t("q1.id"),
      question: t("q1.question"),
      answer: t("q1.answer"),
    },
    {
      id: t("q2.id"),
      question: t("q2.question"),
      answer: t("q2.answer"),
    },
    {
      id: t("q3.id"),
      question: t("q3.question"),
      answer: t("q3.answer"),
    },
    {
      id: t("q4.id"),
      question: t("q4.question"),
      answer: t("q4.answer"),
    },
    {
      id: t("q5.id"),
      question: t("q5.question"),
      answer: t("q5.answer"),
    },
    {
      id: t("q6.id"),
      question: t("q6.question"),
      answer: t("q6.answer"),
    },
    {
      id: t("q7.id"),
      question: t("q7.question"),
      answer: t("q7.answer"),
    },
    {
      id: t("q8.id"),
      question: t("q8.question"),
      answer: t("q8.answer"),
    },
    {
      id: t("q9.id"),
      question: t("q9.question"),
      answer: t("q9.answer"),
    },
  ];

  // Split FAQs into two columns dynamically
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midPoint);
  const rightColumnFAQs = faqs.slice(midPoint);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <div className="text-center">
        <h2 className="text-gray-900 heading2 font-simplemichael">
          {t("title")}
        </h2>
        <div className="mt-12 flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 md:pr-4">
            {" "}
            {/* Adjust padding as needed */}
            {leftColumnFAQs.map((faq, index) => (
              <div className="my-2 py-2">
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            {" "}
            {/* Adjust padding as needed */}
            {rightColumnFAQs.map((faq, index) => (
              <div className="my-2 py-2">
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
