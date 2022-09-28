'use strict'

//definindo imports
const firebase = require('../db');
const Trainer = require('../models/trainer');
const firestore = firebase.firestore();

class trainerRepository {
    constructor() {}

    //o create sera responsavel por receber do controller o req.body com os dados e fazer a chamada com o firebase para a persistencia dos dados
    async create(data) {
        let res = await firestore.collection('trainers').doc().set(data);
        return res;
    }

    async update(id, data) {
        let trainer = await firestore.collection('trainers').doc(id);
        let res = await trainer.update(data);
        return res;
    }

    async getAll() {
        let trainers = await firestore.collection('trainers');
        let res = await trainers.get();
        const trainersArray = [];
        res.forEach(doc => {
            const trainer = new Trainer(
                doc.id,
                doc.data().name,
                doc.data().age,
                doc.data().birthDate,
                doc.data().city,
                doc.data().email,
                doc.data().genre,
                doc.data().name,
                doc.data().state,
                doc.data().username
            );
            trainersArray.push(trainer);
        })
        return trainersArray;
    }

    async getById(id) {
        let trainer = await firestore.collection('trainers').doc(id);
        let res = await trainer.get();
        return res.data();
    }

    async delete(id) {
        return await firestore.collection('trainers').doc(id).delete();
    }
}

module.exports = trainerRepository;