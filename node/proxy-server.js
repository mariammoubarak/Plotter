const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001; 

app.use(cors());
app.use(express.json());

app.get('/columns', async (req, res) => {
  try {
    const apiResponse = await axios.get('https://plotter-task-8019e13a60ac.herokuapp.com/columns');
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint for sending data
app.post('/data', async (req, res) => {
  const postData = req.body; 
  try {
    const apiResponse = await axios.post('https://plotter-task-8019e13a60ac.herokuapp.com/data', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error posting data to API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
