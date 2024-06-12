import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DragDropProvider = ({ children }) => {
    return React.createElement(DndProvider, { backend: HTML5Backend }, children);
};
export default DragDropProvider;
