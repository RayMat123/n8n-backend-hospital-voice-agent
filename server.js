const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON body automatically

const fs = require('fs');
const dataFilePath = '/app/data/patients.json';

// Example: Save data received from n8n
app.post('/receive', (req, res) => {
  const jsonData = JSON.stringify(req.body, null, 2);
  fs.writeFile(dataFilePath, jsonData, (err) => {
    if (err) {
      console.error('Error writing data:', err);
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.json({ status: 'success' });
  });
});


// Simple GET endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Start server on port 3000 (or use PORT env var)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
