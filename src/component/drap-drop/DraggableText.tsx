import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';

interface DraggableTextProps {
  data: string,
  fontFamily: string,
  fontSize: number,
  fill: string,
  type: string
}

const DraggableText: React.FC<DraggableTextProps> = ({ data, fontFamily, fontSize, fill, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: { data, fontFamily, fontSize, fill, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
        {/* <div className={`  text-[${fill}] text-[${fontSize}px]`}>{data}</div> */}
        <div style={{
          fontFamily : fontFamily,
          color: fill,
          fontSize: fontSize
          }}>{data}</div>
        {/* <img className="h-8 w-auto" src={image} alt={data} /> */}
      </div>
  );
};

export default DraggableText;

