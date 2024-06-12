import React from 'react';
import DraggableText from '../drap-drop/DraggableText';
import SampleText from '../common/SampleText';
import SampleImage from '../common/SampleImage';
import DraggableImage from '../drap-drop/DraggableImage';

interface DetailSidebarProp {
    type: string
    sampleTexts: SampleText[] | undefined
    sampleImages: SampleImage[] | undefined
};
const DetailSidebar: React.FC<DetailSidebarProp> = ({
    type,
    sampleTexts,
    sampleImages
}) => {


    return (
        <div className={`${type === '' ? 'invisible' : 'visible'} w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-14 absolute top-0 z-10`}>
            {type === 'text' && (
                <div className='flow-root'>
                    <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
                        {sampleTexts?.map((textItem, i) => (
                                <li className="py-3 sm:py-4" ><DraggableText key={i} image={textItem.image} data={textItem.data} fontFamily={textItem.fontFamily} fontSize={textItem.fontSize} fill={textItem.fill} type={textItem.type}/></li>
                        ))
                        }
                    </ul>
                </div>)}
            {type === 'image' && (
                <div className='flow-root'>
                    <ul role='list' className='divide-y divide-gray-200 dark:divide-gray-700'>
                        {sampleImages?.map((textItem, i) => (
                                <li className="py-3 sm:py-4" ><DraggableImage key={i} data={textItem.image} type={textItem.type}/></li>
                        ))
                        }
                    </ul>
                </div>)}
        </div>);
}
export default DetailSidebar;