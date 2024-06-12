import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
const DraggableText = ({ data, fontFamily, fontSize, fill, image, type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TEXT,
        item: { data, fontFamily, fontSize, fill, image, type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (React.createElement("div", { className: "flex items-center", ref: drag },
        React.createElement("img", { className: "h-8 w-auto", src: image, alt: data })));
};
export default DraggableText;
