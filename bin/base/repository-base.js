//Definindo os imports 
const firebase = require('../../db');
const firestore = firebase.firestore();

class repositoryBase {
    constructor(model, collection){
        this._model = model,
        this._collection = collection
    }

    modelBase = require('../../models/'+ this._model);

    async create(data) {
        let res = await firestore.collection(this._collection).doc().set(data);
        return res;
    }

    async update(id, data) {
        let res = await firestore.collection(this._collection).doc(id).update(data);
        return res;
    }

    async getAll() {
        let collec = await firestore.collection(this._collection);
        let res = await collec.get();
        const docArray = [];
        if(res.empty) {
            return 'Não foram encontrados documentos!';
        }else {
            docArray = res.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            return docArray;
        }
    }

    async getById(id) {
        let res = await firestore.collection(this._collection).doc(id).get();
        if(!res.exists) {
            return 'Não foi encontrado o documento com o ID informado!'
        }else {
            return res.data();
        }
        
    }

    async delete(id) {
        return await firestore.collection(this._collection).doc(id).delete();
    }
}

module.exports = repositoryBase;