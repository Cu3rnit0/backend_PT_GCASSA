const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./config/db');

const app = express();


app.use(cors());
app.use(express.json());


getConnection();

const haciendaRoutes = require('./routes/haciendaRoutes');
app.use('/api', haciendaRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'API de Grupo CASSA lista para recibir peticiones' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});