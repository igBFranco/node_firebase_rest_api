'use strict'

//definindo imports
const firebase = require('../db');
const Trainer = require('../models/trainer');
const firestore = firebase.firestore();

// Criando o metodo para adicionar um novo treinador
const addTrainer = async (req, res, next) => {
    try {
        //criando uma constante para receber o conteudo da requisicao
        const data = req.body;
        //executando o metodo da classe firestore que ira gravar o documento no banco
        await firestore.collection('trainers').doc().set(data);
        res.status(201).send('Treinador salvo com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//Criando o metodo para listar todos os treinadores
const getAllTrainers = async (req, res, next) => {
    try {
        //criando um objeto para receber a colecao trainers
        const trainers = await firestore.collection('trainers');
        //criando uma constante para receber os documentos da colecao
        const data = await trainers.get()
        //criando um array vazio que ira receber os treinadores
        const trainersArray = [];
        //testando se ha documentos na colecao
        if(data.empty) {
            res.status(404).send('Não há treinadores cadastrados!');
        }else {
            data.forEach(doc => {
                const trainer = new Trainer(
                    doc.id, 
                    doc.data().name, 
                    doc.data().userName, 
                    doc.data().email, 
                    doc.data().password, 
                    doc.data().birthDate, 
                    doc.data().age, 
                    doc.data().genre, 
                    doc.data().city, 
                    doc.data().state
                );
                trainersArray.push(trainer);
            })
            res.status(200).send(trainersArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando o metodo para listar um treinador especifico
const getTrainer = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o resultado da consulta do firestore
        const trainer = await firestore.collection('trainers').doc(id);
        //criando um objeto para receber o documento
        const data = await trainer.get();
        if(!data.exists) {
            res.status(404).send("Não foi encontrado um treinador com o ID informado!");
        }else {
            res.status(200).send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando o metodo para atualizar um treinador
const updateTrainer = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o conteudo da requisicao
        const data = req.body;
        //criando um objeto para receber o resultado da consulta do firestore
        const trainer = await firestore.collection('trainers').doc(id);
        //executando o metodo que ira atualizar o documento
        await trainer.update(data);
        res.status(200).send('Treinador atualizado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//criando um metodo para excluir um treinador
const deleteTrainer = async (req, res, next) => {
    try {
        //criando um objeto para receber o id 
        const id = req.params.id;
        //criando um objeto para receber o resultado da consulta do firestore
        const trainer = await firestore.collection('trainers').doc(id);
        //executando o metodo que ira excluir o documento
        await trainer.delete();
        res.status(200).send('Treinador excluido com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTrainer,
    getAllTrainers,
    getTrainer,
    updateTrainer,
    deleteTrainer
}