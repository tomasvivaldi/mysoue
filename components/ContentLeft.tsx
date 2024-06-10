import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ContentLeft = () => {
  const t = useTranslations("ContentLeft");

  return (
    <div
      key="1"
      className="flex justify-between x-paddings my-12 flex-col md:flex-row gap-8 md:gap-2"
    >
      <div className="max-w-xl space-y-6">
        <h1 className="heading2 font-simplemichael">{t("heading")}</h1>
        <ul className="list-disc space-y-4 pl-5 text-lg">
          <li className="font-nunito">{t("point1")}</li>
          <li className="font-nunito">{t("point2")}</li>
          <li className="font-nunito">{t("point3")}</li>
        </ul>
        <Link
          className="inline-flex items-center space-x-1 text-lg font-medium text-blue-600 hover:text-blue-500"
          href="/login"
        >
          <span className="font-nunito">{t("loginLink")}</span>
          <ChevronRightIcon className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image
          src="/create1.png"
          alt={t("imageAlt")}
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
