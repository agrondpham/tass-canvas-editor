import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FabricCanvas, { FabricCanvasRef } from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import { ImageItem, SampleFont, TextItem } from './component/common/SampleData';

// import './index.css';
export interface CanvasEditorRef {
  exportToJson: () => string;
}
interface CanvasEditorProps {
  id?: string,
  fontList?: SampleFont[] | [],
  textList?: TextItem[] | [],
  imageList?: ImageItem[] | [],
  jsonData?: string,
  mode?:string,
  size?: { width: number, height: number }
}

const CanvasEditor = forwardRef<CanvasEditorRef, CanvasEditorProps>(({
  id = "",
  fontList = [],
  textList = [],
  imageList = [],
  jsonData = "",
  mode = "edit",
  size = { width: 1280, height: 720 } }, ref) => {
  const fabricCanvasRef = useRef<FabricCanvasRef>(null);
  useImperativeHandle(ref, () => ({
    exportToJson() {
      if (fabricCanvasRef.current)
        return fabricCanvasRef.current.exportToJson()
      return ""
    }
  }));
  return (
    <div>
      {/* <Header /> */}
      <DragDropProvider>
        <div className='flex flex-row'>
          <FabricCanvas ref={fabricCanvasRef} listFonts={fontList} sampleTexts={textList} sampleImages={imageList} initData={jsonData} size={size} mode={mode} id={id}/>
        </div>
      </DragDropProvider>
    </div>
  )
})

export default CanvasEditor;