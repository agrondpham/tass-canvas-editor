import React from 'react';
import FabricCanvas from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import './index.css';

interface CanvasEditorProps {
  fontList:[],
  textList:[],
  imageList:[],
  jsonData:string
}

const CanvasEditor: React.FC<CanvasEditorProps> = ({fontList,textList,imageList,jsonData}) => {
  
  return (
    <div>
      {/* <Header /> */}
      <DragDropProvider>
        <div className='flex flex-row'>
          <FabricCanvas listFonts={fontList} sampleTexts={textList} sampleImages={imageList} initData={jsonData} />
        </div>
      </DragDropProvider>
    </div>
  );
}

export default CanvasEditor;