import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StartRatingProps {
  noOfStars?: number;
}

export const StartRating: React.FC<StartRatingProps> = ({ noOfStars }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  console.log(rating, "Rating");
  console.log(hover, "HOver");
  

  const handleClick = (getCurrentIndex: number) => {
    setRating(getCurrentIndex);
  };

  const handleMouseEnter = (getCurrentIndex: number) => {
    setHover(getCurrentIndex);
  };

  const hanldeMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="start-rating">
      {Array(noOfStars)
        .fill(0)
        .map((_, index) => {
          index+=1;
          return (
            <FaStar
              key={index}
              size={40}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={hanldeMouseLeave}
              color={ index <= (hover || rating) ? "yellow" : "black" }
              style={{ cursor: "pointer" }}
            />
          );
        })}
    </div>
  );
};
