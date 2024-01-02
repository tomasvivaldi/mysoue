import Image from "next/image";
import Link from "next/link";
import GhostButton from "./GhostButtonWhite";

const Banner = () => {
  return (
    <div className="sticky flex flex-col inner-width paddings py-8 mb-8 text-white gap-8 x-paddings2">
      <div
        className="z-10 bg-gradient-to-r from-[#846148] to-[#BE8C67] rounded-xl w-full px-4 md:px-8 py-8
        flex flex-col justify-center items-center gap-4 md:gap-8"
      >
        <h2 className="text-2xl md:text-3xl max-w-lg text-center">
          Etiam nulla lectus amet nunc molestie at vulputate.
        </h2>

        <GhostButton
          text="Create Your List"
          // onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default Banner;
