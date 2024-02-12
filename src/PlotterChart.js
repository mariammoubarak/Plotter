import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

function PlotterChart({ measureInputValue, dimensionInputValue }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  let load = false;
  let error = null;
  
  useEffect(() => {
    // Destroy the existing chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
      }

    if (!measureInputValue || !dimensionInputValue) return;

    const fetchChartData = async () => {
      try {
        load = true;
        error = null;

        const postData = {
          measures: [measureInputValue],
          dimension: dimensionInputValue,
        };
        console.log("postdata: ",postData)
        const response = await fetch('https://plotter-task-8019e13a60ac.herokuapp.com/data', {  //http://localhost:3001/data
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error('Error fetching data from server');
        }

        const responseChartData = await response.json();
        createChart(responseChartData.data);
      } catch (error) {
        error = error.message;
      } finally {
        
        load = false;
      }
    };

    const createChart = (data) => {
      const ctx = chartRef.current.getContext('2d');

      const chartData = {
        labels: data[0].values,
        datasets: [
          {
            label: data[1].name,
            data: data[1].values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      };

      const chartOptions = {
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: data[0].name,
            },
          },
          y: {
            title: {
              display: true,
              text: data[1].name,
            },
          },
        },
      };

      ctx.canvas.width = '100%';
      ctx.canvas.height = '100%';

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
      });

      setChartInstance(newChartInstance);
    };

    // Fetch chart data when the component mounts or when measureColumn or dimensionColumn changes
    fetchChartData();
  }, [measureInputValue, dimensionInputValue]);

  return (
    <div>
      {load && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <canvas ref={chartRef} />
    </div>
  );
}

export default PlotterChart;
