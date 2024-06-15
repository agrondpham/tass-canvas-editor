import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import Toolbar from '../toolbar/ToolBar';
import PopupSidebar from '../sidebar/PopupSidebar';
import ItemType from '../common/ItemType';
import ContextMenu from '../toolbar/ContextMenu';
import { ImageItem, SampleFont, TextItem } from '../common/SampleData';
import { IText } from 'fabric/fabric-impl';
import { cloneMultipleObjects, deleteSelectedObjects, parseSelectedObjects } from '../common/FuncCopyParseDelete';
import { functionAddElementToCanvas } from '../common/FuncFabricRenderEleement';

export interface FabricCanvasRef {
    exportToJson: () => string;
}

interface FabricCanvasProp {
    id: string,
    initData: string,
    sampleTexts: TextItem[],
    sampleImages: ImageItem[],
    listFonts: SampleFont[],
    mode: string,
    size: { width: number, height: number },
}


const FabricCanvas = forwardRef<FabricCanvasRef, FabricCanvasProp>(({
    id,
    initData,
    sampleTexts,
    listFonts,
    sampleImages,
    mode,
    size,
}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas>();
    const [editingItem, setEditingItem] = useState<fabric.Object | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [fontList, setFontList] = useState<string[]>();
    const [selectedItem, setSelectedItem] = useState<object | null>(null);
    const [canvasWidth, setCanvasWidth] = useState<number>(size.width);
    const [canvasHeight, setCanvasHeight] = useState<number>(size.height);
    const [showDropdown, setShowDropdown] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
    const [clipboard, setClipboard] = useState<fabric.Object[] | null>(null);
    const clear = () => {
        setEditingItem(null);
        setPopupPosition(null);
    }
    useImperativeHandle(ref, () => ({
        exportToJson() {
            if (fabricCanvasRef.current) {
                const abc = fabricCanvasRef.current as fabric.Canvas
                var json_data = JSON.stringify(abc.toDatalessJSON())
                return json_data;
            }
            return "";
        }
    }));
    const handleKeyDown = (event: KeyboardEvent) => {
        if (fabricCanvasRef.current) {
            //get all selected Object
            const activeObjects = fabricCanvasRef.current.getActiveObjects();
            if (event.ctrlKey && event.key === 'c' && activeObjects) {
                // cloneMultipleObjects(activeObjects).then(clonedObjects => {
                    setClipboard(activeObjects);
                //   });
            } else if (event.ctrlKey && event.key === 'v' && clipboard) {
                parseSelectedObjects(clipboard, fabricCanvasRef.current)
            } else if (event.key === 'Delete' && activeObjects) {
                deleteSelectedObjects(fabricCanvasRef.current)
            }


        }
    };
    useEffect(() => {
        if (canvasRef.current) {
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                selection: true,
                fireRightClick: true,  // <-- enable firing of right click events
                fireMiddleClick: true, // <-- enable firing of middle click events
                stopContextMenu: true,
                preserveObjectStacking: true
            });
        }
        return () => {
            if (fabricCanvasRef.current)
                fabricCanvasRef.current.dispose();
        };
    }, []);
    useEffect(() => {
        // Set fonts 
        let fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];
        //custom icon
        const fontPromises = listFonts.map((e) => {
            const font = new FontFace(e.fontName, `url(${e.fontFile})`);
            return font.load().then((loadedFont) => {
                // Add the font to the document
                (document.fonts as any).add(loadedFont);
                fonts.push(e.fontName);
            }).catch((error) => {
                console.error('Failed to load font:', error);
            });
        });

        Promise.all(fontPromises).then(() => {
            setFontList(fonts);
            if (fabricCanvasRef.current)
                if (initData) {
                    fabricCanvasRef.current.loadFromJSON(JSON.parse(initData), () => {
                        if (fabricCanvasRef.current && mode === 'preview') {
                            fabricCanvasRef.current.renderAll();
                            // Set all objects to not selectable
                            fabricCanvasRef.current.getObjects().forEach(function (obj) {
                                obj.selectable = false;
                            });
                            fabricCanvasRef.current.selection = false;
                        }
                        fabricCanvasRef.current?.renderAll();
                    });
                } else {
                    fabricCanvasRef.current.setBackgroundColor('white', () => {
                        fabricCanvasRef.current?.renderAll();
                    });
                }
        });
    }, [listFonts, initData, mode]);
    useEffect(() => {
        if (fabricCanvasRef.current) {
            //internal function for update possition
            const updatePosition = (activeObject: fabric.Object) => {
                setEditingItem(activeObject);
                const boundingRect = canvasRef.current!.getBoundingClientRect();
                setPopupPosition({
                    x: activeObject.left! + boundingRect.left,
                    y: activeObject.top! + boundingRect.top - 60,//activeObject.height!,
                });
            }
            //internal handler for right click
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
            //internal handler for select
            const handleSelection = (e: fabric.IEvent) => {
                clear();
                const target = fabricCanvasRef.current?.getActiveObject();
                if (target) {
                    updatePosition(target)

                    if (target.canvas) {
                        target.moveTo(target.canvas.getObjects().indexOf(target));
                        // console.log(target.canvas.getObjects().indexOf(target))
                    }
                }

            };

            if (fabricCanvasRef.current && mode === "edit") {
                fabricCanvasRef.current.on('selection:created', handleSelection);
                fabricCanvasRef.current.on('selection:updated', handleSelection);
                fabricCanvasRef.current.on('selection:cleared', () => {
                    clear();
                });
                fabricCanvasRef.current.on('object:moving', handleSelection);
                //handle rightclick
                fabricCanvasRef.current.on('mouse:down:before', (event) => {
                    if (event.e.button === 2) {
                        handleRightClick(event.e);
                    } else {
                        setContextMenu({ ...contextMenu, show: false });
                    }
                });
            }
        }
    }, [editingItem]);
    useEffect(() => {
        setCanvasHeight(size.height)
        setCanvasWidth(size.width)
    }, [size]);


    useEffect(() => {
        const handleCanvasClick = (e: fabric.IEvent) => {
            const pointer = fabricCanvasRef.current?.getPointer(e.e);
            if (pointer && fabricCanvasRef.current && selectedItem) {
                functionAddElementToCanvas(pointer, fabricCanvasRef.current, selectedItem)
                setSelectedItem(null)
            }
        };

        fabricCanvasRef.current?.on('mouse:down', handleCanvasClick);

        return () => {
            fabricCanvasRef.current?.off('mouse:down', handleCanvasClick);
        };
    }, [selectedItem]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [clipboard]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.TEXT,
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();

            if (clientOffset) {
                const boundingRect = canvasRef.current!.getBoundingClientRect();
                const x = clientOffset.x - boundingRect.left;
                const y = clientOffset.y - boundingRect.top;
                if (fabricCanvasRef.current && item) {
                    functionAddElementToCanvas({ x: x, y: y }, fabricCanvasRef.current, item)
                    setSelectedItem(null)
                }
            }
            setShowDropdown('');
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <>
            <div className='w-full flex flex-col'>
                <div ref={drop} className='mx-auto my-auto'>
                    {/* <div className='mx-auto my-auto'> */}
                    {mode === 'edit' && (<Toolbar
                        editingItem={editingItem}
                        currentFabricCanvas={fabricCanvasRef.current}
                        fonts={fontList}
                        sampleTexts={sampleTexts}
                        sampleImages={sampleImages}
                        setSelectedItem={setSelectedItem}
                        setShowDropdown={setShowDropdown}
                        showDropdown={showDropdown}
                    />)}
                    <div className="rounded shadow-lg border border-gray-200 ">
                        <canvas id={id} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
                    </div>
                </div>
                {mode === 'edit' && (<>{popupPosition && (
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
                        clipboard={clipboard}
                        setClipboard={setClipboard}
                    /></>)}

            </div>
        </>
    );
});

export default FabricCanvas;
