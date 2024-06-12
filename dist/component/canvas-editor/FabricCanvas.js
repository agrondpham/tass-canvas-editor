import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { useDrop } from 'react-dnd';
import Toolbar from '../toolbar/ToolBar';
import PopupSidebar from '../sidebar/PopupSidebar';
import ItemType from '../common/ItemType';
import ContextMenu from '../toolbar/ContextMenu';
const FabricCanvas = ({ initData, sampleTexts, listFonts, sampleImages }) => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef();
    const [editingItem, setEditingItem] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null);
    const [fontList, setFontList] = useState();
    const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, show: false });
    const clear = () => {
        setEditingItem(null);
        setPopupPosition(null);
    };
    const handleRightClick = (event) => {
        var _a, _b, _c;
        event.preventDefault();
        const pointer = (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.getPointer(event);
        const boundingRect = canvasRef.current.getBoundingClientRect();
        setContextMenu({
            x: ((_b = pointer === null || pointer === void 0 ? void 0 : pointer.x) !== null && _b !== void 0 ? _b : 0) + boundingRect.left + 2,
            y: ((_c = pointer === null || pointer === void 0 ? void 0 : pointer.y) !== null && _c !== void 0 ? _c : 0) + boundingRect.top + 2,
            show: true
        });
    };
    useEffect(() => {
        if (canvasRef.current) {
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                selection: true,
                fireRightClick: true,
                fireMiddleClick: true,
                stopContextMenu: true,
            });
            //handle rightclick
            fabricCanvasRef.current.on('mouse:down:before', (event) => {
                if (event.e.button === 2) {
                    handleRightClick(event.e);
                }
                else {
                    setContextMenu(Object.assign(Object.assign({}, contextMenu), { show: false }));
                }
            });
            // Set init or bg the background color to white
            if (initData) {
                fabricCanvasRef.current.loadFromJSON(JSON.parse(initData), () => {
                    var _a;
                    (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.renderAll();
                });
            }
            else {
                fabricCanvasRef.current.setBackgroundColor('white', () => {
                    var _a;
                    (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.renderAll();
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
            });
            setFontList(fonts);
        }
        return () => {
            var _a;
            (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.dispose();
            // window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const updatePosition = (activeObject) => {
        setEditingItem(activeObject);
        const boundingRect = canvasRef.current.getBoundingClientRect();
        setPopupPosition({
            x: activeObject.left + boundingRect.left,
            y: activeObject.top + boundingRect.top - 60, //activeObject.height!,
        });
    };
    useEffect(() => {
        var _a, _b, _c, _d;
        if (canvasRef.current) {
            const handleSelection = (e) => {
                var _a;
                clear();
                const target = (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.getActiveObject();
                if (target) {
                    if (target.type === 'i-text') {
                        const activeObject = target;
                        updatePosition(activeObject);
                    }
                    if (target.type === 'image') {
                        const activeObject = target;
                        updatePosition(activeObject);
                    }
                    if (target.canvas) {
                        console.log(target.canvas.getObjects().indexOf(target));
                    }
                }
            };
            (_a = fabricCanvasRef.current) === null || _a === void 0 ? void 0 : _a.on('selection:created', handleSelection);
            (_b = fabricCanvasRef.current) === null || _b === void 0 ? void 0 : _b.on('selection:updated', handleSelection);
            (_c = fabricCanvasRef.current) === null || _c === void 0 ? void 0 : _c.on('selection:cleared', () => {
                clear();
            });
            (_d = fabricCanvasRef.current) === null || _d === void 0 ? void 0 : _d.on('object:moving', (e) => {
                const target = e.target;
                if (target) {
                    if (target.type === 'i-text') {
                        const activeObject = target;
                        updatePosition(activeObject);
                    }
                    if (target.type === 'image') {
                        const activeObject = target;
                        updatePosition(activeObject);
                    }
                    if (target.canvas) {
                        target.moveTo(target.canvas.getObjects().indexOf(target));
                        console.log(target.canvas.getObjects().indexOf(target));
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
                console.log(item);
                const currentItem = item;
                if (currentItem.type === 'text') {
                    const textItem = item;
                    const boundingRect = canvasRef.current.getBoundingClientRect();
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
                        lockScalingFlip: true,
                        lockRotation: false, // Allow rotation
                    });
                    fabricCanvasRef.current.add(text);
                }
                if (currentItem.type === 'image') {
                    const imageItem = item;
                    const boundingRect = canvasRef.current.getBoundingClientRect();
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'w-full flex flex-col' },
            React.createElement("div", { ref: drop, className: 'mx-auto my-auto' },
                React.createElement(Toolbar, { editingItem: editingItem, currentFabricCanvas: fabricCanvasRef.current, fonts: fontList, sampleTexts: sampleTexts, sampleImages: sampleImages }),
                React.createElement("canvas", { ref: canvasRef, width: 1280, height: 720 })),
            popupPosition && (React.createElement(PopupSidebar, { editingItem: editingItem, currentFabricCanvas: fabricCanvasRef.current, popupPosition: popupPosition })),
            React.createElement(ContextMenu, { currentFabricCanvas: fabricCanvasRef.current, x: contextMenu.x, y: contextMenu.y, show: contextMenu.show, onClose: () => setContextMenu(Object.assign(Object.assign({}, contextMenu), { show: false })) }))));
};
export default FabricCanvas;
