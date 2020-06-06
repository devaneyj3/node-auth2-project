const express = require('express');

const authRoutes = require('./api/authRoutes');
const server = express();

server.use(express.json());

server.use('/api/auth', authRoutes);

server.get('/', (req, res) => {
    res.status(200).send('The App is working');
})

const PORT = 5001;

server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})