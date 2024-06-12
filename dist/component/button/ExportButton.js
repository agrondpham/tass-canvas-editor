import React from "react";
const ExportButton = ({ currentFabricCanvas }) => {
    const exportCanvasAsJson = () => {
        if (currentFabricCanvas) {
            const abc = currentFabricCanvas;
            var json_data = JSON.stringify(abc.toDatalessJSON());
            console.log(json_data);
        }
    };
    return (React.createElement("div", { onClick: exportCanvasAsJson, className: "group relative flex justify-center rounded px-2 py-1.5" },
        React.createElement("i", { className: "fa-regular fa-file-export" })));
};
export default ExportButton;
