// components/Footer.js

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-2 px-4 md:px-8 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-extralight">MYSOUE</h1>
        </div>
        <div className="flex flex-row space-x-4 mb-4 md:mb-0">
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
            <div className="text-gray-600 hover:text-gray-900">
              <Image
                src="/linkedin.png"
                alt="LinkedIn"
                width={35}
                height={35}
              />
            </div>
          </Link>
          <Link href="https://facebook.com">
            <div className="text-gray-600 hover:text-gray-900">
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={35}
                height={35}
              />
            </div>
          </Link>
          <Link href="https://twitter.com">
            <div className="text-gray-600 hover:text-gray-900">
              <Image src="/share.png" alt="Share" width={35} height={35} />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
