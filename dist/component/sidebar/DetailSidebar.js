import React from 'react';
import DraggableText from '../drap-drop/DraggableText';
import DraggableImage from '../drap-drop/DraggableImage';
;
const DetailSidebar = ({ type, sampleTexts, sampleImages }) => {
    return (React.createElement("div", { className: `${type === '' ? 'invisible' : 'visible'} w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-14 absolute top-0 z-10` },
        type === 'text' && (React.createElement("div", { className: 'flow-root' },
            React.createElement("ul", { role: 'list', className: 'divide-y divide-gray-200 dark:divide-gray-700' }, sampleTexts === null || sampleTexts === void 0 ? void 0 : sampleTexts.map((textItem, i) => (React.createElement("li", { className: "py-3 sm:py-4" },
                React.createElement(DraggableText, { key: i, image: textItem.image, data: textItem.data, fontFamily: textItem.fontFamily, fontSize: textItem.fontSize, fill: textItem.fill, type: textItem.type }))))))),
        type === 'image' && (React.createElement("div", { className: 'flow-root' },
            React.createElement("ul", { role: 'list', className: 'divide-y divide-gray-200 dark:divide-gray-700' }, sampleImages === null || sampleImages === void 0 ? void 0 : sampleImages.map((textItem, i) => (React.createElement("li", { className: "py-3 sm:py-4" },
                React.createElement(DraggableImage, { key: i, data: textItem.image, type: textItem.type })))))))));
};
export default DetailSidebar;
