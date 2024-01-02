import React from "react";

type TestimonialCardProps = {
  text: string;
  author: string;
  avatarUrl: string;
  rating: number;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  author,
  avatarUrl,
  rating,
}) => {
  return (
    <div
      className={`flex flex-col items-center p-4 min-h-[200px] w-[200px] sm:w-[400px] mx-auto`}
    >
      {/* Rating Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.396-1.28 2.207-1.28 2.603 0l1.18 3.821a1 1 0 001.14.688l4.002-.58c1.166-.169 1.637 1.511.79 2.265l-2.897 2.516a1 1 0 00-.287 1.112l1.14 3.885c.24 1.2-1.05 2.127-2.03 1.456l-3.462-2.369a1 1 0 00-1.16 0l-3.462 2.369c-.98.671-2.27-.256-2.03-1.456l1.14-3.885a1 1 0 00-.287-1.112l-2.897-2.516c-.847-.754-.376-2.434.79-2.265l4.002.58a1 1 0 001.14-.688l1.18-3.821z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-sm text-gray-600 text-center mb-4 break-words w-full">{`"${text}"`}</p>

      {/* Author Details */}
      <div className="flex flex-col items-center">
        <img
          className="h-12 w-12 rounded-full mb-2"
          src={avatarUrl}
          alt={author}
        />
        <p className="text-gray-800 text-sm">{author}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
