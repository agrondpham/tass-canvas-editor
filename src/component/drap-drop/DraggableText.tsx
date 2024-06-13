import React from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
import { TextItem } from '../common/SampleData';

// const DraggableText: React.FC<DraggableTextProps> = ({ data, fontFamily, fontSize, fill, type }) => {
const DraggableText: React.FC<TextItem> = (textItemInfo:TextItem) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: textItemInfo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
        {/* <div className={`  text-[${fill}] text-[${fontSize}px]`}>{data}</div> */}
        <div style={{
          fontFamily : textItemInfo.fontFamily,
          color: textItemInfo.fill,
          fontSize: textItemInfo.fontSize
          }}>{textItemInfo.data}</div>
        {/* <img className="h-8 w-auto" src={image} alt={data} /> */}
      </div>
  );
};

export default DraggableText;

