// pages/faq.tsx or components/FAQSection.tsx
import React from "react";
import FAQItem from "./FAQItem";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is it 100% free to settle a wishlist ?",
      answer:
        "Yes, the service is offered 100% free of charge in its entirety, with no hidden fees, both for list authors and for people who offer a gift. There are no limits on functionality or time.",
    },
    {
      question: "How long can I access my list?",
      answer: "As long as you like. That is, until you delete it.",
    },
    {
      question: "Will you take care of delivery?",
      answer:
        "No. Mysoue is a space where the author of a list can express gift wishes in complete freedom. We are not an online sales site, so we don't handle the sale or delivery of gifts, nor the choice of stores, and we don't accept any payment.\n\nThe gift list and the choice of links are entirely the responsibility of the author of the list. You can therefore contact the store indicated by the author of the list for the gift you have reserved. \n\nIf no store is indicated, or if the product is no longer available, you can purchase the gift in another store of your choice.",
    },
    {
      question: "Do I need to create an account to offer a gift?",
      answer:
        "No, you can offer a gift by entering only your name and, optionally, your e-mail address. \n\nNo account needs to be created to offer a gift or make a free donation.",
    },
    {
      question: "Will I be notified when a gift is reserved on my list?",
      answer:
        "If you have provided your email address, an email will be sent automatically each time a gift is reserved. \n\nIf you have not received an e-mail from us, please add info@mysoue.com to your e-mail contacts to prevent our e-mails from ending up in your spam folder.",
    },
    {
      question: "Can I modify my wishlist after sharing it?",
      answer: "Of course you can modify it at any moment!",
    },
    {
      question: "Is my delivery address visible to everyone?",
      answer:
        "No. You can decide whether or not to add your address and make it visible. If your address is shared, it will only be displayed when a visitor has made a reservation.",
    },
    {
      question: "I don't live in Thailand. Can I still give a gift?",
      answer: "Yes, Mysoue can be used from any country.",
    },
    {
      question: "Can I create a wishlist for someone else?",
      answer:
        "Of course! Should you wanna create a surprise list for a friend for a surprise event everything is possible here.",
    },
  ];

  // Split FAQs into two columns dynamically
  const midPoint = Math.ceil(faqs.length / 2);
  const leftColumnFAQs = faqs.slice(0, midPoint);
  const rightColumnFAQs = faqs.slice(midPoint);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-gray-900 heading2">Any questions?</h2>
        {/* Additional content */}
      </div>
      <div className="mt-12 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 pr-4">
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
        <div className="w-full md:w-1/2 pl-4">
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
  );
};

export default FAQSection;
