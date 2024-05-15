"use client";
import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: string;
  text: string;
  author: string;
  avatarUrl: string;
  rating: number;
}

interface TestimonialsData {
  title: string;
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC = ({}) => {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      id: t("t1.id"),
      text: t("t1.text"),
      author: t("t1.author"),
      avatarUrl: t("t1.avatarUrl"),
      rating: Number(t("t1.rating")),
    },
    {
      id: t("t2.id"),
      text: t("t2.text"),
      author: t("t2.author"),
      avatarUrl: t("t2.avatarUrl"),
      rating: Number(t("t2.rating")),
    },
    {
      id: t("t3.id"),
      text: t("t3.text"),
      author: t("t3.author"),
      avatarUrl: t("t3.avatarUrl"),
      rating: Number(t("t3.rating")),
    },
    {
      id: t("t4.id"),
      text: t("t4.text"),
      author: t("t4.author"),
      avatarUrl: t("t4.avatarUrl"),
      rating: Number(t("t4.rating")),
    },
    {
      id: t("t5.id"),
      text: t("t5.text"),
      author: t("t5.author"),
      avatarUrl: t("t5.avatarUrl"),
      rating: Number(t("t5.rating")),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(400); // Default width of each card in pixels
  const [cardWidthAndMargins, setCardWidthAndMargins] = useState(
    cardWidth + 50
  );
  useEffect(() => {
    const updateCardWidth = () => {
      const newCardWidth = window.innerWidth < 640 ? 200 : 400;
      setCardWidth(newCardWidth);
      setCardWidthAndMargins(newCardWidth + 50); // Update based on new card width
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  if (!testimonials) {
    return <div>Loading testimonials...</div>; // or handle the loading state appropriately
  }

  return (
    <div className="flex flex-col items-center paddings my-20">
      <h2 className="heading2  md:mb-12 text-center font-simplemichael">
        {t("title")}
      </h2>
      <div className=" flex flex-row items-center justify-center ">
        <button onClick={prevTestimonial} className="z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="sm:w-10 sm:h-10 w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="overflow-x-hidden lg:max-w-[850px] max-w-[250px] sm:max-w-[450px] -mx-2 xs:mx-2 sm:mx-8">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * cardWidthAndMargins}px)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className=" flex-shrink-0 mx-[25px] flex justify-center lg:first:ml-0 lg:last:mr-0"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextTestimonial} className="z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="sm:w-10 sm:h-10 w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
