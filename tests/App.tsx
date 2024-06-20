import React, { useRef, useState } from 'react';
import CanvasEditor, { CanvasEditorRef } from '../src/index';

function App() {
    const textList = [
        {
          data: 'Happy Holiday',
          fontFamily: 'Deja Vu',
          fontSize: 36,
          fill: 'red',
          image: '/assets/images/happyholiday.png',
          type: 'text',
          editable: false
        },
        {
          data: 'Holiday in your heart',
          fontFamily: 'Time New Roman',
          fontSize: 24,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'text',
          editable: false
        },
        {
          data: 'student_name',
          fontFamily: 'Deja Vu',
          fontSize: 18,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'text',
          editable: true
        },
        {
          data: 'Happy Holiday',
          fontFamily: 'Deja Vu',
          fontSize: 15,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'textbox',
          editable: true
        },
      ]
      const fontList = [
        { fontName: 'Arial Narrow', fontFile: './assets/fonts/arial_narrow_7.ttf' },
        { fontName: 'Candy', fontFile: './assets/fonts/Candcu.ttf' },
        { fontName: 'Deja Vu', fontFile: './assets/fonts/vtks_deja_vu.ttf' },
        { fontName: 'Cabin', fontFile: './assets/fonts/Cabin-Medium.ttf' },
        { fontName: 'Lowvetica', fontFile: './assets/fonts/Lowvetica.ttf' },
        { fontName: 'Helvedding', fontFile: './assets/fonts/Helvedding-Beta.Otf' },
        { fontName: 'Helveticrap', fontFile: './assets/fonts/Helveticrap.ttf' },
        { fontName: 'Hagrid-Italic', fontFile: './assets/fonts/Hagrid-Italic-trial.ttf' },
        { fontName: 'Brig Maven', fontFile: './assets/fonts/Brig_Maven.ttf' },
        { fontName: 'Sansitype Script', fontFile: './assets/fonts/Sansitype_Script.otf' },
        { fontName: 'Master Of Break', fontFile: './assets/fonts/master_of_break.ttf' }
      ]
      const size = {width:1024,height:640}
      const canvasEditorRef = useRef<CanvasEditorRef>(null);
      const jsonData = `{"version":"5.3.0","objects":[{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":586.5,"top":308,"width":183.16,"height":40.68,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Deja Vu","fontWeight":"normal","fontSize":36,"text":"Happy Holiday","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"},{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":272.5,"top":474,"width":205.95,"height":27.12,"fill":"black","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Time New Roman","fontWeight":"normal","fontSize":24,"text":"Holiday in your heart","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"},{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":690.5,"top":182,"width":183.16,"height":40.68,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Deja Vu","fontWeight":"normal","fontSize":36,"text":"Happy Holiday","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}],"background":"white"}`
      const jsonData2 = `{"version":"5.3.0","objects":[{"type":"textbox","version":"5.3.0","originX":"left","originY":"top","left":194.83,"top":256.02,"width":90.63,"height":60.03,"fill":"black","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Calibri","fontWeight":"normal","fontSize":16,"text":"<Position Date (30.12.2023)>","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","minWidth":20,"splitByGrapheme":false}]}`
      
      const handleGetCount = () => {
        if (canvasEditorRef.current) {
          console.log(canvasEditorRef.current.exportToJson());
        }
      };
      const [canvasWidth, setCanvasWidth] = useState<number>(size.width);
      const [canvasHeight, setCanvasHeight] = useState<number>(size.height);
      const [data, setData] = useState<string>(jsonData);
      const handleSizeCount = () => {
        setCanvasWidth(640);
        setCanvasHeight(1024)
      };
      const handleCount = () => {
        setData(jsonData2)
      };
      const options= {
        id: 'tass-canvas-editor',
        fontList: fontList,
        textList: textList,
        mode: 'edit',
        size: {width:canvasWidth,height:canvasHeight},
        jsonData:data
      }
  return (
    <div className="min-h-screen bg-gray-100">
      <CanvasEditor ref={canvasEditorRef} options={options}/>
      {/* <CanvasEditor ref={canvasEditorRef} jsonData={jsonData} mode='preview'/> */}
      <button onClick={handleGetCount}>Click</button>
      <button onClick={handleSizeCount}>Click1</button>
      <button onClick={handleCount}>Click2</button>
    </div>
  );
}

export default App;
