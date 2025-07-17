import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <HomeIcon className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Tolet4me</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted partner in finding the perfect rental property. We connect tenants with property owners across India.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <PhoneIcon className="h-5 w-5" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <EnvelopeIcon className="h-5 w-5" />
                <span>info@tolet4me.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/post-property" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Post Property
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Tolet4me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;