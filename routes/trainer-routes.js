//realizando as importacoes
const express = require('express');
const {
    addTrainer,
    getAllTrainers,
    getTrainer,
    updateTrainer,
    deleteTrainer
} = require('../controllers/trainerController');

//incicializando as rotas do express
const router = express.Router();

//criando as rotas para o recurso Trainer
//definindo a rota para a listagem de treinadores
router.get('/trainers', getAllTrainers);
router.post('/trainers', addTrainer);
router.get('/trainers/:id', getTrainer);
router.put('/trainers/:id', updateTrainer);
router.delete('/trainers/:id', deleteTrainer);

module.exports = {
    routes: router
}
