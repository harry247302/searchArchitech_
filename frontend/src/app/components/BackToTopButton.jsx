"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          className="bg-primary cursor-pointer hover:bg-amber-950 hover:text-white"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            height: "50px",
            width: "50px",
            fontSize: "5px",
            borderRadius: "50%",
            zIndex: "9999999",
          }}
          onClick={scrollUp}
        >
          {/* <img src={keyboard_arrow_up} alt="up" /> */}
          <div className="flex items-center justify-center">
            <ArrowUp/>
          </div>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;