//realizando as importacoes
const express = require('express');
const {
    addPokemon,
    getAllPokemons,
    getPokemon,
    updatePokemon,
    deletePokemon
} = require('../controllers/pokemonController');

//incicializando as rotas do express
const router = express.Router();

//criando as rotas para o recurso Trainer
//definindo a rota para a listagem de treinadores
router.get('/pokemon', getAllPokemons);
router.post('/pokemon', addPokemon);
router.get('/pokemon/:id', getPokemon);
router.put('/pokemon/:id', updatePokemon);
router.delete('/pokemon/:id', deletePokemon);

module.exports = {
    routes: router
}
