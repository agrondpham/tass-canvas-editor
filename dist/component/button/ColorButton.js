import React, { useRef } from "react";
const ColorButton = ({ currentColor, changeColor }) => {
    const colorInputRef = useRef(null);
    const triggerColorInput = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    };
    return (React.createElement("div", null,
        React.createElement("input", { type: 'color', ref: colorInputRef, value: currentColor, onChange: changeColor, style: { width: 0, height: 0 } }),
        React.createElement("i", { className: 'fa-regular fa-palette', onClick: triggerColorInput })));
};
export default ColorButton;
