var Servico = require('../models/servicos');
var Produtos = require('../models/produtos');
const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectID;

exports.test = (req, res) => {
    res.json('Teste de retorno');
};

//Adicionar ao BD
exports.create = (req, res) => {
    let servico = new Servico(
        {
            nome: req.body.nome,
            sobreNome: req.body.sobreNome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            status: req.body.status,
            dataCadastro: new Date(),
            dataAtualizacao: new Date(),
            veiculos: req.body.veiculos
        }
    );
    servico.save((error, servico) => {
        if (error) console.error(error)
        res.json(servico)
    })
};

exports.details = async (req, res) => {
    await Servico.findById(req.params.id, (error, driver) => {
        if (error) console.error(error)
        res.json(driver)
    })
};

exports.detailsAll = async (req, res) => {
    await Servico.find({}, (err, servico) => {
        if (err) console.error(err)
        res.json(servico);
    })
}

exports.update = async (req, res) => {
    await Servico.findOneAndUpdate(req.params.id, {
        $set:
        {
            nome: req.body.nome,
            sobreNome: req.body.sobreNome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            status: req.body.status,
            // dataCadastro: req.params.dataCadastro, --Data de cadastro normalmente não muda.
            dataAtualizacao: new Date()
        }
    }, { new: true }, (error, driver) => {
        if (error) console.error(error)
        res.json(driver)
    })
};

exports.delete = async (req, res) => {
    await Servico.findOneAndRemove(req.params.id, (error, driver) => {
        if (error) console.error(error)
        res.json({ message: 'Servico Deletado' });
    })
};

exports.updateproduto = async (req, res) => {
    //buscar o id do veiculo, se existe faz o update
    Produtos.findById(req.body.produtoid).then(result => {
        if (!result) return res.status(404).send('Produto Não Encontrado')
        Servico.findOneAndUpdate(req.params.id, {
            $Servico:
            {
                produtos: req.body
            }
        }, { new: true }, (error, driver) => {
            if (error) console.error(error)
            res.json(driver)
        })
    })
};