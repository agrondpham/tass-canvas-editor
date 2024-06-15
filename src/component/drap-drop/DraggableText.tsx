import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import ItemType from '../common/ItemType';
import { TextItem } from '../common/SampleData';

interface DraggableTextProps {
  item:TextItem,
  setSelectedItem:(textitem:TextItem)=>void
  setShowDropdown:(type:string)=>void
}
// const DraggableText: React.FC<DraggableTextProps> = ({ data, fontFamily, fontSize, fill, type }) => {
const DraggableText: React.FC<DraggableTextProps> = (textItemInfo:DraggableTextProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TEXT,
    item: textItemInfo.item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
      <div className="flex items-center" ref={drag}>
      {/* <div className="flex items-center"> */}
        {/* <div className={`  text-[${fill}] text-[${fontSize}px]`}>{data}</div> */}
        <div onClick={() => {textItemInfo.setSelectedItem(textItemInfo.item); textItemInfo.setShowDropdown('')}} style={{
          fontFamily : textItemInfo.item.fontFamily,
          color: textItemInfo.item.fill,
          fontSize: textItemInfo.item.fontSize
          }}>{textItemInfo.item.data}</div>
        {/* <img className="h-8 w-auto" src={image} alt={data} /> */}
      </div>
  );
};

export default DraggableText;

