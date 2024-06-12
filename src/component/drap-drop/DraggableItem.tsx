import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';

interface DraggableItemProps {
  text: string,
  fontFamily: string,
  fontSize: number,
  fill: string,
  image: string
}

const DraggableItem: React.FC<DraggableItemProps> = ({ text,fontFamily,fontSize,fill,image }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    // item: { text, fontFamily, fontSize, fill,image },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li className="py-3 sm:py-4" >
      <div className="flex items-center" ref={drag}>
          <img className="h-8 w-full" src={image} alt={text} />
      </div>
    </li>
  );
};

export default DraggableItem;
