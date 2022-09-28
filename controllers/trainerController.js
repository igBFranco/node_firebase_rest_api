'use strict'

//definindo imports
require('../models/trainer');
const repository = require('../repositories/trainer-repository');

function trainerController () {

}

trainerController.prototype.post = async (req, res) => {
    //criando um objeto para receber a execucao do repositorio
    let resultado = await new repository().create(req.body);
    //retornando uma resposta para a requisicao
    res.status(201).send(resultado);
}

trainerController.prototype.put = async (req,res) => {
    //criando um objeto para receber a execucao do repositorio
    let resultado = await new repository().update(req.params.id, req.body);
    //retornando uma resposta para a requisicao
    res.status(202).send(resultado);
}

trainerController.prototype.get = async (req,res) => {
    let lista = await new repository().getAll();
    res.status(200).send(lista);
}

trainerController.prototype.getById = async (req,res) => {
    let trainer = await new repository().getById(req.params.id);
    res.status(200).send(trainer);
}

trainerController.prototype.delete = async (req,res) => {
    let trainer = await new repository().delete(req.params.id);
    res.status(200).send(trainer);
}


module.exports = trainerController;