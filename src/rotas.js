const express = require('express');

const {
    listarInstrutores,
    obterInstrutor,
    cadastrarInstrutor,
    atualizarInstrutor,
    atualizarStatusInstrutor,
    excluirInstrutor,
    cadastrarAula,
    listarAulas,
    exibirDetalhesAula,
    listarAulasInstrutor
} = require('./controladores/instrutores');

const rotas = express();

//faça rotas com os métodos GET, POST, PUT, PATH e DELETE para cada uma das funções acima:
rotas.get('/instrutores/', listarInstrutores);

rotas.get('/instrutores/:id', obterInstrutor);

rotas.post('/instrutores', cadastrarInstrutor);

rotas.put('/instrutores/:id', atualizarInstrutor);

rotas.patch('/instrutores/:id/status', atualizarStatusInstrutor);

rotas.delete('/instrutores/:id', excluirInstrutor);

//implementação com base no exercicio resolvido 1
rotas.post('/instrtores/aulas/cadastrar-aula/:id', cadastrarAula);

rotas.get('/aulas', listarAulas);

rotas.get('/instrutores/aulas/:id', exibirDetalhesAula);

rotas.get('/instrutores/:id/aulas', listarAulasInstrutor);

module.exports = rotas;