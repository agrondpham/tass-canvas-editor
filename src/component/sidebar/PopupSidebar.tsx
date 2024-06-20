import React, { useEffect, useState } from 'react';

interface PopupSidebarprop {
    editingItem: fabric.Object | null,
    currentFabricCanvas: fabric.Canvas | undefined,
    popupPosition: { x: number; y: number }
};
const PopupSidebar: React.FC<PopupSidebarprop> = ({
    editingItem,
    currentFabricCanvas,
    popupPosition,
}) => {
    const [isLock, setIsLock] = useState(editingItem?.lockMovementX || false)

    const handleDelete = () => {
        if (editingItem) {
            currentFabricCanvas?.remove(editingItem);
            currentFabricCanvas?.renderAll();
        }
    }

    const objectLock = (status: boolean) => {
        if(editingItem) {
            editingItem.lockMovementX = status
            editingItem.lockMovementY = status
            editingItem.lockSkewingX  = status
            editingItem.lockSkewingY  = status
            editingItem.lockRotation  = status
            editingItem.lockScalingX  = status
            editingItem.lockScalingY  = status
        }
    }

    const handleLock = () => {
        if (editingItem) {
            objectLock(!isLock)
            setIsLock(!isLock)
        }
    }

    useEffect(() => {
        if(editingItem) {
            const tempLock = editingItem?.lockMovementX || false
            objectLock(tempLock)
            setIsLock(tempLock)
        }
    }, [editingItem])

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
                className='bg-gray w-9 h-9 cursor-pointer select-none hover:text-red-500 flex rounded'
                onClick={handleDelete}>
                <i className="fa-regular fa-trash mx-auto my-auto"></i>
            </div>
            <div
                className='bg-gray w-9 h-9 cursor-pointer select-none hover:text-blue-500 flex rounded'
                onClick={handleLock}>
                <i className={`fa-light mx-auto my-auto ${!isLock ? 'fa-lock-open' : 'fa-lock'}`} />
            </div>
        </div>
    );
}
export default PopupSidebar
