import React from 'react';
import FabricCanvas from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import './index.css';
const CanvasEditor = ({ fontList, textList, imageList, jsonData }) => {
    return (React.createElement("div", { className: "bg-gray-500" },
        React.createElement(DragDropProvider, null,
            React.createElement("div", { className: 'flex flex-row' },
                React.createElement(FabricCanvas, { listFonts: fontList, sampleTexts: textList, sampleImages: imageList, initData: jsonData })))));
};
export default CanvasEditor;
