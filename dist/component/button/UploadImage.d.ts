import React from "react";
import { fabric } from 'fabric';
interface SaveToToolbarProps {
    currentFabricCanvas: fabric.Canvas | undefined;
}
declare const UploadImageButton: React.FC<SaveToToolbarProps>;
export default UploadImageButton;
