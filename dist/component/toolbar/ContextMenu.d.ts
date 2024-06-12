import React from 'react';
type ContextMenuProps = {
    currentFabricCanvas: fabric.Canvas | undefined;
    x: number;
    y: number;
    show: boolean;
    onClose: () => void;
};
declare const ContextMenu: React.FC<ContextMenuProps>;
export default ContextMenu;
