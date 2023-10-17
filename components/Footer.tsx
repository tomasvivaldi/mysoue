// components/Footer.js
import Image from "next/image"; // You might need to adjust the import path depending on your file structure.

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 flex flex-col x-paddings">
      <div
        className="max-w-7xl mx-auto flex flex-col sm:flex-row 
      justify-around w-full sm:justify-between items-center gap-8 sm:gap-12"
      >
        {/* Federation Membership Info */}
        <div className=" flex items-center flex-col gap-4 max-w-[150px] text-center">
          <Image
            src="/logo.png"
            alt="Logo of Aikido Federation Germany"
            width={256}
            height={256}
            className="w-[100px] rounded-full mx-auto"
          />
          <p className="text-xs sm:text-sm">
            Aikido-Dojo Jiyukan Karlsruhe e.V.
          </p>
        </div>
        <div className="ml-44 self-center flex items-center flex-col gap-4 max-w-[250px] text-center">
          <Image
            src="/aikido-federation.webp" // Adjust the path to your image
            alt="Logo of Aikido Federation Germany"
            width={368}
            height={143}
            className="w-[200px] rounded-lg mx-auto"
          />
          <p className="text-xs">
            Das Dojo ist Mitglied in der Aikido Föderation Deutschland.
          </p>
        </div>
        <div className="flex flex-row gap-8 ">
          {/* Additional footer content, e.g. links, contact details */}
          <div className="">
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="text-xs sm:text-sm space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/#aboutus" className="hover:underline">
                  Über uns
                </a>
              </li>
              <li>
                <a href="/was-ist-aikido" className="hover:underline">
                  Was ist Aikido
                </a>
              </li>
            </ul>
          </div>
          {/* Address */}
          <div className="text-sm flex flex-col sm:items-start px-auto mx-auto">
            <h4 className="font-bold text-base mb-2">Unsere Adresse</h4>
            <div className="flex flex-col gap-1 justify-between text-xs sm:text-sm ">
              <p>Aikido-Dojo Jiyukan Karlsruhe e.V.</p>
              <p>Straßenname 123</p>
              <p>76131 Karlsruhe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Federation Membership Info */}

      {/* Copyright Information */}
      <div className="text-center text-sm mt-2 text-slate-400">
        © {new Date().getFullYear()} Aikido-Dojo Jiyukan Karlsruhe e.V. Alle
        Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;
