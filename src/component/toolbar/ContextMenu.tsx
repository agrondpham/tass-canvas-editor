import React, { useState } from 'react';
type ContextMenuProps = {
    currentFabricCanvas: fabric.Canvas | undefined,
    x: number;
    y: number;
    show: boolean;
    onClose: () => void;
};
const ContextMenu: React.FC<ContextMenuProps> = ({ currentFabricCanvas, x, y, show, onClose }) => {
    const [clipboard, setClipboard] = useState<fabric.Object | null>(null);

    if (!show) return null;
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
                activeObject.clone((cloned: fabric.Object) => {
                    setClipboard(cloned);
                });
            }
        }
    };
    const handleDelete = () => {
        if (currentFabricCanvas) {
            const activeObject = currentFabricCanvas.getActiveObjects();
            if (activeObject) {
                activeObject.forEach((deleteObject: fabric.Object) => {
                    currentFabricCanvas?.remove(deleteObject);
                });
                currentFabricCanvas?.renderAll();
            }
        }
    };
    const handlePaste = () => {
        if (currentFabricCanvas && clipboard) {
            clipboard.clone((clonedObj: fabric.Object) => {
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
    return (
        <div
            className="absolute bg-white shadow-lg rounded-md w-[200px]"
            style={{ top: y, left: x }}
            onClick={onClose}
        >
            <ul className="p-2">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={item.action}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContextMenu;