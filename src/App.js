import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const App = () => {
  // Store plot data in state.
  const [plotData, setPlotData] = useState([]);
  

  useEffect(() => {
    // fetch plot data when the component mounts

    async function fetchData() {
      console.log('calling fetchdata...');

      try {
        // 'data.json' should be populated from a run of sim.py
        const response = await fetch('data.json');
        const data = await response.json();
        const updatedPlotData = {};

        data.forEach(([t0, t1, frame]) => {
          for (let [agentId, { x, y }] of Object.entries(frame)) {
            updatedPlotData[agentId] = updatedPlotData[agentId] || { x: [], y: [] };
            updatedPlotData[agentId].x.push(x);
            updatedPlotData[agentId].y.push(y);
          }
        });

        setPlotData(Object.values(updatedPlotData));
        console.log('plotData:', Object.values(updatedPlotData));
      } catch (error) {
        console.error('Error fetching data:', error);
      
      }
    }

    fetchData();
  }, []);

  
  const apiRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getComet'); // sends request to API container

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json()

      const newElement = { //builds new element from API request data
        x: data.xArr, 
        y: data.yArr, 
        type: data.type,
        name: data.name,
      }

      setPlotData([...plotData,newElement]) // updates the plot data to be the old plot data + newElement
      console.log(data)

    } catch(error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <>
    <div class="container">
      <button class="button" onClick={apiRequest}>Add New Comet</button>
    </div>
    <Plot
      style={{ position: 'relative', width: '100%', height: '100%',}}
      data={plotData}
      layout={{
        title: 'Sedaro Nano + Comets',
        yaxis: { scaleanchor: 'x' },
        autosize: true,
      }}
    />
    </>
  );
};

export default App;
