'use strict'

//definindo imports
const firebase = require('../db');
const Pokemon = require('../models/pokemon');
const firestore = firebase.firestore();

class pokemonRepository {
    constructor() {}

    //o create sera responsavel por receber do controller o req.body com os dados e fazer a chamada com o firebase para a persistencia dos dados
    async create(data) {
        let res = await firestore.collection('pokemons').doc().set(data);
        return res;
    }

    async update(id, data) {
        let pokemon = await firestore.collection('pokemons').doc(id);
        let res = await pokemon.update(data);
        return res;
    }

    async getAll() {
        let pokemon = await firestore.collection('pokemons');
        let res = await pokemon.get();
        const pokemonArray = [];
        res.forEach(doc => {
            const singlePokemon = new Pokemon(
                doc.id,
                doc.data().number,
                doc.data().name,
                doc.data().type,
                doc.data().description,
                doc.data().weight,
                doc.data().height,
            );
            pokemonArray.push(singlePokemon);
        })
        return pokemonArray;
    }

    async getById(id) {
        let pokemon = await firestore.collection('pokemons').doc(id);
        let res = await pokemon.get();
        return res.data();
    }

    async delete(id) {
        return await firestore.collection('pokemons').doc(id).delete();
    }
}

module.exports = pokemonRepository;