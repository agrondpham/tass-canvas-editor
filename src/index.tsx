import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FabricCanvas, { FabricCanvasRef } from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import { ImageItem, SampleFont, TextItem } from './component/common/SampleData';

// import './index.css';
export interface CanvasEditorRef {
  exportToJson: () => string;
}
interface CanvasEditorProps {
  fontList?: SampleFont[] | [],
  textList?: TextItem[] | [],
  imageList?: ImageItem[] | [],
  jsonData?: string
  size?: { width: number, heigh: number }
}

const CanvasEditor = forwardRef<CanvasEditorRef, CanvasEditorProps>(({
  fontList = [],
  textList = [],
  imageList = [],
  jsonData = "",
  size = { width: 1280, heigh: 720 } }, ref) => {
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
          <FabricCanvas ref={fabricCanvasRef} listFonts={fontList} sampleTexts={textList} sampleImages={imageList} initData={jsonData} size={size} />
        </div>
      </DragDropProvider>
    </div>
  )
})

export default CanvasEditor;