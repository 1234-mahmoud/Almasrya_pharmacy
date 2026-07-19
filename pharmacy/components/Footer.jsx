import React from "react";
import pharma from "../src/assets/pharmacy.svg";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "react-icons/ri";
import { Link } from "react-router";
export default function Footer() {
  const quickLinks = [
    {title:"Home",link:'/'},
    {title:"Login",link:'/login'},
    {title:"About Us",link:'/'},
    {title:"Services",link:'/'}];

  const services = [
    "Prescription Medicines",
    "Health Supplements",
    "Medical Equipment",
    "Health Consultation",
  ];

  const contactData = [
    {
      icon: RiPhoneLine,
      text: "+1 (555) 123-4567",
    },
    {
      icon: RiMailLine,
      text: "info@pharmacare.com",
    },
    {
      icon: RiMapPinLine,
      text: "123 Health St, Medical City",
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="relative max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3">
            <img src={pharma} alt="Almasrya logo" className="w-10" />
            <span className="text-xl font-semibold">Almasrya</span>
          </div>

          <p className="text-sm mt-5 text-gray-300">
            Your trusted pharmacy management system. Quality care, every time.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick Links">
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {quickLinks.map((item, i) => (
              <li key={i}>
                <Link to={item.link} className="hover:text-white transition">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Services">
          <h3 className="font-bold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {services.map((item, i) => (
              <li key={i}>
               
                  {item}
               
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <address className="not-italic">
          <h3 className="font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {contactData.map((item, i) => {
              const Icon = item.icon;

              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon className="text-gray-300" />
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </address>

        {/* Divider */}
        <hr
          className={`h-px bg-gray-500 border-0 w-full absolute left-0 bottom-0`}
        />
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-gray-400">
        © {new Date().getFullYear()} All rights reserved
      </div>
    </footer>
  );
}
