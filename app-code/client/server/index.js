const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, './dist')));

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
