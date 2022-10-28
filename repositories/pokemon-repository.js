const repBase = require('../bin/base/repository-base');

class pokemonRepository {
    constructor() {
        this._repBase = new repBase('pokemon', 'pokemons');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            number: data.number,
            name: data.name,
            type: data.type,
            description: data.description,
            weight: data.weight,
            height: data.height
        });
    }

    async getAll() {
        return await this._repBase.getAll();
    }

    async getById(id) {
       return await this._repBase.getById(id);
    }

    async delete(id) {
        return await this._repBase.delete(id);
    }
}

module.exports = pokemonRepository;