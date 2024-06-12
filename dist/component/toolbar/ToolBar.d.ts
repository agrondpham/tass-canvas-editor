import React from 'react';
import SampleText from '../common/SampleText';
import SampleImage from '../common/SampleImage';
interface TextEditorProps {
    editingItem: fabric.IText | fabric.Image | null;
    currentFabricCanvas: fabric.Canvas | undefined;
    fonts: string[] | undefined;
    sampleTexts: SampleText[] | undefined;
    sampleImages: SampleImage[] | undefined;
}
declare const Toolbar: React.FC<TextEditorProps>;
export default Toolbar;
