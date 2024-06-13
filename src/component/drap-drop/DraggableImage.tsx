import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
import { ImageItem } from '../common/SampleData';

const DraggableImage: React.FC<ImageItem> = (imageItemInfo:ImageItem) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: imageItemInfo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
        <img className="h-8 w-auto" src={imageItemInfo.image} alt={imageItemInfo.data} />
      </div>
  );
};

export default DraggableImage;

