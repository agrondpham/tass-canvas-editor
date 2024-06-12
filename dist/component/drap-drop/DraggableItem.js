import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
const DraggableItem = ({ text, fontFamily, fontSize, fill, image }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TEXT,
        // item: { text, fontFamily, fontSize, fill,image },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (React.createElement("li", { className: "py-3 sm:py-4" },
        React.createElement("div", { className: "flex items-center", ref: drag },
            React.createElement("img", { className: "h-8 w-full", src: image, alt: text }))));
};
export default DraggableItem;
