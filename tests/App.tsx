import React, { useRef } from 'react';
import CanvasEditor, { CanvasEditorRef } from '../src/index';

function App() {
    const textList = [
        {
          data: 'Happy Holiday',
          fontFamily: 'Deja Vu',
          fontSize: 36,
          fill: 'red',
          image: '/assets/images/happyholiday.png',
          type: 'text'
        },
        {
          data: 'Holiday in your heart',
          fontFamily: 'Time New Roman',
          fontSize: 24,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'text'
        },
        {
          data: 'Happy Holiday',
          fontFamily: 'Deja Vu',
          fontSize: 18,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'text'
        },
        {
          data: 'Happy Holiday',
          fontFamily: 'Deja Vu',
          fontSize: 5,
          fill: 'black',
          image: '/assets/images/happyholiday.png',
          type: 'text'
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
      const size = {width:1024,heigh:640}
      const canvasEditorRef = useRef<CanvasEditorRef>(null);
  
      const handleGetCount = () => {
        if (canvasEditorRef.current) {
          console.log(canvasEditorRef.current.exportToJson());
        }
      };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-row">
      <CanvasEditor ref={canvasEditorRef} fontList={fontList} textList={textList} size={size} />
      <button onClick={handleGetCount}>Click</button>
    </div>
  );
}

export default App;
