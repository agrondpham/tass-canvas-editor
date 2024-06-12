import React from 'react';
import SampleText from '../common/SampleText';
import SampleFont from '../common/SampleFont';
import SampleImage from '../common/SampleImage';
interface FabricCanvasProp {
    initData: string;
    sampleTexts: SampleText[];
    sampleImages: SampleImage[];
    listFonts: SampleFont[];
}
declare const FabricCanvas: React.FC<FabricCanvasProp>;
export default FabricCanvas;
