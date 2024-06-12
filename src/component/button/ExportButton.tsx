import React from "react";

interface SaveToToolbarProps {
    currentFabricCanvas: fabric.Canvas | undefined,
}
const ExportButton: React.FC<SaveToToolbarProps> = ({
    currentFabricCanvas
}) => {
    const exportCanvasAsJson = () => {
        if (currentFabricCanvas) {
            const abc = currentFabricCanvas as fabric.Canvas
            var json_data = JSON.stringify(abc.toDatalessJSON()); 
            console.log(json_data);
        }
    };
    return (
        <div onClick={exportCanvasAsJson}
            className="group relative flex justify-center rounded px-2 py-1.5"
        >
            <i className="fa-regular fa-file-export"></i>
        </div>
    );
};

export default ExportButton;