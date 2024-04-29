// components/Footer.js
import Image from "next/image";
import Link from "next/link";

const Footer2 = () => {
  return (
    <footer className="bg-white pt-12 px-4 md:px-8  bottom-0 w-full border-t-2 border-gray-300 rounded-t-[50px]  ">
      <div className="w-full flex flex-col justify-between items-center">
        <div className="w-full  flex flex-row justify-between items-center gap-10">
          {/* Branding and slogan */}

          <div className="flex flex-col mb-auto md:flex-row md:items-center gap-2">
            <p className="text-3xl font-extralight md:ml-4 uppercase tracking-widest">
              WE MAKE{" "}
            </p>
            <p className="text-3xl font-simplemichael font-thin">
              {" "}
              gifting simple.
            </p>
          </div>
          <div className="flex flex-row gap-8">
            {/* Footer Content*/}
            <div className="flex flex-col">
              <h5 className="text-base sm:text-lg font-semibold">Content</h5>
              <ul className="space-y-1">
                <li>
                  <a
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                    href="/our-little-story"
                  >
                    Our story
                  </a>
                </li>
                <li>
                  <a
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                    href="/create-a-list"
                  >
                    Create a list
                  </a>
                </li>
                <li>
                  <a
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                {/* <li>
                  <a
                    className="text-xs sm:text-sm text-gray-600 hover:text-gray-900"
                    href="#"
                  >
                    About us
                  </a>
                </li>
                 */}
              </ul>
            </div>

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
        <Image
          height={1276}
          width={5000}
          src="/Horizontal/Logo-Mysoue-Horizontal_2.png"
          alt="Symbol"
          className=" w-[1200px] self-start "
        />
      </div>
    </footer>
  );
};

export default Footer2;
