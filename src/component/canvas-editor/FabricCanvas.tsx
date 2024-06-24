import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import Toolbar from '../toolbar/ToolBar';
import PopupSidebar from '../sidebar/PopupSidebar';
import ItemType from '../common/ItemType';
import ContextMenu from '../toolbar/ContextMenu';
import { ImageItem, SampleFont, TextItem } from '../common/SampleData';
import { deleteSelectedObjects, parseObjects } from '../common/FuncCopyParseDelete';
import { functionAddElementToCanvas, functionLoadFont, functionLoadJsonToCanvas } from '../common/FuncFabricRenderEleement';

export interface FabricCanvasRef {
    exportToJson: () => string;
}

interface FabricCanvasProp {
    id?: string,
    initData?: string,
    sampleTexts?: TextItem[],
    sampleImages?: ImageItem[],
    listFonts?: SampleFont[],
    mode: string,
    size: { width: number, height: number },
    mainClassName?: string
}

const FabricCanvas = forwardRef<FabricCanvasRef, FabricCanvasProp>(({
    id,
    initData,
    sampleTexts = [],
    listFonts = [],
    sampleImages = [],
    mode,
    size,
    mainClassName = 'mx-auto my-auto relative pt-14',
}, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricCanvasRef = useRef<fabric.Canvas>();
    const [editingItem, setEditingItem] = useState<fabric.Object | null>(null);
    const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
    const [fontList, setFontList] = useState<string[]>();
    const [canvasFonts, setCanvasFonts] = useState<SampleFont[]>(listFonts);
    const [selectedItem, setSelectedItem] = useState<object | null>(null);
    const [showDropdown, setShowDropdown] = useState<string>('');
    // const [reloadData, setReloadData] = useState<string | undefined>(initData);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
    const [clipboard, setClipboard] = useState<fabric.Object>();
    const [finishLoad, setFinishLoad] = useState<boolean>(false);
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
            if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'C')) {
                fabricCanvasRef.current.getActiveObject()?.clone((cloned: React.SetStateAction<fabric.Object | undefined>) => {
                    setClipboard(cloned)
                })
                
            } else if ((event.ctrlKey || event.metaKey) && (event.key === 'v' || event.key === 'V')) {
                if(clipboard) {
                    parseObjects(clipboard, fabricCanvasRef.current)
                }
            } else if (event.key === 'Delete' && fabricCanvasRef.current.getActiveObjects()) {
                deleteSelectedObjects(fabricCanvasRef.current)
            }


        }
    };
    useEffect(() => {
        if (canvasRef.current) {
            console.log('first run')
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                selection: true,
                fireRightClick: true,  // <-- enable firing of right click events
                fireMiddleClick: true, // <-- enable firing of middle click events
                stopContextMenu: true,
                preserveObjectStacking: true
            });
            fabricCanvasRef.current.setWidth(size.width)
            fabricCanvasRef.current.setHeight(size.height)
            functionLoadFont(canvasFonts, (fonts) => {
                setFontList(fonts);
                // setReloadData(initData!)
                //load first time
                functionLoadJsonToCanvas(fabricCanvasRef.current!, initData, mode)
                setFinishLoad(true)
            })
            fabricCanvasRef.current.renderAll();
        }
        return () => {
            if (fabricCanvasRef.current)
                fabricCanvasRef.current.dispose();
        };
    }, []);
    useEffect(() => {
        if (fabricCanvasRef.current && finishLoad) {
            console.log('load font')
            functionLoadFont(canvasFonts, (fonts) => {
                setFontList(fonts);
            })
        }
    }, [canvasFonts]);
    useEffect(() => {
        console.log('load json pretest')
        if (fabricCanvasRef.current && finishLoad) {
            console.log('load Json to Canvas')
            functionLoadJsonToCanvas(fabricCanvasRef.current!, initData, mode)
        }
    }, [mode, initData]);
    useEffect(() => {
        if (fabricCanvasRef.current) {
            //internal function for update possition
            const updatePosition = (activeObject: fabric.Object[]) => {
                setEditingItem(activeObject[0]);
                const boundingRect = canvasRef.current!.getBoundingClientRect();
                setPopupPosition({
                    x: activeObject[0].left! + boundingRect.left,
                    y: activeObject[0].top! + boundingRect.top - 60,//activeObject.height!,
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
                const target = fabricCanvasRef.current?.getActiveObjects();
                if (target) {
                    updatePosition(target)

                    // if (target.canvas) {
                    //     target.moveTo(target.canvas.getObjects().indexOf(target));
                    //     // console.log(target.canvas.getObjects().indexOf(target))
                    // }
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
        if (fabricCanvasRef.current && finishLoad) {
            console.log('Change size')
            fabricCanvasRef.current.setWidth(size.width)
            fabricCanvasRef.current.setHeight(size.height)
        }
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
            <div ref={drop} className={mainClassName}>
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
                <canvas id={id} ref={canvasRef} className="rounded shadow-lg border border-gray-200 " />
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
                /></>)}
        </>
    );
});

export default FabricCanvas;
