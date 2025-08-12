// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors()); // Allow cross-origin requests
// app.use(express.json()); // Parse JSON body automatically

// // POST endpoint to receive data from n8n
// app.post('/receive', (req, res) => {
//   console.log('Received JSON from n8n:', req.body);
//   // Here you can process or store the data
//   res.json({ status: 'success', received: req.body });
// });

// // Simple GET endpoint to verify server is running
// app.get('/', (req, res) => {
//   res.send('Backend is running');
// });

// // Start server on port 3000 (or use PORT env var)
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Import the 'promises' version for async/await
const path = require('path'); // Import the 'path' module
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body automatically

// POST endpoint to receive data from n8n
app.post('/receive', (req, res) => {
  console.log('Received JSON from n8n:', req.body);
  // Here you can process or store the data
  res.json({ status: 'success', received: req.body });
});

// Simple GET endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// NEW ENDPOINT to list files in the /app/data directory
app.get('/files', async (req, res) => {
  try {
    const dataDir = '/app/data';
    const files = await fs.readdir(dataDir);
    console.log('Files found in /app/data:', files);
    res.json({ files: files });
  } catch (error) {
    console.error('Error listing files:', error);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Directory not found.' });
    } else {
      res.status(500).json({ error: 'Failed to list files.' });
    }
  }
});


// GET endpoint to get JSON data from a file
app.get('/data', async (req, res) => {
  try {
    // IMPORTANT: Replace 'your-data-file.json' with the actual filename
    const filePath = '/app/data/your-data-file.json'; 
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading data file:', error);
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Data file not found.' });
    } else {
      res.status(500).json({ error: 'Failed to retrieve data.' });
    }
  }
});

// Start server on port 3000 (or use PORT env var)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
