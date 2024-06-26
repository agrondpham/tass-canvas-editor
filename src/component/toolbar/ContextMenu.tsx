import React from 'react';
import { deleteSelectedObjects, parseSelectedObjects } from '../common/FuncCopyParseDelete';
import { Object } from 'fabric/fabric-impl';
type ContextMenuProps = {
    currentFabricCanvas: fabric.Canvas | undefined,
    x: number;
    y: number;
    show: boolean;
    onClose: () => void;
    clipboard: fabric.Object[] | undefined
    setClipboard: React.Dispatch<React.SetStateAction<fabric.Object[] | undefined>>
};
const ContextMenu: React.FC<ContextMenuProps> = ({ currentFabricCanvas, x, y, show, onClose, clipboard, setClipboard }) => {
    // const [clipboard, setClipboard] = useState<fabric.Object | null>(null);

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
            let dataCloned: fabric.Object[] = []
            currentFabricCanvas.getActiveObjects().forEach(item => {
                item.clone((cloned: Object | undefined) => cloned && dataCloned.push(cloned))
            })
            setClipboard(dataCloned)
        }
    };
    const handleDelete = () => {
        if (currentFabricCanvas) {
            deleteSelectedObjects(currentFabricCanvas)
        }
    };
    const handlePaste = () => {
        if (currentFabricCanvas && clipboard) {
            parseSelectedObjects(clipboard, currentFabricCanvas)
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