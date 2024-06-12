import React from "react";
const SaveToImage = ({ currentFabricCanvas }) => {
    const exportCanvasAsImage = () => {
        if (currentFabricCanvas) {
            const abc = currentFabricCanvas;
            const dataURL = abc.toDataURL({
                format: 'png',
                quality: 1.0,
            });
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'canvas.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return (React.createElement("div", { onClick: exportCanvasAsImage, className: "group relative flex justify-center rounded px-2 py-1.5" },
        React.createElement("i", { className: "fa-regular fa-floppy-disk" })));
};
export default SaveToImage;
