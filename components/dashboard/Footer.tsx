// components/Footer.js

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-2 px-4 md:px-8 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto flex flex-col  justify-between items-center">
        <div className=" md:mb-0">
          <h1 className="text-2xl font-extralight">MYSOUE</h1>
        </div>
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="text-xs sm:text-base flex flex-row space-x-4  md:mb-0">
            <Link href="/terms">
              <div className="text-gray-600 hover:text-gray-900">Terms</div>
            </Link>
            <Link href="/privacy">
              <div className="text-gray-600 hover:text-gray-900">Privacy</div>
            </Link>
            <Link href="/cookies">
              <div className="text-gray-600 hover:text-gray-900">Cookies</div>
            </Link>
          </div>
          <div className="flex flex-row space-x-4">
            <Link href="https://linkedin.com">
              <div className="text-gray-600 hover:text-gray-900 w-6 h-6 sm:w-9 sm:h-9">
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={36}
                  height={36}
                />
              </div>
            </Link>
            <Link href="https://facebook.com">
              <div className="text-gray-600 hover:text-gray-900 w-6 h-6 sm:w-9 sm:h-9">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={36}
                  height={36}
                />
              </div>
            </Link>
            <Link href="https://twitter.com">
              <div className="text-gray-600 hover:text-gray-900 w-6 h-6 sm:w-9 sm:h-9">
                <Image src="/share.png" alt="Share" width={36} height={36} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
