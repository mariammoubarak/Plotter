# Plotter App

This project is a Plotter App that allows users to drag and drop columns, select dimension and measure, and visualize the data on a chart.

## Setup Instructions

### Backend Setup (Middleware for Cross-Origin Handling)

1. Navigate to the `node` directory:

    cd node

2. Install dependencies:

    npm install

3. Run the proxy server:

    node proxy-server.js

    If successful, you should see a message in the console: "Proxy server is running on http://localhost:3001".

### Frontend Setup

1. Navigate to the `plotter` directory:

    cd plotter


2. Install dependencies:

    npm install


3. Start the frontend application:

    npm start

    The application should open in your default web browser.

## Usage

- Drag columns from the list and drop them into the "Dimension" and "Measure" input fields.
- The selected columns will be used to fetch data and display a chart.
- If the console displays a message saying "Proxy server is running on http://localhost:3001", the backend is successfully set up.

