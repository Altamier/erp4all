const express = require('express');
const router = express.Router();
const produtos_controller = require('../controllers/produtos');

// teste simples
router.get('/testar', produtos_controller.test);
router.post('/create', produtos_controller.create);
router.get('/:id', produtos_controller.details);
router.put('/:id', produtos_controller.update);
router.delete('/:id', produtos_controller.delete);

module.exports = router;
