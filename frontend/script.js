

document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://backend-six-sigma-24.vercel.app/';
    const alunosContainer = document.getElementById('alunos-container'); // Elemento onde os dados serão exibidos

    // Função para buscar e listar os alunos
    async function listarAlunos() {
        try {
            const response = await fetch(`${apiUrl}/alunos`); // Endpoint da API
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.status}`);
            }

            const alunos = await response.json(); // Converte a resposta para JSON

            // Limpa o container antes de adicionar novos dados
            alunosContainer.innerHTML = '';

            // Exibe os alunos no frontend
            alunos.forEach(aluno => {
                const alunoElement = document.createElement('div');
                alunoElement.className = 'aluno';
                alunoElement.innerHTML = `
                    <p><strong>Nome:</strong> ${aluno.nome}</p>
                    <p><strong>Curso:</strong> ${aluno.curso}</p>
                    <p><strong>Armário:</strong> ${aluno.armario || 'Nenhum'}</p>
                    <p><strong>Status:</strong> ${aluno.status}</p>
                    <hr>
                `;
                alunosContainer.appendChild(alunoElement);
            });
        } catch (error) {
            console.error('Erro ao listar alunos:', error);
            alunosContainer.innerHTML = '<p>Não foi possível carregar os alunos. Tente novamente mais tarde.</p>';
        }
    }

    // Chamar a função ao carregar a página
    listarAlunos();

    const form = document.getElementById('form-criar-aluno');
    const mensagemContainer = document.getElementById('mensagem-container');

    // Função para criar aluno
    async function criarAluno(event) {
        event.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

        // Captura os dados do formulário
        const nome = document.getElementById('nome').value;
        const matricula = document.getElementById('matricula').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const statusPagamento = document.getElementById('status_pagamento').checked;

        const aluno = {
            nome: nome,
            matricula: matricula,
            email: email,
            telefone: telefone,
            status_pagamento: statusPagamento,
        };

        try {
            const response = await fetch(`${apiUrl}/alunos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aluno),
            });

            const data = await response.json();

            if (response.ok) {
                mensagemContainer.style.color = 'green';
                mensagemContainer.textContent = 'Aluno criado com sucesso!';
            } else {
                mensagemContainer.style.color = 'red';
                mensagemContainer.textContent = `Erro ao criar aluno: ${data.message}`;
            }
        } catch (error) {
            console.error('Erro ao criar aluno:', error);
            mensagemContainer.style.color = 'red';
            mensagemContainer.textContent = 'Erro ao conectar com a API. Tente novamente mais tarde.';
        }
    }

    // Associa o evento de envio do formulário à função
    form.addEventListener('submit', criarAluno);


    async function adicionarArmario() {
        const numero = document.getElementById('numero').value; // Campo para o número do armário
        const localizacao = document.getElementById('localizacao').value; // Campo para a localização do armário
    
        // Verifica se ambos os campos foram preenchidos
        if (!numero || !localizacao) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
    
        try {
            // Faz a requisição POST para o endpoint da API
            const response = await fetch('https://sua-api.com/armarios', { // Substitua pela URL do seu endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numero: numero,
                    localizacao: localizacao,
                }),
            });
    
            if (response.ok) {
                alert('Armário adicionado com sucesso!');
                // Aqui você pode limpar os campos ou redirecionar para outra página
                document.getElementById('numero').value = '';
                document.getElementById('localizacao').value = '';
            } else {
                const erro = await response.json();
                alert(`Erro ao adicionar armário: ${erro.message}`);
            }
        } catch (error) {
            console.error('Erro ao adicionar armário:', error);
            alert('Ocorreu um erro ao tentar adicionar o armário. Tente novamente mais tarde.');
        }
    }
    

    
});
