//importar o banco de dados
let { instrutores, identificadorInstrutor } = require('../bancodedados/bancodedados')
const bancodedados = require('../bancodedados/bancodedados')

//Funções de controle
const listarInstrutores = (req, res) => {
    return res.status(200).json(instrutores);
}

const obterInstrutor = (req, res) => {
    const { id } = req.params;

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(id);
    });

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
    }

    return res.status(200).json(instrutor);
}

const cadastrarInstrutor = (req, res) => {
    const { nome, email, status } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: ` O nome é obrigatório.` })

    }
    if (!email) {
        return res.status(400).json({ mensagem: ` O email é obrigatório.` })

    }

    const instrutor = {
        id: identificadorInstrutor++,
        nome,
        email,
        status: status ?? true
    }

    instrutores.push(instrutor)

    return res.status(201).json(instrutor);

}

const atualizarInstrutor = (req, res) => {
    const { id } = req.params;
    const { nome, email, status } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório' });
    }

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(id);
    });

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
    }

    instrutor.nome = nome;
    instrutor.email = email;
    instrutor.status = status;

    return res.status(204).send();
}

const atualizarStatusInstrutor = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(id);
    });

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
    }

    instrutor.status = status;

    return res.status(204).send();
}

const excluirInstrutor = (req, res) => {
    const { id } = req.params;

    const instrutor = instrutores.find((instrutor) => {
        return instrutor.id === Number(id);
    })

    if (!instrutor) {
        return res.status(404).json({ mensagem: `Instrutor não encontrado.` })
    }

    instrutores = instrutores.filter((instrutor) => {
        return instrutor.id !== Number(id);
    })

    return res.status(204).sand();
}

//IMPLEMENTAÇÃO COM BASE O EXERCÍCIO RESOLVIDO 1
const cadastrarAula = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const instrutor = bancodedados.instrutores.find(instrutor => instrutor.id === Number(id));

    if (!instrutor) {
        return res.status(404).json({ mensagem: `Instrutor não encontrado.` });
    }

    if (!titulo) {
        return res.status(400).json({ mensagem: `O Título é obrigatório.` });
    }

    if (!descricao) {
        return res.status(400).json({ mensagem: `A descrição é obrigatória.` });
    }

    instrutor.aulas.push({ titulo, descricao }); // Adicionar a aula à lista de aulas do instrutor

    res.status(201).json({ mensagem: `A aula foi cadastrada.` });
};

const listarAulas = (req, res) => {
    // Juntar todas as aulas de todos os instrutores em um array
    const todasAulas = bancodedados.instrutores.flatMap(instrutor => instrutor.aulas);

    // Retorna todas as aulas
    res.json(todasAulas);
};

const exibirDetalhesAula = (req, res) => {
    let { id } = req.params;

    //sempre verificar se o id é um Number
    id = Number(id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: 'ID da aula inválido.' });
    }

    // Busco o instrutor pelo id
    const instrutor = bancodedados.instrutores.find(instrutor => instrutor.id === id);

    // Verifico se o instrutor foi encontrado
    if (!instrutor) {
        return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
    }

    // Verifico se o instrutor possui aulas
    if (!instrutor.aulas || instrutor.aulas.length === 0) {
        return res.status(404).json({ mensagem: 'O instrutor não possui aulas cadastradas.' });
    }

    // Resposta: detalhes da primeira aula do instrutor em formato JSON
    res.json(instrutor.aulas[0]);
};

const listarAulasInstrutor = (req, res) => {
    const { id } = req.params;

    const instrutor = bancodedados.instrutores.find(instrutor => instrutor.id === Number(id));

    if (!instrutor) {
        return res.status(404).json({ mensagem: 'Instrutor não encontrado.' });
    }

    // Retorna as aulas do instrutor em formato JSON
    res.json(instrutor.aulas);
};



//exportar as funções de controle na forma de objeto
const funcoesDeControle = {
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
}

module.exports = funcoesDeControle;