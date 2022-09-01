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
router.get('/pokemons', getAllPokemons);
router.post('/pokemons', addPokemon);
router.get('/pokemons/:id', getPokemon);
router.put('/pokemons/:id', updatePokemon);
router.delete('/pokemons/:id', deletePokemon);

module.exports = {
    routes: router
}
