import Link from "next/link";
import React from "react";
import Image from "next/image";

const ContentLeft = () => {
  return (
    <div
      key="1"
      className="flex justify-between x-paddings my-12 flex-col md:flex-row gap-8 md:gap-0"
    >
      <div className="max-w-xl space-y-6">
        <h1 className="heading2 font-simplemichael">
          Step into a world of endless possibilities
        </h1>
        <ul className="list-disc space-y-4 pl-5 text-lg  ">
          <li className="font-nunito">
            Occasions Tailored Just For You: From Baby Showers To Retirement
            Parties, Select The Event And Start Crafting A Wishlist That
            Captures The Essence Of Your Celebration.
          </li>
          <li className="font-nunito">
            Seamless Sharing With Loved Ones: Once Your List Is Ready, Share It
            Effortlessly With Friends And Family. Say Goodbye To Unwanted Or
            Duplicate Gifts!
          </li>
          <li className="font-nunito">
            Inspiration At Your Fingertips: Need Ideas? Browse Through Our
            Curated Categories For Inspiration Across A Wide Range Of Interests
            And Hobbies.
          </li>
        </ul>
        <Link
          className="inline-flex items-center space-x-1 text-lg font-medium text-blue-600 hover:text-blue-500"
          href="#"
        >
          <span className="font-nunito">Go to Login</span>
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image
          src="/create1.png"
          alt="create 1"
          width={1556}
          height={1724}
          objectPosition="center"
          className="rounded-lg mx-auto md:my-auto w-full grow-0 shrink-0"
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
