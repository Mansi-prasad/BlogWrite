import { Link } from "react-router-dom";
import { Logo } from "../index";
const Footer = () => {
  return (
    <>
      <section className="relative overflow-hidden py-10 bg-indigo-300 border-t-2 border-t-black ">
        <div className="flex flex-row relative z-10 max-w-7xl px-4">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="md-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  & copy: Copyright 2023.All Rights Reserved by mn.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full text-left">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-600">
                COMPANY
              </h3>
              <ul className="text-left">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Press kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full text-left">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-600">
                SUPPORT
              </h3>
              <ul className="text-left">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Contact us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Customer support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full text-left">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-600">
                LEGALS
              </h3>
              <ul className="text-left">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Terms & Condition
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
