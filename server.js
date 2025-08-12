const express = require('express');
const cors = require('cors');
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

// Start server on port 3000 (or use PORT env var)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
