import Image from "next/image";

import { useTranslations } from "next-intl";

const Banner2 = () => {
  const t = useTranslations("Banner2");
  return (
    <div className="sm:-mx-16 -mx-4 relative flex flex-col justify-center items-center text-center text-white py-16 mb-8">
      {/* Background Image */}
      <Image
        src="/banner2.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Our mission and vision"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2
          className="heading2 mb-4 font-simplemichael"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          {t("heading")}
        </h2>
        <p className="text-lg font-nunito">{t("description")}</p>
      </div>
    </div>
  );
};

export default Banner2;
