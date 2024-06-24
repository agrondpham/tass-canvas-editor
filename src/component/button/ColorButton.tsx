import React,{ useRef } from "react";

interface ColorButtonProps {
    currentColor: string
    changeColor: any
    changeColorCompleted?: any
}
const ColorButton: React.FC<ColorButtonProps> = ({
    currentColor,
    changeColor,
    changeColorCompleted
}) => {
    const colorInputRef = useRef<HTMLInputElement | null>(null);
    const triggerColorInput = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
            colorInputRef.current.onchange = (e: any) => changeColorCompleted()
        }
    };

    return (
        <div onClick={triggerColorInput}>
            <input type='color' ref={colorInputRef} value={currentColor} onChange={changeColor} style={{ width:0, height:0 }}></input>
            <i className='fa-regular fa-palette' ></i>
        </div>)
}
export default ColorButton;