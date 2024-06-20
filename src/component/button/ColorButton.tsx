import React,{ useRef } from "react";

interface ColorButtonProps {
    currentColor: string
    changeColor: any
}
const ColorButton: React.FC<ColorButtonProps> = ({
    currentColor,
    changeColor
}) => {
    const colorInputRef = useRef<HTMLInputElement | null>(null);
    const triggerColorInput = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    };

    return (
        <div>
            <input type='color' ref={colorInputRef} value={currentColor} onChange={changeColor} style={{ width:0,height:0 }}></input>
            <i className='fa-regular fa-palette' onClick={triggerColorInput} ></i>
        </div>)
}
export default ColorButton;