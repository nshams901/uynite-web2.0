import { useState, useEffect } from 'react';

function ToggleButton({ handleFoodCreate }) {
  const [isOn, setIsOn] = useState(true);

  const handleClick = () => {
    setIsOn(prevState => !prevState);
    handleFoodCreate(!isOn)
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${
        isOn ? 'bg-[#649B8E]' : 'bg-gray-300'
      } relative inline-flex items-center rounded-full w-11 h-6 focus:outline-none`}
    >
      <span
        className={`${
          isOn ? 'translate-x-6' : 'translate-x-0'
        } inline-block w-5 h-5 transform bg-white rounded-full`}
      />
    </button>
  );
}

export default ToggleButton;
