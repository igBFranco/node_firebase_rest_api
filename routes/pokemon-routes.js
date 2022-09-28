'use strict'

//incicializando as rotas do express
const express = require('express');
const controller = require('../controllers/pokemonController');
const router = express.Router();

let _ctrl = new controller();

//criando as rotas para o recurso Pokemon
//definindo a rota para a listagem de treinadores
router.get('/', _ctrl.get);
router.post('/', _ctrl.post);
router.get('/:id', _ctrl.getById);
router.put('/:id', _ctrl.put);
router.delete('/:id', _ctrl.delete);

module.exports = router;
