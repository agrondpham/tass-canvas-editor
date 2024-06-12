import React,{ useRef } from "react";
import { fabric } from 'fabric';

interface SaveToToolbarProps {
    currentFabricCanvas: fabric.Canvas | undefined,
}
const UploadImageButton: React.FC<SaveToToolbarProps> = ({
    currentFabricCanvas
}) => {
    const uploadImageInputRef = useRef<HTMLInputElement | null>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && currentFabricCanvas) {
            const reader = new FileReader();
            reader.onload = (f) => {
                const data = f.target?.result as string;
                fabric.Image.fromURL(data, (img) => {
                    currentFabricCanvas.add(img);
                    currentFabricCanvas?.renderAll();
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const triggerColorInput = () => {
        if (uploadImageInputRef.current) {
            uploadImageInputRef.current.click();
        }
    };
    return (
        <div onClick={triggerColorInput}
            className="group relative flex justify-center rounded px-2 py-1.5"
        >
            <input className="hidden" type="file" accept="image/*" ref={uploadImageInputRef} onChange={handleImageUpload} />
            <i className="fa-regular fa-upload"></i>
        </div>
    );
};

export default UploadImageButton;