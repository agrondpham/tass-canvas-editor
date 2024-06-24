import { fabric } from 'fabric';
import { ImageItem, SampleFont, TextItem } from './SampleData';
import { IText } from 'fabric/fabric-impl';
import { FabricCanvasCustom } from '../canvas-editor/FabricCanvas';
interface CommonDragDropItem {
    data: string,
    type: string
}
export const functionAddElementToCanvas = (pointer: { x: number, y: number }, canvas: fabric.Canvas, item: any) => {

    const currentItem = item as CommonDragDropItem
    if (currentItem.type === 'textbox') {
        const textItem = item as TextItem
        const x = pointer.x
        const y = pointer.y
        // debugger

        const text = new fabric.Textbox(textItem.data, {
            left: x,
            top: y,
            fontSize: textItem.fontSize,
            fontFamily: textItem.fontFamily,
            fill: textItem.fill,
            selectable: true,
            hasControls: true,
            lockScalingFlip: false, // Prevent scaling flip
            lockRotation: true,   // Allow rotation
            editable: textItem.editable
        });
        canvas.add(text);
    }
    if (currentItem.type === 'text') {
        const textItem = item as IText
        const x = pointer.x //- boundingRect.left;
        const y = pointer.y //- boundingRect.top;
        // debugger

        const text = new fabric.IText(textItem.data, {
            left: x,
            top: y,
            fontSize: textItem.fontSize,
            fontFamily: textItem.fontFamily,
            fill: textItem.fill,
            selectable: true,
            hasControls: true,
            lockScalingFlip: false, // Prevent scaling flip
            lockRotation: true,   // Allow rotation
            editable: textItem.editable
        });
        canvas.add(text);

    }
    if (currentItem.type === 'image') {
        const imageItem = item as ImageItem
        const x = pointer.x //- boundingRect.left;
        const y = pointer.y //- boundingRect.top;

        fabric.Image.fromURL(imageItem.data, (img) => {
            if (canvas) {
                img.set({
                    left: x,
                    top: y,
                });
                canvas.add(img);
                canvas.requestRenderAll();
            }
        });
    }


}

export const functionLoadJsonToCanvas = (canvas: FabricCanvasCustom, jsonData: string | undefined, mode: string) => {
    if (jsonData) {
        canvas.loadFromJSON(JSON.parse(jsonData), () => {
            if (canvas && mode === 'preview') {
                canvas.renderAll();
                // Set all objects to not selectable
                canvas.getObjects().forEach(function (obj) {
                    obj.selectable = false;
                });
                canvas.selection = false;
            }
            canvas.renderAll();
        });
    } else {
        canvas.setBackgroundColor('white', () => {
            if (canvas) {
                // const options = {
                //     distance: 10,
                //     width: canvas.width!,
                //     height: canvas.height!,
                //     param: {
                //         stroke: '#ebebeb',
                //         strokeWidth: 1,
                //         selectable: false
                //     }
                // }
                // const gridLen = options.width / options.distance;

                // for (var i = 0; i < gridLen; i++) {
                //     var distance = i * options.distance,
                //         horizontal = new fabric.Line([distance, 0, distance, options.width], options.param),
                //         vertical = new fabric.Line([0, distance, options.width, distance], options.param);
                //     fabricCanvasRef.current.add(horizontal);
                //     fabricCanvasRef.current.add(vertical);
                //     if (i % 5 === 0) {
                //         horizontal.set({ stroke: '#cccccc' });
                //         vertical.set({ stroke: '#cccccc' });
                //     };
                // };
                canvas.renderAll();
            }
        });
    }
}

export const functionLoadFont = (listFonts:SampleFont[], callback: (fonts:string[]) => void) => {
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
        callback(fonts)

    });
}