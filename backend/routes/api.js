const express = require('express');
const alunoController = require('../controllers/alunoController');
const armarioController = require('../controllers/armarioController');
const gavetaController = require('../controllers/gavetaController');

const router = express.Router();

// Rotas para Aluno
router.post('/alunos', alunoController.criarAluno);
router.get('/alunos', alunoController.getAlunos);
router.delete('/alunos/:id', alunoController.deleteAluno);
router.get('/alunos/:id/status-pagamento', alunoController.getAlunoStatusPagamento); 

// Rotas para Armário
router.post('/armarios', armarioController.createArmario);
router.get('/armarios', armarioController.getArmarios);
router.delete('/armarios/:id', armarioController.deleteArmario);

// Rotas para Gaveta
router.post('/gavetas', gavetaController.createGaveta);
router.get('/gavetas', gavetaController.getGavetas);
router.delete('/gavetas/:id', gavetaController.deleteGaveta);
router.put('/gavetas/:id/atribuir', gavetaController.atribuirAluno);

module.exports = router;
