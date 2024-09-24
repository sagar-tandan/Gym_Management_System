import React, { useState, useEffect } from "react";
import logo from "../../assets/dfc.png";

const menuItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About us",
    href: "#about",
  },
  {
    label: "Programs",
    href: "#programs",
  },
  {
    label: "Testimonials",
    href: "#review",
  },

  {
    label: "Contact",
    href: "#contact",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 text-white ${
        isScrolled ? "backdrop-blur-sm shadow-sm " : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div
          className={`flex items-center justify-between ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          <div className="flex items-center">
            <a href="/" className="text-black font-bold text-lg">
              <img
                className={` ${
                  isScrolled ? "w-[60px] h-[55px]" : "w-[75px] h-[75px]"
                } object-cover transition-all duration-300`}
                src={logo}
                alt="logo"
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className=" hover:text-purple-600 px-3 py-2 rounded-md font-semibold font-nunito"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
