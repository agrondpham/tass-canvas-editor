import { fabric } from 'fabric';
import { ImageItem, TextItem } from './SampleData';
import { IText } from 'fabric/fabric-impl';
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