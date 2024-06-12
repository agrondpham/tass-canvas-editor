import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
const DraggableImage = ({ data, type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType.TEXT,
        item: { data, type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (React.createElement("div", { className: "flex items-center", ref: drag },
        React.createElement("img", { className: "h-8 w-auto", src: data })));
};
export default DraggableImage;
