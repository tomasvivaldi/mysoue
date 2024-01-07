import Link from "next/link";
import React from "react";

const ContentLeft = () => {
  return (
    <div key="1" className="flex justify-between x-paddings2 my-12">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold">
          Step Into A World Of Endless Possibilities
        </h1>
        <ul className="list-disc space-y-4 pl-5 text-lg">
          <li>
            Occasions Tailored Just For You: From Baby Showers To Retirement
            Parties, Select The Event And Start Crafting A Wishlist That
            Captures The Essence Of Your Celebration.
          </li>
          <li>
            Seamless Sharing With Loved Ones: Once Your List Is Ready, Share It
            Effortlessly With Friends And Family. Say Goodbye To Unwanted Or
            Duplicate Gifts!
          </li>
          <li>
            Inspiration At Your Fingertips: Need Ideas? Browse Through Our
            Curated Categories For Inspiration Across A Wide Range Of Interests
            And Hobbies.
          </li>
        </ul>
        <Link
          className="inline-flex items-center space-x-1 text-lg font-medium text-blue-600 hover:text-blue-500"
          href="#"
        >
          <span>Go to Login</span>
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-1/2">
        <img
          alt="Placeholder"
          className="w-96 h-96"
          height="600"
          src="/placeholder.svg"
          style={{
            aspectRatio: "600/600",
            objectFit: "cover",
          }}
          width="600"
        />
      </div>
    </div>
  );
};

export default ContentLeft;

function ChevronRightIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
