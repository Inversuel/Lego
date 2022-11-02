import React from "react";
import legoLogo from "../../assets/LEGO_logo.png";
import question from "../../assets/question.png";

const Layouts: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="">
        <img
          src={legoLogo}
          alt="lego logo"
          className="w-52 h-52 hidden md:absolute rotate-45 opacity-5 top-16 right-28 -z-10 bg-cover"
        />
        <img
          src={question}
          alt="lego logo"
          className="w-80 hidden md:absolute rotate-12 opacity-10 top-16 left-28 -z-10 bg-cover"
        />
        <img
          src={question}
          alt="lego logo"
          className="w-80 hidden md:absolute rotate-[60deg] opacity-10 bottom-24 right-24 -z-10 bg-cover"
        />
      {children}
    </div>
  );
};

export default Layouts;
