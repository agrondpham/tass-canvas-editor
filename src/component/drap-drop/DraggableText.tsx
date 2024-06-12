import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';

interface DraggableTextProps {
  data: string,
  fontFamily: string,
  fontSize: number,
  fill: string,
  image: string,
  type: string
}

const DraggableText: React.FC<DraggableTextProps> = ({ data, fontFamily, fontSize, fill, image, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: { data, fontFamily, fontSize, fill, image, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
        <img className="h-8 w-auto" src={image} alt={data} />
      </div>
  );
};

export default DraggableText;

