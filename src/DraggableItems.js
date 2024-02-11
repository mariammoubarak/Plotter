import 'bulma/css/bulma.css';
import './DraggableItems.css';
import { useState} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DraggableItems({onDragEnd, onDragStart, columns}){
 //
  return (
    <DragDropContext  onDragStart={onDragStart} onDragEnd={onDragEnd}>
    <Droppable droppableId="columns">
      {(provided) => (
        <ul  {...provided.droppableProps} ref={provided.innerRef}>
          {columns.map(({ name}, index) => {
            return (
              <Draggable key={name.replaceAll("\\s+","")} draggableId={name.replaceAll("\\s+","")} index={index}>
                {(provided) => (
                  <li  className="column is-info column-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <p>
                      { name }
                    </p>
                  </li>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ul>
        
      )}
      
    </Droppable>
  </DragDropContext>
  );


}

export default DraggableItems;