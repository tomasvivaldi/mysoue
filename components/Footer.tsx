// components/Footer.js
import Image from "next/image"; // You might need to adjust the import path depending on your file structure.
import { JSX, SVGProps } from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-8 x-paddings">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-6">
              Customer service
            </h5>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Add a review
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Information
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-6">Social</h5>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Tiktok
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-6">Blog</h5>
            <ul className="space-y-4">
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Id maecenas
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Id orci
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Magna ultricies
                </a>
              </li>
              <li>
                <a
                  className="text-sm sm:text-base text-gray-600 hover:text-gray-900"
                  href="#"
                >
                  Quis risus
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <h5 className="text-base sm:text-lg font-semibold mb-6">
              Subscribe
            </h5>
            <div className="flex flex-col space-y-4 w-full">
              <div className="flex flex-row  relative">
                <input
                  className="border p-2  rounded-lg rounded-bl-lg w-full"
                  placeholder="Email address"
                  type="email"
                />
                <button className=" absolute inset-y-0 right-0 border-t border-r border-b border-gray-200 bg-blue-600 hover:bg-blue-700 text-white w-12 rounded-tr-lg rounded-br-lg">{`>`}</button>
              </div>
              <p className="text-sm sm:text-sm text-gray-600">
                Stay updated with our latest news and offers! Subscribe to our
                newsletter now and never miss out. Your insights await. Join us!
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl font-light">MYSOUE</span>
            <div className="flex mt-4 md:mt-0 space-x-6">
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Terms
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Privacy
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                Cookies
              </a>
            </div>
            <div className="flex mt-4 md:mt-0 space-x-4">
              <a className="text-gray-600 hover:text-gray-900" href="#">
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a className="text-gray-600 hover:text-gray-900" href="#">
                <TwitterIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
export default Footer;
