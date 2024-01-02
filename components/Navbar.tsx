import Link from "next/link";
import { JSX, SVGProps } from "react";

export default function Component() {
  return (
    <nav className="flex items-center justify-between  border-b x-paddings py-6 bg-white">
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl font-light">MYSOUE</h1>
      </div>
      <div className="flex items-center space-x-8 justify-center">
        <Link
          className="text-sm font-medium hover:text-gray-700 hover:underline"
          href="/our-little-story"
        >
          Our Little Story
        </Link>
        {/* <Link
          className="text-sm font-medium hover:text-gray-700 hover:underline"
          href="/how-it-works"
        >
          How It Works
        </Link> */}
        <Link
          className="text-sm font-medium hover:text-gray-700 hover:underline"
          href="#"
        >
          Create a List
        </Link>
        <Link
          className="text-sm font-medium hover:text-gray-700 hover:underline"
          href="/our-lists"
        >
          Our Lists
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <SearchIcon className="h-5 w-5" />
        <Link className="text-sm font-medium hover:text-gray-700" href="#">
          Search
        </Link>
        <UserIcon className="h-5 w-5" />
        <Link className="text-sm font-medium hover:text-gray-700" href="#">
          Login
        </Link>
      </div>
    </nav>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
