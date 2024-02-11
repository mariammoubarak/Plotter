const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001; // Choose a port for your proxy server

app.use(cors());

app.get('/columns', async (req, res) => {
  try {
    const apiResponse = await axios.get('https://plotter-task-8019e13a60ac.herokuapp.com/columns');
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
