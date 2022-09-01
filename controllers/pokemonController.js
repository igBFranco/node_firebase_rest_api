'use strict'

//definindo imports
const firebase = require('../db');
const Pokemon = require('../models/pokemon');
const firestore = firebase.firestore();

// Criando o metodo para adicionar um novo pokemon
const addPokemon = async (req, res, next) => {
    try {
        //criando uma constante para receber o conteudo da requisicao
        const data = req.body;
        //executando o metodo da classe firestore que ira gravar o documento no banco
        await firestore.collection('pokemons').doc().set(data);
        res.status(201).send('Pokemon salvo com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Criando o metodo para listar todos os pokemons
const getAllPokemons = async (req, res, next) => {
    try {
        //criando um objeto para receber a colecao pokemons
        const pokemons = await firestore.collection('pokemons');
        //criando uma constante para receber os documentos da colecao
        const data = await pokemons.get()
        //criando um array vazio que ira receber os treinadores
        const pokemonsArray = [];
        //testando se ha documentos na colecao
        if(data.empty) {
            res.status(404).send('Não há Pokemons cadastrados!');
        }else {
            data.forEach(doc => {
                const pokemon = new Pokemon(
                    doc.id, 
                    doc.data().number, 
                    doc.data().name, 
                    doc.data().type, 
                    doc.data().description, 
                    doc.data().weight, 
                    doc.data().height
                );
                pokemonsArray.push(pokemon);
            })
            res.status(200).send(pokemonsArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando o metodo para listar um Pokemon especifico
const getPokemon = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o resultado da consulta do firestore
        const pokemon = await firestore.collection('pokemons').doc(id);
        //criando um objeto para receber o documento
        const data = await pokemon.get();
        if(!data.exists) {
            res.status(404).send("Não foi encontrado um Pokemon com o ID informado!");
        }else {
            res.status(200).send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando o metodo para atualizar um Pokemon
const updatePokemon = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o conteudo da requisicao
        const data = req.body;
        //criando um objeto para receber o resultado da consulta do firestore
        const pokemon = await firestore.collection('pokemons').doc(id);
        //executando o metodo que ira atualizar o documento
        await pokemon.update(data);
        res.status(200).send('Pokemon atualizado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando um metodo para excluir um Pokemon
const deletePokemon = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o resultado da consulta do firestore
        const pokemon = await firestore.collection('pokemons').doc(id);
        //executando o metodo que ira excluir o documento
        await pokemon.delete();
        res.status(200).send('Pokemon excluido com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addPokemon,
    getAllPokemons,
    getPokemon,
    updatePokemon,
    deletePokemon
}