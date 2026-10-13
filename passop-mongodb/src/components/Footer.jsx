import React from "react";

const Footer = () => {
  return (
    <footer className="md:flex justify-center items-center gap-5 bg-purple-950 text-white">

      {/* Center of the screen */}
      <p className="text-center text-purple-300 text-sm md:p-2">
        © 2026 PassOP. All rights reserved.
      </p>

      {/* Right side */}
      <p className="flex justify-end items-center gap-1 text-purple-300 text-sm md:p-2 pr-5">
        Made with
        <img width={20} src="/icons/heart.png" alt="heart" />
        by CoderShubham
      </p>

    </footer>
  );
};

export default Footer;