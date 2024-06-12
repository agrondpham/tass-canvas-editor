import React from 'react';
;
const PopupSidebar = ({ editingItem, currentFabricCanvas, popupPosition, }) => {
    const handleDelete = () => {
        if (editingItem) {
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.remove(editingItem);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
        }
    };
    // const handleEdit = () => {
    //     if (editingItem) {
    //         if (editingItem.type === 'i-text') {
    //             const target = editingItem as fabric.IText;
    //             target.enterEditing();
    //             target.hiddenTextarea?.focus();
    //         }
    //     }
    // }
    return (React.createElement("div", { className: 'rounded flex items-center shadow-lg border border-gray-200 text-gray-700', style: {
            position: 'fixed',
            left: popupPosition.x,
            top: popupPosition.y,
            backgroundColor: 'white',
            zIndex: 1000,
        } },
        React.createElement("div", { className: 'bg-gray mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded', onClick: handleDelete },
            React.createElement("i", { className: "fa-regular fa-trash mx-auto my-auto" }))));
};
export default PopupSidebar;
