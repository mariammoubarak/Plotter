import React, { useState, useEffect } from 'react';
import './App.css';
import DraggableItems from './DraggableItems';


function App() {
  //Create a state for columns, and the inputs field to track them
  const [columns, setColumns] = useState([]);
  const [dimensionColumn, setDimensionColumn] = useState('');
  const [measureColumn, setMeasureColumn] = useState('');

  //Fetch the columns and update the state as soon as the App mounts
  useEffect(() => {

    const fetchColumns = async () => {
      try {
        const response = await fetch('http://localhost:3001/columns');
    
        if (!response.ok) {
          throw new Error('Response not OK');
        }
    
        // Read the response as text
        const text = await response.text();
    
        // Parse the response text as JSON
        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return <div className='failed'>failed to load</div>;
        }
        
        //update the state 
        setColumns(data.columns);
      } catch (error) {
        //Display if any errors occured 
        console.error('Error fetching columns:', error);
        return <div className='failed'>failed to load</div>;
      }
    };
    
    fetchColumns();

  }, []);
    


  function handleOnDragEnd(result) {
    console.log(result)
    const draggedItem = columns[result.source.index];

    if(draggedItem.function === "measure")
    setMeasureColumn(columns[result.source.index].name)

   else if(draggedItem.function === "dimension")
   setDimensionColumn(columns[result.source.index].name)

    const items = Array.from(columns);
    //items.splice(result.source.index, 1);
    //items.splice(result.destination.index, 0, reorderedItem);

    //updateCharacters(items);

   
  }


  return (
    <div className="App">
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="columns-container"> 
            <h1 className='subtitle is-info is-4'>Columns</h1>
            <DraggableItems onDragEnd={handleOnDragEnd} columns={columns}/>
          </div>
        </div>
        
        <div className="column is-full container is flex">
          <div>
            <div className='dimension is-flex'>
              <label className='subtitle is-info is-ellipsis mr-2' style={{ width: '30%'}}>Dimension</label>
              <input
                className="input is-rounded is-info mr-2"
                type="text"
                value={dimensionColumn}
                onDrop={() => handleOnDragEnd()}
                onChange={(e) => setDimensionColumn(e.target.value)}
                placeholder='Drop your dimension column'
              />
              <button className="button is-info is-small mt-1 is-hovered" onClick={() => setDimensionColumn("")}>Clear</button>
            </div>
  
            <div className='measure is-flex'>
              <label className='subtitle is-info is-ellipsis mr-2' style={{ width: '30%', overflow: 'hidden' }}>Measure</label>
              <input
                className="input is-rounded is-info mr-2 "
                type="text"
                value={measureColumn}
                onDrop={() => handleOnDragEnd()}
                onChange={(e) => setMeasureColumn(e.target.value)}
                placeholder='Drop your measure column'
              />
              <button className="button is-info is-small is-hovered mt-1" onClick={() => setMeasureColumn("")}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default App;





// return (
//   <div className="App">
//     <div className="column-containers block">
//       <h1 lassName='subtitle is-info'>Columns</h1>
//       <DraggableItems onDragEnd={handleOnDragEnd} columns={columns}/>
//       </div>

//       <div className='inputs-container'>
//         <div className='dimension is-flex is-narrow'>
//         <label className='subtitle is-info is-spaced'>Dimension</label>
//           <input
//               class="input is-rounded is-info mt-2"
//               type="text"
//               value={dimensionColumn}
//               onDrop={() => handleOnDragEnd()}
//               onChange={(e) => setDimensionColumn(e.target.value)}
//               placeholder='Drop your dimesion column'
//             />
//             <button class="button is-info" onClick={()=>setDimensionColumn("")}>Clear</button>
//         </div>
//         <div className='measure'>
//             <label className='subtitle is-info'>Measure </label>
//             <input
//               class="input is-rounded is-info"
//               type="text"
//               value={measureColumn}
//               onDrop={() => handleOnDragEnd()}
//               onChange={(e) => setDimensionColumn(e.target.value)}
//               placeholder='Drop your measure column'
//           />
//              <button class="button is-info" onClick={()=>setMeasureColumn("")}>Clear</button>
//         </div>
//       </div>
//   </div>
// );










































































// import './App.css';
// import 'bulma/css/bulma.css';
// import { useState } from "react";
// import { DragDropContext ,Droppable, Draggable } from 'react-beautiful-dnd';
// import DraggableItems from './DraggableItems';


// function App() {
//   const [columns, setColumns] = useState([
//     {
//       "name": "Product",
//       "function": "dimension"
//     },
//     {
//       "name": "Year",
//       "function": "dimension"
//     },
//     {
//       "name": "Country",
//       "function": "dimension"
//     },
//     {
//       "name": "Cost",
//       "function": "measure"
//     },
//     {
//       "name": "Revenue",
//       "function": "measure"
//     },
//     {
//       "name": "Units sold",
//       "function": "measure"
//     }
//   ]);

//   const moveItem = (dragIndex, hoverIndex) => {
//     const draggedItem = columns[dragIndex];
//     const updatedListItems = [...columns];
//     updatedListItems.splice(dragIndex, 1);
//     updatedListItems.splice(hoverIndex, 0, draggedItem);
//     setColumns(updatedListItems);
//   };

//   return (
//     <div className="App">
//       <DragDropContext> 
//       <Droppable droppableId="characters">
//     {(provided) => (
//      <div className="columns column-container">
//      <ul className="column is-full" {...provided.droppableProps} ref={provided.innerRef}>
//      <p className="bd-notification is-primary columnsTitle">Columns</p>
//      {columns.map((column, index) => (
//       <Draggable key={index} draggableId={index} index={index}>
//       {(provided) => (
//        <DraggableItems key={index} column={column} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}/>
//       )}
//     </Draggable>
       
//      ))}

//       </ul>
//    </div>
//     )}
//   </Droppable>
     

//      </DragDropContext>
//     </div>
//   );
// }

// export default App;
