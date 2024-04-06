import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <header className="flex justify-between items-center border border-b text-white p-4">
        <h1 className="text-green-600 font-bold text-lg">{"Class Cast </>"}</h1>
        <button className="bg-white text-gray-800 py-2 px-4 rounded">
          Login
        </button>
      </header>
      {children}
    </>
  );
};

export default Header;
