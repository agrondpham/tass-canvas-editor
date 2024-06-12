import React from 'react';
interface DraggableItemProps {
    text: string;
    fontFamily: string;
    fontSize: number;
    fill: string;
    image: string;
}
declare const DraggableItem: React.FC<DraggableItemProps>;
export default DraggableItem;
