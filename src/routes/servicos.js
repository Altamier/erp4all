const express = require('express');
const router = express.Router();
const servicos_controller = require('../controllers/servicos');

// teste simples
router.get('/testar', servicos_controller.test);
//create
router.post('/create', servicos_controller.create);
//listar
router.get('/id/:id', servicos_controller.details);
router.get('/todos', servicos_controller.detailsAll);
//update
router.put('/:id', servicos_controller.update);
//delete
router.delete('/:id', servicos_controller.delete);
//vincular veiculo ao motorista
router.put('/produtos/:id', servicos_controller.updateproduto);

module.exports = router;
