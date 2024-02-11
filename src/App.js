import React, { useState, useEffect } from 'react';
import './App.css';
import DraggableItems from './DraggableItems';
import PlotterChart from './PlotterChart';

function App() {
  //Create a state for columns, and the inputs field to track them
  const [columns, setColumns] = useState([]);
  const [dimensionColumn, setDimensionColumn] = useState('');
  const [measureColumn, setMeasureColumn] = useState('');
  const [draggedItem, setdraggedItem] = useState('');
  const [dimensionArray, setDimensionArray] =  useState([]); 
  const [measureArray, setMeasureArray] = useState([]); 


  //Fetch the columns and update the state as soon as the App mounts
  useEffect(() => {

    
    
    fetchColumns();

  }, []);
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
      setDimensionArray(data.columns.filter(item => item.function === 'dimension'));
      setMeasureArray(data.columns.filter(item => item.function === 'measure'));

    } catch (error) {
      //Display if any errors occured 
      console.error('Error fetching columns:', error);
      return <div className='failed'>failed to load</div>;
    }
  };
    
  function clearInput(type){
    if(type === "measure"){
      setMeasureColumn("");
      setColumns([...dimensionArray.filter(item => item.name !== dimensionColumn), ...measureArray]);
    }
    else if(type === "dimension"){
      setDimensionColumn("");
      setColumns([...dimensionArray, ...measureArray.filter(item => item.name !== measureColumn)]);
    }
  }

  function handleOnDragEnd(result) {
    if (!result.destination) {
      const removedDraggedMeasureItem = measureArray.filter(item => item.name !== draggedItem.name);
      const removedDraggedDimensionItem = dimensionArray.filter(item => item.name !== draggedItem.name);
  
      if (draggedItem.function === "measure") {
        setMeasureColumn(draggedItem.name);
        setColumns([...dimensionArray, ...removedDraggedMeasureItem]);
      } else if (draggedItem.function === "dimension") {
        setDimensionColumn(draggedItem.name);
        setColumns([...removedDraggedDimensionItem, ...measureArray]);
      }
    }
  }

  function handleOnDragstrat(result) {

    const draggedItem = columns[result.source.index];
    setdraggedItem(draggedItem);
   
  }

  return (
    <div className="App">
      <div className="columns">
        <div className="column is-one-third">
          <div className="columns-container"> 
            <h1 className='subtitle is-info is-4'>Columns</h1>
            <DraggableItems onDragEnd={handleOnDragEnd} onDragStart={handleOnDragstrat}columns={columns}/>
          </div>
        </div>
        
        
       
        <div className="column is-full container" style={{ position: 'relative' }}>
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
              <button className="button is-info is-small mt-1 is-hovered" onClick={() => clearInput("dimension")}>Clear</button>
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
              <button className="button is-info is-small is-hovered mt-1" onClick={() => clearInput("measure")}>Clear</button>
            </div>

            <div className="columns is-full">
      <div className="column is-centered is-full">
        <PlotterChart measureColumn={measureColumn} dimensionColumn={dimensionColumn}/>
      </div>
    </div>
          </div>
        </div>

   
       
      </div>
    </div>
  );
  
}

export default App;