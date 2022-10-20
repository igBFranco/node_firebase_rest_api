'use strict'

//definindo imports
const pokemonRepository = require('../repositories/pokemon-repository');
const ctrlBase = require('../bin/base/controller-base');
const validators = require('../bin/lib/validators');
const _repo = new pokemonRepository();

function pokemonController () {}

pokemonController.prototype.post = async (req, res) => {
    let _validator = new validators();

    _validator.isRequired(req.body.number, 'Informe o número do pokemon');
    _validator.isRequired(req.body.name, 'Informe o nome do pokemon');
    _validator.isRequired(req.body.type, 'Informe o tipo do pokemon');

    ctrlBase.post(_repo, _validator, req, res);
}

pokemonController.prototype.put = async (req,res) => {
    let _validator = new validators();

    _validator.isRequired(req.body.number, 'Informe o número do pokemon');
    _validator.isRequired(req.body.name, 'Informe o nome do pokemon');
    _validator.isRequired(req.body.type, 'Informe o tipo do pokemon');

    ctrlBase.put(_repo, _validator, req, res);
}

pokemonController.prototype.get = async (req,res) => {
   ctrlBase.get(_repo, req, res);
}

pokemonController.prototype.getById = async (req,res) => {
    ctrlBase.getById(_repo, req, res);
}

pokemonController.prototype.delete = async (req,res) => {
    ctrlBase.delete(_repo, req, res);
}


module.exports = pokemonController;