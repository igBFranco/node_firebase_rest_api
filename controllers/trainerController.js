'use strict';

const trainerRepository = require('../repositories/trainer-repository');
const ctrlBase = require('../bin/base/controller-base');
const validators = require('../bin/lib/validators');
const _repo = new trainerRepository();

function trainerController() {}

trainerController.prototype.post = async (req, res) => { 
    let _validator = new validators();
    
    _validator.isRequired(req.body.name, 'O nome do treinador é obrigatório');
    _validator.isRequired(req.body.userName, 'O nome de usuário do treinador é obrigatório');
    _validator.isRequired(req.body.email, 'O email do treinador é obrigatório');
    _validator.isEmail(req.body.email, 'O email informado não é válido');

    ctrlBase.post(_repo, _validator, req, res);
}

trainerController.prototype.put = async (req, res) => {
    let _validator = new validators();
    
    _validator.isRequired(req.body.name, 'O nome do treinador é obrigatório');
    _validator.isRequired(req.body.userName, 'O nome de usuário do treinador é obrigatório');
    _validator.isRequired(req.body.email, 'O email do treinador é obrigatório');
    _validator.isEmail(req.body.email, 'O email informado não é válido');

    ctrlBase.put(_repo, _validator, req, res);
};

trainerController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res);
};

trainerController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

trainerController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

module.exports = trainerController;