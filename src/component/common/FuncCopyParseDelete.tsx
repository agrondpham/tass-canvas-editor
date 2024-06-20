export const deleteSelectedObjects = (canvas: fabric.Canvas) => {
    const activeObjects = canvas.getActiveObjects();
    activeObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.requestRenderAll();
};
export const parseSelectedObjects = (clipboard: fabric.Object[], canvas: fabric.Canvas) => {
    const top = clipboard[0].top;
    const left = clipboard[0].left;
    console.log("top" + top);
    console.log("lef" + left);
    clipboard.forEach(clonedObj => {
        if (canvas) {
            // canvas.discardActiveObject();
            clonedObj.clone((cloned: fabric.Object) => {
                if (canvas) {
                  // const boundingRect = canvasRef.getBoundingClientRect();

                    cloned.set({ 
                      left: clonedObj.left! + 10, 
                      top: clonedObj.top! + 10
                    });
                    canvas.add(cloned);
                    // canvas.setActiveObject(cloned);
                }
            });
        }
    });
    canvas.requestRenderAll();
};
// // Utility function to clone a single object
// export const cloneObject = (object: fabric.Object): Promise<fabric.Object> => {
//     return new Promise((resolve, reject) => {
//       object.clone((clonedObj: fabric.Object) => {
//         if (clonedObj) {
//           resolve(clonedObj);
//         } else {
//           reject(new Error('Cloning failed'));
//         }
//       });
//     });
//   };
  
//   // Utility function to clone multiple objects
//   export const cloneMultipleObjects = (objects: fabric.Object[]): Promise<fabric.Object[]> => {
//     return Promise.all(objects.map(obj => cloneObject(obj).then(cloned => {
//       cloned.set({ left: obj.left! + 10, top: obj.top! + 10 });
//       return cloned;
//     })));
//   };