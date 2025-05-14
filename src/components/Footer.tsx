
import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-bistro-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 font-['Poppins']">
                Taste of Home
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Connecting food lovers with talented home chefs for authentic, homemade meals delivered to your doorstep.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/customer" className="text-gray-600 hover:text-bistro-600">
                  For Customers
                </Link>
              </li>
              <li>
                <Link to="/chef" className="text-gray-600 hover:text-bistro-600">
                  For Chefs
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-bistro-600">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-bistro-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:support@tasteofhome.com" className="text-gray-600 hover:text-bistro-600">
                  support@tasteofhome.com
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="text-gray-600 hover:text-bistro-600">
                  +1 (123) 456-7890
                </a>
              </li>
              <li>
                <address className="text-gray-600 not-italic">
                  123 Food Street<br />
                  Culinary City, FL 12345
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Taste of Home Bistro System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
