import React from 'react';
import FabricCanvas from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import './index.css';

interface CanvasEditorProps {
  fontList?:any|[],
  textList?:any|[],
  imageList?:any|[],
  jsonData?:string
  size?:{width:number,heigh:number}
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({fontList = [] ,textList= [],imageList=[],jsonData= "",size={width:1280,heigh:720}}) => {
  
  return (
    <div>
      {/* <Header /> */}
      <DragDropProvider>
        <div className='flex flex-row'>
          <FabricCanvas listFonts={fontList} sampleTexts={textList} sampleImages={imageList} initData={jsonData} size={size}/>
        </div>
      </DragDropProvider>
    </div>
  );
}

export default CanvasEditor;