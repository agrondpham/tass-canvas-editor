import React, { useEffect, useState } from 'react';
import ColorButton from '../button/ColorButton';
import {Image } from 'fabric/fabric-impl';
import UploadImageButton from '../button/UploadImage';
import SaveToImage from '../button/SaveToImage';
import DetailSidebar from '../sidebar/DetailSidebar';
import SampleText from '../common/SampleText';
import SampleImage from '../common/SampleImage';
import ExportButton from '../button/ExportButton';

// interface TextToolbarProps {
//     onFontSizeChange: (size: number) => void;
//     onFontFamilyChange: (family: string) => void;
//     onBold: () => void;
//     onItalic: () => void;
//     currentFontSize: number;
//     currentFontFamily: string;
// }
interface TextEditorProps {
    editingItem: fabric.IText | fabric.Image | null,
    currentFabricCanvas: fabric.Canvas | undefined,
    fonts: string[] | undefined
    sampleTexts: SampleText[] | undefined
    sampleImages: SampleImage[]| undefined
}

const Toolbar: React.FC<TextEditorProps> = ({
    editingItem,
    currentFabricCanvas,
    fonts,
    sampleTexts,
    sampleImages
}) => {
    const [currentFontSize, setCurrentFontSize] = useState<number>(20);
    const [currentFontFamily, setCurrentFontFamily] = useState<string>('TimeNewRoman');
    const [currentColor, setCurrentColor] = useState<string>('#000000');
    const [textBold, setTextBold] = useState<boolean>();
    const [textLineThrought, setTextLineThrought] = useState<boolean>();
    const [textUnderline, setTextUnderline] = useState<boolean>();
    const [textItalic, setTextItalic] = useState<boolean>();
    const [textUpper, setTextUpper] = useState<boolean>();
    const [textAlign, setTextAlign] = useState<string>();
    const [openMenuDetail, setOpenMenuDetail] = useState<string>('');

    const openDetailMenu = (type: string) => {

        openMenuDetail === type ? setOpenMenuDetail('') : setOpenMenuDetail(type)

    }

    const handleFontSizeChange = (size: number) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem as fabric.IText
            editingItem.set('fontSize', currentFontSize + size);
            currentFabricCanvas?.renderAll();
            setCurrentFontSize(currentFontSize + size);
        }
    };
    const handleFontFamilyChange = (family: string) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem as fabric.IText
            editingItem.set('fontFamily', family);
            currentFabricCanvas?.renderAll();
            setCurrentFontFamily(family)
        }
    };
    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem as fabric.IText
            editingItem.set('fill', e.target.value);
            currentFabricCanvas?.renderAll();
            setCurrentColor(e.target.value)
        }
    }
    const handleTextAlign = (align: string) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem as fabric.IText
            editingItem.set('textAlign', align);
            currentFabricCanvas?.renderAll();
            setTextAlign(align)
        }
    }
    const handleTextStyle = (type: string) => {
        if (editingItem && editingItem.type === 'i-text') {
            editingItem = editingItem as fabric.IText
            switch (type) {
                case 's':
                    if (editingItem.linethrough) {
                        editingItem.set('linethrough', false);
                        setTextLineThrought(false)
                    } else {
                        editingItem.set('linethrough', true);
                        setTextLineThrought(true)
                    }
                    break;
                case 'u':
                    if (editingItem.underline) {
                        editingItem.set('underline', false);
                        setTextUnderline(false);
                    } else {
                        editingItem.set('underline', true);
                        setTextUnderline(true);
                    }
                    break;
                case 'i':
                    if (editingItem.fontStyle === 'italic') {
                        editingItem.set('fontStyle', 'normal');
                        setTextItalic(false);
                    } else {
                        editingItem.set('fontStyle', 'italic');
                        setTextItalic(true);
                    }
                    break;
                case 'b':
                    if (editingItem.fontWeight === 'bold') {
                        editingItem.set('fontWeight', 'normal');
                        setTextBold(false);
                    } else {
                        editingItem.set('fontWeight', 'bold');
                        setTextBold(true);
                    }
                    break;
                case 'a':
                    const currentText = editingItem?.text;
                    const isUpperCase = currentText === currentText?.toUpperCase();
                    const newText = isUpperCase ? currentText?.toLowerCase() : currentText?.toUpperCase();
                    editingItem.set('text', newText);
                    setTextUpper(!isUpperCase)
                    break;

            }
            currentFabricCanvas?.renderAll();
        }

    }
    const handleImageFlip = (flipDirect: keyof Image) => {
        if (editingItem && editingItem.type === 'image') {
            editingItem = editingItem as fabric.Image
            editingItem.toggle(flipDirect);
            currentFabricCanvas?.renderAll();
        }
    };

    useEffect(() => {
        if (editingItem) {
            if (editingItem.type === 'i-text') {
                editingItem = editingItem as fabric.IText;
                setCurrentFontFamily(editingItem?.fontFamily as string)
                setCurrentFontSize(editingItem?.fontSize as number)
                setCurrentColor(editingItem?.fill as string)
                setTextBold(editingItem.fontWeight === 'bold')
                setTextItalic(editingItem.fontStyle === 'italic')
                setTextLineThrought(editingItem.linethrough)
                setTextUnderline(editingItem.underline)
                const currentText = editingItem?.text;
                const isUpperCase = currentText === currentText?.toUpperCase();
                setTextUpper(isUpperCase)
                setTextAlign(editingItem.textAlign)
            }
        }

    }, [editingItem]);

    return (
        <div className='flex grap-2 py-2'>
            <div className='rounded flex items-center shadow-lg border border-gray-200 text-gray-700 bg-white py-2'>
                <DetailSidebar type={openMenuDetail} sampleTexts={sampleTexts} sampleImages={sampleImages}/>
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <SaveToImage currentFabricCanvas={currentFabricCanvas} />
                </div>
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <ExportButton currentFabricCanvas={currentFabricCanvas} />
                </div>

                <div onClick={() => openDetailMenu('text')}
                    className="mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded"
                >
                    <i className="fa-solid fa-text mx-auto my-auto" ></i>
                </div>

                <div onClick={() => openDetailMenu('image')}
                    className="mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded"
                >
                    <i className="fa-regular fa-image mx-auto my-auto"></i>
                </div>
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <UploadImageButton currentFabricCanvas={currentFabricCanvas} />
                </div>
                
                {editingItem?.type === 'i-text' && (
                    <>
                        <div className='relative flex items-center max-w-[8rem]'>
                            <button type='button' onClick={(e) => handleFontSizeChange(-1)} id='decrement-button' data-input-counter-decrement='quantity-input' className=' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg focus:ring-gray-100  focus:ring-2 focus:outline-none'>
                                <i className="fa-solid fa-minus  mx-auto my-auto"></i>
                            </button>
                            <input type='text' id='quantity-input' data-input-counter aria-describedby='helper-text-explanation' className=' w-8 h-8 bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 ' value={currentFontSize ? currentFontSize : 20} required />
                            <button type='button' onClick={(e) => handleFontSizeChange(+1)} id='increment-button' data-input-counter-increment='quantity-input' className=' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg focus:ring-gray-100  focus:ring-2 focus:outline-none'>
                                <i className="fa-solid fa-plus mx-auto my-auto"></i>
                            </button>
                        </div>

                        <div className='pl-2 pr-3 py-1 h-full flex items-center'>
                            <select value={currentFontFamily ? currentFontFamily : 'Times New Roman'} onChange={(e) => handleFontFamilyChange(e.target.value)}>
                                {fonts?.map((family) => (
                                    <option key={family} value={family} style={{fontFamily:family}}>
                                        {family}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div onClick={() => handleTextStyle('b')} className={`${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-bold mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextStyle('i')} className={`${textItalic ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none italic hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-italic mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextStyle('u')} className={`${textUnderline ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none underline hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-underline mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextStyle('s')} className={`${textLineThrought ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none line-through hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-strikethrough mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextStyle('a')} className={`${textUpper ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-font-case mx-auto my-auto'></i>
                        </div>
                        <div className=' w-8 h-8 px-2 cursor-pointer select-none hover:bg-gray-200 py-1'>
                            <ColorButton changeColor={changeColor} currentColor={currentColor ? currentColor : '#000000'} />
                        </div>
                        <div onClick={() => handleTextAlign('justify')} className={`${textAlign === 'justify' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-align-justify mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextAlign('left')} className={`${textAlign === 'left' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-align-left mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextAlign('center')} className={`${textAlign === 'center' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-align-center mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleTextAlign('right')} className={`${textAlign === 'right' ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-align-right mx-auto my-auto'></i>
                        </div>
                    </>
                )}
                {editingItem?.type === 'image' && (
                    <>
                        <div onClick={() => handleImageFlip('flipX')} className={`${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-reflect-horizontal mx-auto my-auto'></i>
                        </div>
                        <div onClick={() => handleImageFlip('flipY')} className={`${textBold ? 'bg-gray-300' : 'bg-gray'} mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`}>
                            <i className='fa-regular fa-reflect-vertical mx-auto my-auto'></i>
                        </div>

                    </>)}
            </div>


        </div>
    );
};

export default Toolbar;