// components/HeroCard.tsx
import React from "react";

type HeroCardProps = {
  title: string;
  imagePath: string;
};

const HeroCard: React.FC<HeroCardProps> = ({ title, imagePath }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <img className="w-full rounded shadow-lg" src={imagePath} alt={title} />
      <div className="px-6 py-1 bg-gray-800 text-white text-center font-semibold uppercase rounded-lg">
        {title}
      </div>
    </div>
  );
};

export default HeroCard;
