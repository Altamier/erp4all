var Produtos = require('../models/produtos');

exports.test = (req, res) => {
    res.json({ message: 'Teste de retorno' });
};

//Adicionar ao BD
exports.create = (req, res) => {
    let produtos = new Produtos(
        {
            nomeProprietario: req.body.nomeProprietario,
            placa: req.body.placa,
            renavam: req.body.renavam
        }
    );
    produtos.save((error, produtos) => {
        if (error) console.error(error)
        res.json(produtos)
    })
};

exports.details = async (req, res) => {
    await Produtos.findById(req.params.id, (error, produtos) => {
        if (error) console.error(error)
        res.json(produtos)
    })
};

exports.update = async (req, res) => {
    console.log(req.body);
    await Produtos.findOneAndUpdate(req.params.id, {
        $set:
        {
            nomeProprietario: req.body.nomeProprietario,
            placa: req.body.placa,
            renavam: req.body.renavam
        }
    }, { new: true }, (error, produtos) => {
        if (error) console.error(error)
        res.json(produtos)
    })
};

exports.delete = async (req, res) => {
    await Produtos.findOneAndRemove(req.params.id, (error) => {
        if (error) console.error(error)
        res.json({ message: 'Produtos Deletado' });
    })
};