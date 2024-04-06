const express = require('express');

const { listarInstrutores, obterInstrutor, cadastrarInstrutor, atualizarInstrutor, atualizarStatusInstrutor, excluirInstrutor, cadastrarAula } = require('./controladores/instrutores');

const rotas = express();

//faça rotas com os métodos GET, POST, PUT, PATH e DELETE para cada uma das funções acima:
rotas.get('/instrutores/', listarInstrutores);

rotas.get('/instrutores/:id', obterInstrutor);

rotas.post('/instrutores', cadastrarInstrutor);

rotas.put('/instrutores/:id', atualizarInstrutor);

rotas.patch('/instrutores/:id/status', atualizarStatusInstrutor);

rotas.delete('/instrutores/:id', excluirInstrutor);

rotas.post('/instrtores/cadastrar-aula/:id', cadastrarAula);

module.exports = rotas;