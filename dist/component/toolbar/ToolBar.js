import React, { useEffect, useState } from 'react';
import ColorButton from '../button/ColorButton';
import UploadImageButton from '../button/UploadImage';
import SaveToImage from '../button/SaveToImage';
import DetailSidebar from '../sidebar/DetailSidebar';
import ExportButton from '../button/ExportButton';
const Toolbar = ({ editingItem, currentFabricCanvas, fonts, sampleTexts, sampleImages }) => {
    const [currentFontSize, setCurrentFontSize] = useState(20);
    const [currentFontFamily, setCurrentFontFamily] = useState('TimeNewRoman');
    const [currentColor, setCurrentColor] = useState('#000000');
    const [textBold, setTextBold] = useState();
    const [textLineThrought, setTextLineThrought] = useState();
    const [textUnderline, setTextUnderline] = useState();
    const [textItalic, setTextItalic] = useState();
    const [textUpper, setTextUpper] = useState();
    const [textAlign, setTextAlign] = useState();
    const [openMenuDetail, setOpenMenuDetail] = useState('');
    const openDetailMenu = (type) => {
        openMenuDetail === type ? setOpenMenuDetail('') : setOpenMenuDetail(type);
    };
    const handleFontSizeChange = (size) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem;
            editingItem.set('fontSize', currentFontSize + size);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
            setCurrentFontSize(currentFontSize + size);
        }
    };
    const handleFontFamilyChange = (family) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem;
            editingItem.set('fontFamily', family);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
            setCurrentFontFamily(family);
        }
    };
    const changeColor = (e) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem;
            editingItem.set('fill', e.target.value);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
            setCurrentColor(e.target.value);
        }
    };
    const handleTextAlign = (align) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem;
            editingItem.set('textAlign', align);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
            setTextAlign(align);
        }
    };
    const handleTextStyle = (type) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem;
            switch (type) {
                case 's':
                    if (editingItem.linethrough) {
                        editingItem.set('linethrough', false);
                        setTextLineThrought(false);
                    }
                    else {
                        editingItem.set('linethrough', true);
                        setTextLineThrought(true);
                    }
                    break;
                case 'u':
                    if (editingItem.underline) {
                        editingItem.set('underline', false);
                        setTextUnderline(false);
                    }
                    else {
                        editingItem.set('underline', true);
                        setTextUnderline(true);
                    }
                    break;
                case 'i':
                    if (editingItem.fontStyle === 'italic') {
                        editingItem.set('fontStyle', 'normal');
                        setTextItalic(false);
                    }
                    else {
                        editingItem.set('fontStyle', 'italic');
                        setTextItalic(true);
                    }
                    break;
                case 'b':
                    if (editingItem.fontWeight === 'bold') {
                        editingItem.set('fontWeight', 'normal');
                        setTextBold(false);
                    }
                    else {
                        editingItem.set('fontWeight', 'bold');
                        setTextBold(true);
                    }
                    break;
                case 'a':
                    const currentText = editingItem === null || editingItem === void 0 ? void 0 : editingItem.text;
                    const isUpperCase = currentText === (currentText === null || currentText === void 0 ? void 0 : currentText.toUpperCase());
                    const newText = isUpperCase ? currentText === null || currentText === void 0 ? void 0 : currentText.toLowerCase() : currentText === null || currentText === void 0 ? void 0 : currentText.toUpperCase();
                    editingItem.set('text', newText);
                    setTextUpper(!isUpperCase);
                    break;
            }
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
        }
    };
    const handleImageFlip = (flipDirect) => {
        if (editingItem && editingItem.type === 'image') {
            editingItem = editingItem;
            editingItem.toggle(flipDirect);
            currentFabricCanvas === null || currentFabricCanvas === void 0 ? void 0 : currentFabricCanvas.renderAll();
        }
    };
    useEffect(() => {
        if (editingItem) {
            if (editingItem.type === 'i-text') {
                editingItem = editingItem;
                setCurrentFontFamily(editingItem === null || editingItem === void 0 ? void 0 : editingItem.fontFamily);
                setCurrentFontSize(editingItem === null || editingItem === void 0 ? void 0 : editingItem.fontSize);
                setCurrentColor(editingItem === null || editingItem === void 0 ? void 0 : editingItem.fill);
                setTextBold(editingItem.fontWeight === 'bold');
                setTextItalic(editingItem.fontStyle === 'italic');
                setTextLineThrought(editingItem.linethrough);
                setTextUnderline(editingItem.underline);
                const currentText = editingItem === null || editingItem === void 0 ? void 0 : editingItem.text;
                const isUpperCase = currentText === (currentText === null || currentText === void 0 ? void 0 : currentText.toUpperCase());
                setTextUpper(isUpperCase);
                setTextAlign(editingItem.textAlign);
            }
        }
    }, [editingItem]);
    return (React.createElement("div", { className: 'flex grap-2 py-2' },
        React.createElement("div", { className: 'rounded flex items-center shadow-lg border border-gray-200 text-gray-700 bg-white py-2' },
            React.createElement(DetailSidebar, { type: openMenuDetail, sampleTexts: sampleTexts, sampleImages: sampleImages }),
            React.createElement("div", { className: 'mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`' },
                React.createElement(SaveToImage, { currentFabricCanvas: currentFabricCanvas })),
            React.createElement("div", { className: 'mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`' },
                React.createElement(ExportButton, { currentFabricCanvas: currentFabricCanvas })),
            React.createElement("div", { onClick: () => openDetailMenu('text'), className: "mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded" },
                React.createElement("i", { className: "fa-solid fa-text mx-auto my-auto" })),
            React.createElement("div", { onClick: () => openDetailMenu('image'), className: "mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded" },
                React.createElement("i", { className: "fa-regular fa-image mx-auto my-auto" })),
            React.createElement("div", { className: 'mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`' },
                React.createElement(UploadImageButton, { currentFabricCanvas: currentFabricCanvas })),
            (editingItem === null || editingItem === void 0 ? void 0 : editingItem.type) === 'i-text' && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: 'relative flex items-center max-w-[8rem]' },
                    React.createElement("button", { type: 'button', onClick: (e) => handleFontSizeChange(-1), id: 'decrement-button', "data-input-counter-decrement": 'quantity-input', className: ' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg focus:ring-gray-100  focus:ring-2 focus:outline-none' },
                        React.createElement("i", { className: "fa-solid fa-minus  mx-auto my-auto" })),
                    React.createElement("input", { type: 'text', id: 'quantity-input', "data-input-counter": true, "aria-describedby": 'helper-text-explanation', className: ' w-8 h-8 bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 ', value: currentFontSize ? currentFontSize : 20, required: true }),
                    React.createElement("button", { type: 'button', onClick: (e) => handleFontSizeChange(+1), id: 'increment-button', "data-input-counter-increment": 'quantity-input', className: ' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg focus:ring-gray-100  focus:ring-2 focus:outline-none' },
                        React.createElement("i", { className: "fa-solid fa-plus mx-auto my-auto" }))),
                React.createElement("div", { className: 'pl-2 pr-3 py-1 h-full flex items-center' },
                    React.createElement("select", { value: currentFontFamily ? currentFontFamily : 'Times New Roman', onChange: (e) => handleFontFamilyChange(e.target.value) }, fonts === null || fonts === void 0 ? void 0 : fonts.map((family) => (React.createElement("option", { key: family, value: family }, family))))),
                React.createElement("div", { onClick: () => handleTextStyle('b'), className: `${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-bold mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextStyle('i'), className: `${textItalic ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none italic hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-italic mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextStyle('u'), className: `${textUnderline ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none underline hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-underline mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextStyle('s'), className: `${textLineThrought ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none line-through hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-strikethrough mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextStyle('a'), className: `${textUpper ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-font-case mx-auto my-auto' })),
                React.createElement("div", { className: ' w-8 h-8 px-2 cursor-pointer select-none hover:bg-gray-200 py-1' },
                    React.createElement(ColorButton, { changeColor: changeColor, currentColor: currentColor ? currentColor : '#000000' })),
                React.createElement("div", { onClick: () => handleTextAlign('justify'), className: `${textAlign === 'justify' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-align-justify mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextAlign('left'), className: `${textAlign === 'left' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-align-left mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextAlign('center'), className: `${textAlign === 'center' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-align-center mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleTextAlign('right'), className: `${textAlign === 'right' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-align-right mx-auto my-auto' })))),
            (editingItem === null || editingItem === void 0 ? void 0 : editingItem.type) === 'image' && (React.createElement(React.Fragment, null,
                React.createElement("div", { onClick: () => handleImageFlip('flipX'), className: `${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-reflect-horizontal mx-auto my-auto' })),
                React.createElement("div", { onClick: () => handleImageFlip('flipY'), className: `${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded` },
                    React.createElement("i", { className: 'fa-regular fa-reflect-vertical mx-auto my-auto' })))))));
};
export default Toolbar;
