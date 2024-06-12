import React from "react";
interface SaveToToolbarProps {
    currentFabricCanvas: fabric.Canvas | undefined,
}
const SaveToImage: React.FC<SaveToToolbarProps> = ({
    currentFabricCanvas
}) => {
    const exportCanvasAsImage = () => {
        if (currentFabricCanvas) {
            const abc = currentFabricCanvas as fabric.Canvas
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
    return (
        <div onClick={exportCanvasAsImage}
            className="group relative flex justify-center rounded px-2 py-1.5"
        >
            <i className="fa-regular fa-floppy-disk"></i>
        </div>
    );
};

export default SaveToImage;