import React, { useEffect, useState } from 'react';
import ColorButton from '../button/ColorButton';
import { Image } from 'fabric/fabric-impl';
import UploadImageButton from '../button/UploadImage';
import SaveToImage from '../button/SaveToImage';
import ExportButton from '../button/ExportButton';
import { ImageItem, TextItem } from '../common/SampleData';
import DraggableText from '../drap-drop/DraggableText';
import DraggableImage from '../drap-drop/DraggableImage';

interface TextEditorProps {
    editingItem: fabric.Object | null
    currentFabricCanvas: fabric.Canvas | undefined
    fonts: string[] | undefined
    sampleTexts: TextItem[] | []
    sampleImages: ImageItem[] | []
    setSelectedItem: (item: TextItem) => void
    showDropdown:string,
    setShowDropdown:(type:string)=>void
}

const Toolbar: React.FC<TextEditorProps> = ({
    editingItem,
    currentFabricCanvas,
    fonts,
    sampleTexts,
    sampleImages,
    setSelectedItem,
    showDropdown,
    setShowDropdown
}) => {
    // const [selectedItem, setSelectedItem] = useState<string[]>();
    const [currentFontSize, setCurrentFontSize] = useState<number>(20);
    const [currentFontFamily, setCurrentFontFamily] = useState<string>('TimeNewRoman');
    const [currentColor, setCurrentColor] = useState<string>('#000000');
    const [textBold, setTextBold] = useState<boolean>();
    const [textLineThrought, setTextLineThrought] = useState<boolean>();
    const [textUnderline, setTextUnderline] = useState<boolean>();
    const [textItalic, setTextItalic] = useState<boolean>();
    const [textUpper, setTextUpper] = useState<boolean>();
    const [textAlign, setTextAlign] = useState<string>();
    // const [openMenuDetail, setOpenMenuDetail] = useState<string>('');

    const handleOpenDropdownMenu = (type: string) => {
        showDropdown === type ? setShowDropdown('') : setShowDropdown(type)
    }

    const handleFontSizeChange = (size: number) => {
        if (editingItem) {
            if (editingItem.type === 'textbox' || editingItem.type === 'i-text') {
                const item = editingItem as fabric.Textbox
                item.set('fontSize', currentFontSize + size);
                currentFabricCanvas?.renderAll();
                setCurrentFontSize(currentFontSize + size);
            }
        }
    };
    const handleFontFamilyChange = (family: string) => {
        if (editingItem) {
            if (editingItem.type === 'textbox' || editingItem.type === 'i-text') {
                const item = editingItem as fabric.Textbox
                item.set('fontFamily', family);
                currentFabricCanvas?.renderAll();
                setCurrentFontFamily(family)
            }
        }
    };
    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingItem && (editingItem.type === 'textbox' || editingItem.type === 'i-text')) {
            const item = editingItem as fabric.Textbox
            item.set('fill', e.target.value);
            currentFabricCanvas?.renderAll();
            setCurrentColor(e.target.value)
        }
    }
    const handleTextAlign = (align: string) => {
        if (editingItem && (editingItem.type === 'textbox' || editingItem.type === 'i-text')) {
            const item = editingItem as fabric.Textbox
            item.set('textAlign', align);
            currentFabricCanvas?.renderAll();
            setTextAlign(align)
        }
    }
    const handleTextStyle = (type: string) => {
        if (editingItem && (editingItem.type === 'textbox' || editingItem.type === 'i-text')) {
            const item = editingItem as fabric.Textbox
            switch (type) {
                case 's':
                    if (item.linethrough) {
                        item.set('linethrough', false);
                        setTextLineThrought(false)
                    } else {
                        item.set('linethrough', true);
                        setTextLineThrought(true)
                    }
                    break;
                case 'u':
                    if (item.underline) {
                        item.set('underline', false);
                        setTextUnderline(false);
                    } else {
                        item.set('underline', true);
                        setTextUnderline(true);
                    }
                    break;
                case 'i':
                    if (item.fontStyle === 'italic') {
                        item.set('fontStyle', 'normal');
                        setTextItalic(false);
                    } else {
                        item.set('fontStyle', 'italic');
                        setTextItalic(true);
                    }
                    break;
                case 'b':
                    if (item.fontWeight === 'bold') {
                        item.set('fontWeight', 'normal');
                        setTextBold(false);
                    } else {
                        item.set('fontWeight', 'bold');
                        setTextBold(true);
                    }
                    break;
                case 'a':
                    const currentText = item?.text;
                    const isUpperCase = currentText === currentText?.toUpperCase();
                    const newText = isUpperCase ? currentText?.toLowerCase() : currentText?.toUpperCase();
                    item.set('text', newText);
                    setTextUpper(!isUpperCase)
                    break;

            }
            currentFabricCanvas?.renderAll();
        }

    }
    const handleImageFlip = (flipDirect: keyof Image) => {
        if (editingItem && editingItem.type === 'image') {
            const item = editingItem as fabric.Image
            item.toggle(flipDirect);
            currentFabricCanvas?.renderAll();
        }
    };

    useEffect(() => {
        if (editingItem) {
            if (editingItem.type === 'textbox' || editingItem.type === 'i-text') {
                const item = editingItem as fabric.Textbox
                setCurrentFontFamily(item?.fontFamily as string)
                setCurrentFontSize(item?.fontSize as number)
                setCurrentColor(item?.fill as string)
                setTextBold(item.fontWeight === 'bold')
                setTextItalic(item.fontStyle === 'italic')
                setTextLineThrought(item.linethrough)
                setTextUnderline(item.underline)
                const currentText = item?.text;
                const isUpperCase = currentText === currentText?.toUpperCase();
                setTextUpper(isUpperCase)
                setTextAlign(item.textAlign)
            }
        }

    }, [editingItem]);

    return (
        <div className='flex grap-2 py-2'>
            <div className='rounded flex items-center shadow-lg border border-gray-200 text-gray-700 bg-white py-2'>
                {showDropdown ==='text'&& sampleTexts.length>0 && (
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-14 absolute top-0 z-10">

                        <div className='flow-root'>
                            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {sampleTexts.map((item, i) => (
                                    <li className="py-3 sm:py-4" key={i}>
                                        <DraggableText item={item} setSelectedItem={setSelectedItem} setShowDropdown={setShowDropdown} />
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>)}
                {showDropdown ==='image' && sampleImages.length>0 && (
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 mt-14 absolute top-0 z-10">
                        <div className='flow-root'>
                            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {sampleImages.map((item, i) => (
                                    <li className="py-3 sm:py-4" key={i}>
                                        <DraggableImage {...item} />
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>)}
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <SaveToImage currentFabricCanvas={currentFabricCanvas} />
                </div>
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <ExportButton currentFabricCanvas={currentFabricCanvas} />
                </div>

                <div onClick={() => handleOpenDropdownMenu('text')}
                    className="mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded"
                >
                    <i className="fa-solid fa-text mx-auto my-auto" ></i>
                </div>

                <div onClick={() => handleOpenDropdownMenu('image')}
                    className="mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded"
                >
                    <i className="fa-regular fa-image mx-auto my-auto"></i>
                </div>
                <div className='mx-1 w-8 h-8 cursor-pointer select-none font-bold hover:bg-gray-200 flex rounded`'>
                    <UploadImageButton currentFabricCanvas={currentFabricCanvas} />
                </div>

                {(editingItem?.type === 'textbox' || editingItem?.type === 'i-text') && (
                    <>
                        <div className='relative flex items-center max-w-[8rem]'>
                            <button type='button' onClick={(e) => handleFontSizeChange(-1)} id='decrement-button' data-input-counter-decrement='quantity-input' className=' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg focus:ring-gray-100  focus:ring-2 focus:outline-none'>
                                <i className="fa-solid fa-minus  mx-auto my-auto"></i>
                            </button>
                            <input type='text' id='quantity-input' data-input-counter aria-describedby='helper-text-explanation' className=' w-8 h-8 bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block py-2.5 ' defaultValue={currentFontSize ? currentFontSize : 20} required />
                            <button type='button' onClick={(e) => handleFontSizeChange(+1)} id='increment-button' data-input-counter-increment='quantity-input' className=' w-8 h-8 flex bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg focus:ring-gray-100  focus:ring-2 focus:outline-none'>
                                <i className="fa-solid fa-plus mx-auto my-auto"></i>
                            </button>
                        </div>

                        <div className='pl-2 pr-3 py-1 h-full flex items-center'>
                            <select defaultValue={currentFontFamily ? currentFontFamily : 'Times New Roman'} onChange={(e) => handleFontFamilyChange(e.target.value)}>
                                {fonts?.map((family) => (
                                    <option key={family} value={family} style={{ fontFamily: family }}>
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