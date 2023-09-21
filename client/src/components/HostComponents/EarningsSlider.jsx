// src/components/EarningsSlider.js
import React, { useState } from "react";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { useMediaQuery } from "react-responsive";

const EarningsSlider = () => {
  const [earning, setEarning] = useState(17500);
  const [day,setDay] = useState(7) 

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleSliderChange = (value) => {
    setEarning(2500 * value);
    setDay(value)
  };

  const handleTooltipVisibleChange = (visible) => {
    if (!visible) {
      setEarning(Math.round(earning / 50) * 50);
    }
  };


  return (
    <div className="flex justify-center">
      <div className="p-6 bg-white rounded-lg">
        <h2 className="p-6 text-lg font-bold mb-4">Estimated Earnings</h2>
        <Slider
          min={1}
          max={7}
          step={1}
          defaultValue={earning}
          onChange={handleSliderChange}
          tipProps={{
            overlay: <Tooltip visible={isMobile ? "hover" : "always"} />,
            onVisibleChange: handleTooltipVisibleChange,
          }}
        />
        <div className="mt-4 text-center">
          <p className="p-5 text-black">
            Your estimated earnings: ₹{earning} for {day} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsSlider;
