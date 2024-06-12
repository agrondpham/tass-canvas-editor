import React, { useRef } from "react";
import { fabric } from 'fabric';
const UploadImageButton = ({ currentFabricCanvas }) => {
    const uploadImageInputRef = useRef(null);
    const handleImageUpload = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && currentFabricCanvas) {
            const reader = new FileReader();
            reader.onload = (f) => {
                var _a;
                const data = (_a = f.target) === null || _a === void 0 ? void 0 : _a.result;
                fabric.Image.fromURL(data, (img) => {
                    currentFabricCanvas.add(img);
                    currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
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
    return (React.createElement("div", { onClick: triggerColorInput, className: "group relative flex justify-center rounded px-2 py-1.5" },
        React.createElement("input", { className: "hidden", type: "file", accept: "image/*", ref: uploadImageInputRef, onChange: handleImageUpload }),
        React.createElement("i", { className: "fa-regular fa-upload" })));
};
export default UploadImageButton;
