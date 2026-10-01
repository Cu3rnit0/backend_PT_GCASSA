const express = require('express');
const router = express.Router();
const {getHacinedas, crearHacienda, deleteHacienda, actualizarHacienda, contarHaciendas} = require('../controllers/haciendaController');

//HTTP 
router.get('/haciendas',contarHaciendas);
router.get('/haciendas', getHacinedas);
router.post('/haciendas', crearHacienda);
router.delete('/haciendas/:id',deleteHacienda);
router.put('/haciendas/:id', actualizarHacienda);

module.exports = router;