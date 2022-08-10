const express = require("express");
const cors = require("cors");
const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyAdsV_3vUf8JGNac2f2oDIkpU2eafEm0Sw",
    authDomain: "node-firebase-rest-api-1aa2e.firebaseapp.com",
    projectId: "node-firebase-rest-api-1aa2e",
    storageBucket: "node-firebase-rest-api-1aa2e.appspot.com",
    messagingSenderId: "665049429400",
    appId: "1:665049429400:web:6ff730b13a4971636b67ed",
    measurementId: "G-6RMSSND4GL"
};

firebase.initializeApp(firebaseConfig);

const app = express();

//configurando o Body Parser
app.use(express.json());

//definindo a utilizacao do cors
app.use(cors());

//definindo o tipo de banco de dados
const db = firebase.firestore();

//definindo a colecao do banco de dados
const User = db.collection('users');

// //criando rota de teste
// app.get("/", (req, res, next) => {
//     //enviando uma resposta para a requisicao
//     res.status(201).send({
//         msg: "Hello World!"
//     });
// });

//definindo as rotas para o crud (sem a definicao de recursos)

//recuperando todos os documentos da colecao
app.get('/', async (req, res) => {
    const snapshot = await User.get();
    console.log(snapshot);
    //criando o objeto que ira receber o json com os documentos
    const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    console.log(users);
    res.send(users);
})

//recuperando um documento especifico na colecao
app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const snapshot = await User.get()
    const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    //filtrando dentro do retorno para encontrar o documento com o id enviado por parametro
    const user = users.filter(uid => {
        return uid.id == id;
    });
    res.send(user);
})

//salvando um documento na colecao
app.post('/', async (req, res) => {
    //armazenando o corpo da requisicao em um objeto
    const data = req.body;
    console.log(data);
    //inserindo o objeto na colecao
    await User.add(data);
    //enviando uma resposta para a requisicao
    res.status(201).send({
        msg: "Usuario cadastrado!"
    })
})

//fazendo a atualizacao de um documento
app.put('/:id', async (req, res) => {
    const id = req.params.id;
    await User.doc(id).update(req.body);
    res.send({
        msg: "Usuario alterado!"
    })
})

//deletando um usuario
app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await User.doc(id).delete();
    res.send({
        msg: "Usuario deletado!"
    })
})

//definindo a porta onde o servidor estara ouvindo
app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
})

