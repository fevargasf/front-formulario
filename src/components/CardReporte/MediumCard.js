import React from "react";


const MediumCard = ({ img, title }) => {
  return (
    <div
      className="cursor-pointer hover:scale-105 transform transition 
    duration-300 ease-out"
    >
      <div className="relative h-60 w-80">
        img
      </div>
      <h3 className="text-xl mt-3 text-gray-700 font-semibold">{title}</h3>
    </div>
  );
};
export default MediumCard;
