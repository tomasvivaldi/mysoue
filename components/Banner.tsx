import Image from "next/image";
import Link from "next/link";
import GhostButton from "./GhostButtonWhite";

const Banner = () => {
  return (
    <div className="sticky flex flex-col inner-width paddings py-8 mb-8 text-white gap-8 x-paddings2">
      <div
        className="z-10 relative bg-[#B72228] rounded-xl w-full px-4 md:px-8 py-8
        flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8"
      >
        <div className="w-full flex flex-col lg:flex-row justify-between p-6 xl:p-12 gap-8 lg:gap-0 items-center">
          <h2 className="text-2xl md:text-3xl max-w-lg font-nunito text-left">
            ENJOY THE HAPPINESS OF{" "}
            <span className=" font-simplemichael text-3xl md:text-4xl ">
              convenience
            </span>
          </h2>
          <div className="z-50">
            <GhostButton text="Create Your List" href="/login" />
          </div>
        </div>
        <div className=" lg:absolute max-w-[500px] lg:min-w-[1000px] ">
          {/* <Image
            height={1159}
            width={1951}
            src="/Symbol/Logo-Mysoue-Symbol_4.png"
            alt="Symbol"
            layout="responsive"
            objectFit="contain"
            className="lg:absolute w-full lg:w-[1000px] -right-[50vw] -top-[150px] "
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
