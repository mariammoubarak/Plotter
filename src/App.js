import React, { useState, useEffect } from 'react';
import './App.css';
import DraggableItems from './DraggableItems';
import PlotterChart from './PlotterChart';
import InputField from './InputField';

function App() {
  //Create a state for columns, and the inputs field to track them
  const [columns, setColumns] = useState([]);
  const [dimensionInputValue, setDimensionValue] = useState('');
  const [measureInputValue, setMeasureValue] = useState('');
  const [draggedItem, setDraggedItem] = useState('');
  //Create state for both dimension and measure arrays to update the columns when item is drpped
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
    
  //Update the state of the draggedItem 
  function handleOnDragstrat(result) {
  
    const draggedItem = columns[result.source.index];
    setDraggedItem(draggedItem);
    
  }

  //Update input values and the columns accordingly
  function handleOnDragEnd(result) {
    
    // If the dragged item is dropped in the same place, take no action.
    if (!result.destination) {
      let measureArrayWithoutDraggedItem = measureArray.filter(item => item.name !== draggedItem.name);
      let dimesnsionArrayWithoutDraggedItem = dimensionArray.filter(item => item.name !== draggedItem.name);
      
      if (draggedItem.function === "measure") {
        setMeasureValue(draggedItem.name);
        
        //update the columns displayed so that the dropped item is removed 
        measureArrayWithoutDraggedItem = measureArray.filter(item => item.name !== draggedItem.name);
        dimesnsionArrayWithoutDraggedItem = dimensionArray.filter(item => item.name !== dimensionInputValue);
        
        
      } else if (draggedItem.function === "dimension") {
        setDimensionValue(draggedItem.name);
        
        //update the columns displayed so that the dropped item is removed 
        measureArrayWithoutDraggedItem = measureArray.filter(item => item.name !== measureInputValue);
        dimesnsionArrayWithoutDraggedItem = dimensionArray.filter(item => item.name !== dimensionInputValue);
        
      }
      setColumns([...dimesnsionArrayWithoutDraggedItem, ...measureArrayWithoutDraggedItem]);
    }
  }
  
  //Clear the input text and update the columns accordingly 
  function handleOnClear(type){

  // If the field is cleared, update the columns to display all items of this type and show
  // the array of the other type, taking into account filtering when the other field is not empty.

    if(type === "measure"){
      setMeasureValue("");
      setColumns([...dimensionArray.filter(item => item.name !== dimensionInputValue), ...measureArray]);
    }
    else if(type === "dimension"){
      setDimensionValue("");
      setColumns([...dimensionArray, ...measureArray.filter(item => item.name !== measureInputValue)]);
    }
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
            <InputField 
              label = "Dimension"
              value = {dimensionInputValue} 
              onClear ={() => handleOnClear("dimension")}
              />
            <InputField 
              label = "Measure"
              value = {measureInputValue} 
              onClear ={() => handleOnClear("measure")}
              />

            <div className="columns is-full">
              <div className="column is-centered is-full">
                <PlotterChart measureInputValue={measureInputValue} dimensionInputValue={dimensionInputValue}/>
              </div>
            </div>
          
        </div>

      </div>
    </div>
  );
  
}

export default App;