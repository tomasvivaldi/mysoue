"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface SectionContent {
  title: string;
  content: string;
  image: string;
}

export default function OurAbout() {
  // 1) Create a translator from the "OurAbout" namespace
  const t = useTranslations("OurAbout");

  // 2) Build the sections array using translations
  const sections: SectionContent[] = [
    {
      title: t("dnaTitle"),
      content: t("dnaContent"),
      image: "/OurAbout/dna.jpg",
    },
    {
      title: t("soueTitle"),
      content: t("soueContent"),
      image: "/OurAbout/soue.jpg",
    },
    {
      title: t("valuesTitle"),
      content: t("valuesContent"),
      image: "/OurAbout/values.jpg",
    },
    {
      title: t("visionTitle"),
      content: t("visionContent"),
      image: "/OurAbout/vision.jpg",
    },
  ];

  // Initialize activeSection with the first section's title
  const [activeSection, setActiveSection] = useState<string>(sections[0].title);
  const activeImage = sections.find(
    (section) => section.title === activeSection
  )?.image;

  const handleSectionClick = (sectionTitle: string) => {
    setActiveSection(sectionTitle);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-4">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={activeImage || "/OurAbout/bg.jpg"}
          alt="About Us"
          fill
          className="object-cover rounded-lg transition-all duration-300"
          priority
        />
      </div>
      <div className="bg-[#FFF9E8] p-8 rounded-lg">
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="relative"
            >
              <h2 
                className={`text-2xl font-bold mb-2 cursor-pointer transition-colors duration-200 ${
                  activeSection === section.title ? 'text-primary' : 'hover:text-primary'
                }`}
                onClick={() => handleSectionClick(section.title)}
              >
                {section.title}
              </h2>
              {activeSection === section.title && (
                <p
                  className="text-neutral-700 transform transition-all duration-300 ease-out opacity-100 translate-y-0"
                >
                  {section.content}
                </p>
              )}
              <div className="mt-4 border-t border-neutral-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}