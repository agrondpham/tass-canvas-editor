import React from 'react';
interface PopupSidebarprop {
    editingItem: fabric.IText | fabric.Image | null;
    currentFabricCanvas: fabric.Canvas | undefined;
    popupPosition: {
        x: number;
        y: number;
    };
}
declare const PopupSidebar: React.FC<PopupSidebarprop>;
export default PopupSidebar;
