import React, { useState } from 'react';
const ContextMenu = ({ currentFabricCanvas, x, y, show, onClose }) => {
    const [clipboard, setClipboard] = useState(null);
    if (!show)
        return null;
    const bringToForward = () => {
        if (currentFabricCanvas) {
            const activeObject = currentFabricCanvas.getActiveObject();
            if (activeObject) {
                currentFabricCanvas.bringForward(activeObject);
            }
            currentFabricCanvas.renderAll();
        }
    };
    const bringToFront = () => {
        if (currentFabricCanvas) {
            const activeObject = currentFabricCanvas.getActiveObject();
            if (activeObject) {
                currentFabricCanvas.bringToFront(activeObject);
            }
            currentFabricCanvas.renderAll();
        }
    };
    const handleCopy = () => {
        if (currentFabricCanvas) {
            const activeObject = currentFabricCanvas.getActiveObject();
            if (activeObject) {
                activeObject.clone((cloned) => {
                    setClipboard(cloned);
                });
            }
        }
    };
    const handleDelete = () => {
        if (currentFabricCanvas) {
            const activeObject = currentFabricCanvas.getActiveObjects();
            if (activeObject) {
                activeObject.forEach((deleteObject) => {
                    currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.remove(deleteObject);
                });
                currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
            }
        }
    };
    const handlePaste = () => {
        if (currentFabricCanvas && clipboard) {
            clipboard.clone((clonedObj) => {
                currentFabricCanvas.discardActiveObject();
                clonedObj.set({
                    left: x,
                    top: y,
                    evented: true,
                });
                // if (clonedObj.type === 'activeSelection') {
                //   // Active selection needs a reference to the canvas.
                //   clonedObj.canvas = currentFabricCanvas;
                //   clonedObj.forEachObject((obj: fabric.Object) => {
                //     currentFabricCanvas.add(obj);
                //   });
                //   clonedObj.setCoords();
                // } else {
                currentFabricCanvas.add(clonedObj);
                // }
                setClipboard(clonedObj);
                currentFabricCanvas.setActiveObject(clonedObj);
                currentFabricCanvas.requestRenderAll();
            });
        }
    };
    const menuItems = [
        {
            label: 'Copy',
            action: handleCopy,
        },
        {
            label: 'Paste',
            action: handlePaste,
        },
        {
            label: 'Bring to Front',
            action: bringToFront,
        },
        {
            label: 'Bring Forward',
            action: bringToForward,
        },
        {
            label: 'Delete',
            action: handleDelete,
        },
        // Add more items here as needed
    ];
    return (React.createElement("div", { className: "absolute bg-white shadow-lg rounded-md w-[200px]", style: { top: y, left: x }, onClick: onClose },
        React.createElement("ul", { className: "p-2" }, menuItems.map((item, index) => (React.createElement("li", { key: index, className: "p-2 hover:bg-gray-200 cursor-pointer", onClick: item.action }, item.label))))));
};
export default ContextMenu;
