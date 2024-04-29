import React, { SVGProps } from "react";

const OurLists = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 paddings mt-20">
      <h2 className="heading1 text-center font-simplemichael">
        Get inspiration for your gifts
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 x-paddings">
        <div className="w-full bg-[#fbf9f4] rounded-lg overflow-hidden">
          <img
            alt="Christmas"
            className="w-full h-48 object-cover"
            height="240"
            src="/xmas.jpg"
            style={{
              aspectRatio: "350/240",
              objectFit: "cover",
            }}
            width="350"
          />
          <div>
            <h3 className="text-lg font-semibold font-simplemichael">
              Christmas
            </h3>
            <p className="text-sm text-gray-600 mt-2 font-nunito">
              A tristique facilisi gravida at felis. Sed ornare arcu, tortor
              hendrerit etiam vulputate libero tellus. Etiam nu
            </p>
          </div>
        </div>
        <div className="w-full bg-[#fbf9f4] rounded-lg overflow-hidden">
          <img
            alt="Birthdays"
            className="w-full h-48 object-cover"
            height="240"
            src="/bday.jpg"
            style={{
              aspectRatio: "350/240",
              objectFit: "cover",
            }}
            width="350"
          />
          <div>
            <h3 className="text-lg font-semibold font-simplemichael">
              Birthdays
            </h3>
            <p className="text-sm text-gray-600 mt-2 font-nunito">
              A tristique facilisi gravida at felis. Sed ornare arcu, tortor
              hendrerit etiam vulputate libero tellus. Etiam nu
            </p>
          </div>
        </div>
        <div className="w-full bg-[#fbf9f4] rounded-lg overflow-hidden">
          <img
            alt="Baby Showers"
            className="w-full h-48 object-cover"
            height="240"
            src="/baby.jpg"
            style={{
              aspectRatio: "350/240",
              objectFit: "cover",
            }}
            width="350"
          />
          <div>
            <h3 className="text-lg font-semibold font-simplemichael">
              Baby Showers
            </h3>
            <p className="text-sm text-gray-600 mt-2 font-nunito">
              A tristique facilisi gravida at felis. Sed ornare arcu, tortor
              hendrerit etiam vulputate libero tellus. Etiam nu
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="inline-flex items-center gap-2">
          See Our lists
          <ExternalLinkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

function ExternalLinkIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

export default OurLists;
