import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FabricCanvas, { FabricCanvasRef } from './component/canvas-editor/FabricCanvas';
import DragDropProvider from './component/drap-drop/DndProvider';
import { ImageItem, SampleFont, TextItem } from './component/common/SampleData';

// import './index.css';
export interface CanvasEditorRef {
  exportToJson: () => string;
}
interface CanvasEditorProps {
  options: {
    id?: string,
    fontList?: SampleFont[],
    textList?: TextItem[],
    imageList?: ImageItem[],
    jsonData?: string,
    mode: string,
    size: { width: number, height: number },
    mainClassName?:string
  }
}

const CanvasEditor = forwardRef<CanvasEditorRef, CanvasEditorProps>(({options}, ref) => {
  const fabricCanvasRef = useRef<FabricCanvasRef>(null);
  useImperativeHandle(ref, () => ({
    exportToJson() {
      if (fabricCanvasRef.current)
        return fabricCanvasRef.current.exportToJson()
      return ""
    }
  }));
  return (
    <>
      {/* <Header /> */}
      <DragDropProvider>
          <FabricCanvas ref={fabricCanvasRef} 
            listFonts={options.fontList} 
            sampleTexts={options.textList} 
            sampleImages={options.imageList} 
            initData={options.jsonData} 
            size={options.size} 
            mode={options.mode} 
            id={options.id}
            mainClassName={options.mainClassName} />
      </DragDropProvider>
    </>
  )
})

export default CanvasEditor;