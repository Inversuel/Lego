import React from "react";
import { Link } from "react-router-dom";

function App() {
  // h-screen flex justify-center items-center align-middle flex-col overflow-hidden
  return (
    <div className="h-screen w-screen flex flex-col justify-center align-middle items-center gap-10">
      <h1 className="text-4xl lg:text-6xl font-[Modak] uppercase text-center">
        lego minifigs mystery box <span className=" text-blue-500 animate-pulse">!</span>
      </h1>
      <Link to="/second-page" className="uppercase rounded-full text-xl bg-blue-500 py-3 px-10 lg:px-16 font-bold hover:scale-110">
          let's go
      </Link>
    </div>
  );
}

export default App;
