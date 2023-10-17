import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="absolute z-50 top-0 h-20 w-full border-b border-gray-800 bg-gray-700/40 py-7 text-gray-900">
      <div
        className="flex-between mx-auto w-full max-w-screen-2xl px-6 xs:px-8 sm:px-16
      "
      >
        <div className="hover:bg-gray-800/40 p-1 rounded-lg block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            className="w-6 h-6 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        <ul className="flex-center gap-x-3 max-md:hidden md:gap-x-10">
          <li className="body-text !font-bold">
            <a
              className="text-slate-100 !font-bold "
              rel="noopener noreferrer"
              href="/"
            >
              Aikido-Dojo Jiyukan Karlsruhe e.V.
            </a>
          </li>
          <li className="body-text !font-semibold text-gray-200 hover:underline">
            <a
              href="/#aboutus"
              className="font-semibold"
              rel="noopener noreferrer"
            >
              Über Uns
            </a>
          </li>
          <li className="body-text !font-semibold text-gray-200">
            {/* <Link href="" target="_blank"> */}
            <a
              href="/was-ist-aikido"
              className="font-semibold hover:underline"
              rel="noopener noreferrer"
            >
              Was Ist Aikido
            </a>

            {/* </Link> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
