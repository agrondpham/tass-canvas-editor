import React from 'react';

interface PopupSidebarprop {
    editingItem: fabric.IText | fabric.Image | null,
    currentFabricCanvas: fabric.Canvas | undefined,
    popupPosition: { x: number; y: number }
};
const PopupSidebar: React.FC<PopupSidebarprop> = ({
    editingItem,
    currentFabricCanvas,
    popupPosition,
}) => {

    const handleDelete = () => {
        if (editingItem) {
            currentFabricCanvas?.remove(editingItem);
            currentFabricCanvas?.renderAll();
        }
    }
    // const handleEdit = () => {
    //     if (editingItem) {
    //         if (editingItem.type === 'i-text') {
    //             const target = editingItem as fabric.IText;
    //             target.enterEditing();
    //             target.hiddenTextarea?.focus();

    //         }
    //     }
    // }
    return (
    <div className='rounded flex items-center shadow-lg border border-gray-200 text-gray-700'
        style={{
            position: 'fixed',
            left: popupPosition.x,
            top: popupPosition.y,
            backgroundColor: 'white',
            zIndex: 1000,
        }}
    >
        {/* <button
            className='p-1  bg-gray-400'
            onClick={handleEdit}>
            <i className="fa-regular fa-pen"></i>
        </button> */}
        
        <div
            className='bg-gray mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded'
            onClick={handleDelete}>
            <i className="fa-regular fa-trash mx-auto my-auto"></i>
        </div>
    </div>);
}
export default PopupSidebar;