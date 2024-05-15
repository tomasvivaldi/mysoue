// components/Footer2.tsx
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl"; // Import the useTranslations hook

const Footer2 = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white pt-12 px-4 md:px-8 bottom-0 w-full border-t-2 border-gray-300 rounded-t-[50px]">
      <div className="w-full flex flex-col justify-between items-center">
        <div className="w-full flex flex-row justify-between items-center gap-10">
          <div className="flex flex-col mb-auto md:flex-row md:items-center gap-2">
            <p className="text-3xl font-extralight md:ml-4 uppercase tracking-widest">
              {t("sloganPart1")}
            </p>
            <p className="text-3xl font-simplemichael font-thin">
              {t("sloganPart2")}
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <h5 className="text-base sm:text-lg font-semibold">
                {t("contentHeading")}
              </h5>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                  >
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-little-story"
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                  >
                    {t("ourStory")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-a-list"
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                  >
                    {t("createList")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                  >
                    {t("login")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {/* Social icons */}
              <div className="flex flex-col gap-4">
                <Link
                  href="https://linkedin.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://facebook.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Image
                    src="/facebook.png"
                    alt="Facebook"
                    width={24}
                    height={24}
                  />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Image src="/share.png" alt="Share" width={24} height={24} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/Horizontal/Logo-Mysoue-Horizontal_2.png"
          alt={t("logoAlt")}
          width={5000}
          height={1276}
          className="w-[1200px] self-start"
        />
      </div>
    </footer>
  );
};

export default Footer2;
