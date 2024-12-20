import Image from 'next/image';
import { Plus, Menu, ArrowUpRight } from 'lucide-react';

export default function Wishes() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 my-12">
      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-serif italic mb-16">
        for all your wishes
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* CREATE Card */}
        <div className="bg-[#FFF9E8] border border-black rounded-3xl p-6 flex flex-col justify-between items-center min-h-[300px] min-w-[330px]">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black hover:text-white-200 font-medium">CREATE</h2>
            <Plus className="w-6 h-6" />
          </div>

          {/* Centered Image */}
          <div className="flex-grow flex justify-center items-center">
            <Image
              src="/wishes/create.svg"
              alt="Create Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <button className="w-full py-2 px-4 rounded-full bg-[transparent] hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            GET INSPIRED BY OUR LISTS
          </button>
        </div>

        {/* SORT Card */}
        <div className="bg-[#FFF9E8] border border-black rounded-3xl p-6 flex flex-col justify-between items-center min-h-[340px] min-w-[310px]">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black hover:text-white-200 font-medium">SORT</h2>
            <Menu className="w-6 h-6" />
          </div>

          {/* Centered Image */}
          <div className="flex-grow flex justify-center items-center">
            <Image
              src="/wishes/sort.svg"
              alt="Sort Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <button className="w-full py-2 px-4 rounded-full bg-[transparent] hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            BROWSE ITEMS
          </button>
        </div>

        {/* SHARE Card */}
        <div className="bg-[#FFF9E8] border border-black rounded-3xl p-6 flex flex-col justify-between items-center min-h-[300px] min-w-[330px]">
          <div className="flex justify-between items-start w-full">
            <h2 className="text-xl text-black hover:text-white-200 font-medium">SHARE</h2>
            <ArrowUpRight className="w-6 h-6" />
          </div>

          {/* Centered Image */}
          <div className="flex-grow flex justify-center items-center">
            <Image
              src="/wishes/share.svg"
              alt="Share Image"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>

          <button className="w-full py-2 px-4 rounded-full bg-[transparent] hover:bg-[#A5282C] text-[#C6B8A2] hover:text-white border border-[#C6B8A2] text-sm transition-colors">
            SIGN IN TO SHARE
          </button>
        </div>
      </div>
    </div>
  );
}
