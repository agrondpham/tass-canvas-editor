import { fabric } from "fabric";

export const deleteSelectedObjects = (canvas: fabric.Canvas) => {
    const activeObjects = canvas.getActiveObjects();
    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
};
export const parseSelectedObjects = (clipboard: fabric.Object[], canvas: fabric.Canvas) => {
    if(clipboard.length === 1) {
        canvas.discardActiveObject();
        clipboard[0].clone((clonedObj: fabric.Object) => {
            clonedObj.set({
                left: (clonedObj.left || 0) + 10,
                top: (clonedObj.top || 0) + 10,
                evented: true,
            });
            canvas.add(clonedObj);
            
            canvas.setActiveObject(clonedObj);
        })
    } else {
        let objectActive = canvas.getActiveObject()
        let group = new fabric.Group()
        canvas.discardActiveObject();
        clipboard.forEach(item => {
            item.clone((clonedObj: fabric.Object) => {
                group.addWithUpdate(clonedObj)
            })
        })
        group.set({
            left: (objectActive?.left || 0) + 10,
            top: (objectActive?.top || 0) + 10,
        })
        canvas.add(group)
        canvas.setActiveObject(group);
    }
    canvas.requestRenderAll();
};
