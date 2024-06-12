import React from 'react';
import SampleText from '../common/SampleText';
import SampleImage from '../common/SampleImage';
interface DetailSidebarProp {
    type: string;
    sampleTexts: SampleText[] | undefined;
    sampleImages: SampleImage[] | undefined;
}
declare const DetailSidebar: React.FC<DetailSidebarProp>;
export default DetailSidebar;
