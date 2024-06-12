import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';

interface DraggableImageProps {
  data: string,
  type: string
}

const DraggableImage: React.FC<DraggableImageProps> = ({ data,type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: { data ,type},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
        <img className="h-8 w-auto" src={data} />
      </div>
  );
};

export default DraggableImage;

