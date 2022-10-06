exports.post = async (repository,validator,req,res) => {
    try {
        let data = req.body;
        if(!validator.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição!",
                validation: validator.errors()
            }).end();
            return
        }
        let result = await repository.create(data);
        res.status(201).send(result);
    } catch (error) {
        console.log("Post com erro. Motivo:", error);
        res.status(500).send({
            message: "Erro no processamento",
            error: error
        })
    }
}

exports.put = async (repository,validator,req,res) => {
    try {
        let data = req.body;
        if(!validator.isValid()) {
            res.status(400).send({
                message: "Existem dados inválidos na sua requisição!",
                validation: validator.errors()
            }).end();
            return
        }
        let result = await repository.update(req.params.id, data);
        res.status(202).send(result);
    } catch (error) {
        console.log("Put com erro. Motivo:", error);
        res.status(500).send({
            message: "Erro no processamento",
            error: error
        })
    }
}

exports.get = async (repository,req,res) => {
    try {
        let data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        console.log("Get com erro. Motivo:", error);
        res.status(500).send({
            message: "Erro no processamento",
            error: error
        })
    }
}

exports.getById = async (repository,req,res) => {
    try {
        let id = req.params.id;
        if(id) {
            let data = await repository.getById(id);
            res.status(200).send(data);
        }else {
            res.status(400).send({
                message: "O Parametro ID precisa ser informado!"
            })
        }
    } catch (error) {
        console.log("Get com erro. Motivo:", error);
        res.status(500).send({
            message: "Erro no processamento",
            error: error
        })
    }
}

exports.delete = async (repository,req,res) => {
    try {
        let id = req.params.id;
        if(id) {
            await repository.delete(id);
            res.status(200).send({
                message: "Documento excluido com sucesso!"
            })
        }else {
            res.status(400).send({
                message: "O Parametro ID precisa ser informado!"
            })
        }
    } catch (error) {
        console.log("Delete com erro. Motivo:", error);
        res.status(500).send({
            message: "Erro no processamento",
            error: error
        })
    }
}