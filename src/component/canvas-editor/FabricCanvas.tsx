import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import Toolbar from '../toolbar/ToolBar';
import PopupSidebar from '../sidebar/PopupSidebar';
import ItemType from '../common/ItemType';
import SampleText from '../common/SampleText';
import SampleFont from '../common/SampleFont';
import SampleImage from '../common/SampleImage';
import ContextMenu from '../toolbar/ContextMenu';

interface ImageItem {
    data: string,
    type: string
}
interface TextItem {
    data: string,
    fontFamily: string,
    fontSize: number,
    fill: string,
    type: string
}
interface CommonDragDropItem {
    data: string,
    type: string
}
interface FabricCanvasProp {
    initData: string,
    sampleTexts: SampleText[],
    sampleImages: SampleImage[],
    listFonts: SampleFont[]
}

const FabricCanvas: React.FC<FabricCanvasProp> = ({
    initData,
    sampleTexts,
    listFonts,
    sampleImages
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas>();
    const [editingItem, setEditingItem] = useState<fabric.IText | fabric.Image | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [fontList, setFontList] = useState<string[]>();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
    const clear = () => {
        setEditingItem(null);
        setPopupPosition(null);
    }
    const handleRightClick = (event: MouseEvent) => {
        event.preventDefault();
        const pointer = fabricCanvasRef.current?.getPointer(event);
        const boundingRect = canvasRef.current!.getBoundingClientRect();
        setContextMenu({
            x: (pointer?.x ?? 0) + boundingRect.left + 2,
            y: (pointer?.y ?? 0) + boundingRect.top + 2,
            show: true
        });
    };
    useEffect(() => {
        if (canvasRef.current) {
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                selection: true,
                fireRightClick: true,  // <-- enable firing of right click events
                fireMiddleClick: true, // <-- enable firing of middle click events
                stopContextMenu: true,
            });
            //handle rightclick
            fabricCanvasRef.current.on('mouse:down:before', (event) => {
                if (event.e.button === 2) {
                    handleRightClick(event.e);
                } else {
                    setContextMenu({ ...contextMenu, show: false });
                }
            });
            // Set init or bg the background color to white
            if (initData) {
                fabricCanvasRef.current.loadFromJSON(JSON.parse(initData), () => {
                    fabricCanvasRef.current?.renderAll();
                })
            } else {
                fabricCanvasRef.current.setBackgroundColor('white', () => {
                    fabricCanvasRef.current?.renderAll();
                });
            }


            // Set fonts 
            let fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
            //custom icon
            listFonts.forEach((e) => {
                const font = new FontFace(e.fontName, `url(${e.fontFile})`);
                font.load().then((loadedFont) => {
                    // Add the font to the document
                    // document.fonts.load(loadedFont);
                }).catch((error) => {
                    console.error('Failed to load font:', error);
                });
                fonts.push(e.fontName);
            })

            setFontList(fonts)

        }
        return () => {
            fabricCanvasRef.current?.dispose();
            // window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const updatePosition = (activeObject: fabric.IText | fabric.Image) => {
        setEditingItem(activeObject);
        const boundingRect = canvasRef.current!.getBoundingClientRect();
        setPopupPosition({
            x: activeObject.left! + boundingRect.left,
            y: activeObject.top! + boundingRect.top - 60,//activeObject.height!,
        });
    }
    useEffect(() => {
        if (canvasRef.current) {
            const handleSelection = (e: fabric.IEvent) => {
                clear();
                const target = fabricCanvasRef.current?.getActiveObject();
                if (target) {
                    if (target.type === 'i-text') {
                        const activeObject = target as fabric.IText;
                        updatePosition(activeObject)
                    }
                    if (target.type === 'image') {
                        const activeObject = target as fabric.Image;
                        updatePosition(activeObject)
                    }
                    if (target.canvas) {
                        console.log(target.canvas.getObjects().indexOf(target))
                    }
                }

            };

            fabricCanvasRef.current?.on('selection:created', handleSelection);
            fabricCanvasRef.current?.on('selection:updated', handleSelection);
            fabricCanvasRef.current?.on('selection:cleared', () => {
                clear();
            });
            fabricCanvasRef.current?.on('object:moving', (e) => {
                const target = e.target;

                if (target) {
                    if (target.type === 'i-text') {
                        const activeObject = target as fabric.IText;
                        updatePosition(activeObject)
                    }
                    if (target.type === 'image') {
                        const activeObject = target as fabric.Image;
                        updatePosition(activeObject)
                    }
                    if (target.canvas) {
                        target.moveTo(target.canvas.getObjects().indexOf(target));
                        console.log(target.canvas.getObjects().indexOf(target))
                    }
                }
            });
            // Prevent objects from being brought to the front when dragged
            // fabricCanvasRef.current.on('object:moving', (event) => {
            //     const activeObject = event.target;
            //     if (activeObject) {
            //     activeObject.moveTo(activeObject.canvas.getObjects().indexOf(activeObject));
            //     }
            // });
        }
    }, [editingItem]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.TEXT,
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset && fabricCanvasRef.current) {
                console.log(item)
                const currentItem = item as CommonDragDropItem
                if (currentItem.type === 'text') {
                    const textItem = item as TextItem
                    const boundingRect = canvasRef.current!.getBoundingClientRect();
                    const x = clientOffset.x - boundingRect.left;
                    const y = clientOffset.y - boundingRect.top;

                    const text = new fabric.IText(textItem.data, {
                        left: x,
                        top: y,
                        fontSize: textItem.fontSize,
                        fontFamily: textItem.fontFamily,
                        fill: textItem.fill,
                        selectable: true,
                        hasControls: true,
                        lockScalingFlip: true, // Prevent scaling flip
                        lockRotation: false,   // Allow rotation
                    });
                    fabricCanvasRef.current.add(text);
                }
                if (currentItem.type === 'image') {
                    const imageItem = item as ImageItem
                    const boundingRect = canvasRef.current!.getBoundingClientRect();
                    const x = clientOffset.x - boundingRect.left;
                    const y = clientOffset.y - boundingRect.top;

                    fabric.Image.fromURL(imageItem.data, (img) => {
                        if (fabricCanvasRef.current) {
                            img.set({
                                left: x,
                                top: y,
                            });
                            fabricCanvasRef.current.add(img);
                            fabricCanvasRef.current.requestRenderAll();
                        }
                    });
                }

            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <>
            <div className='w-full flex flex-col'>
                <div ref={drop} className='mx-auto my-auto'>
                    <Toolbar
                        editingItem={editingItem}
                        currentFabricCanvas={fabricCanvasRef.current}
                        fonts={fontList}
                        sampleTexts={sampleTexts}
                        sampleImages={sampleImages}
                    />
                    <canvas ref={canvasRef} width={1280} height={720} />
                </div>

                {popupPosition && (
                    <PopupSidebar
                        editingItem={editingItem}
                        currentFabricCanvas={fabricCanvasRef.current}
                        popupPosition={popupPosition}
                    />
                )}
                <ContextMenu
                    currentFabricCanvas={fabricCanvasRef.current}
                    x={contextMenu.x}
                    y={contextMenu.y}
                    show={contextMenu.show}
                    onClose={() => setContextMenu({ ...contextMenu, show: false })}
                />
            </div>
        </>
    );
};

export default FabricCanvas;
