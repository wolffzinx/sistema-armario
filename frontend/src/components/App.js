import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [alunos, setAlunos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: '', matricula: '', email: '', telefone: '' });

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    const response = await axios.get('http://localhost:3000/alunos');
    setAlunos(response.data);
  };

  const handleChange = (e) => {
    setNovoAluno({ ...novoAluno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/alunos', novoAluno);
    fetchAlunos(); // Atualiza a lista de alunos
    setNovoAluno({ nome: '', matricula: '', email: '', telefone: '' }); // Limpa o formulário
  };

  const handleDeleteAluno = async (id) => {
    await axios.delete(`http://localhost:3000/alunos/${id}`);
    fetchAlunos(); // Atualiza a lista de alunos
  };

  return (
    <div>
      <h1>Gerenciamento de Armários</h1>
      
      <h2>Cadastrar Aluno</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" value={novoAluno.nome} onChange={handleChange} placeholder="Nome" required />
        <input type="text" name="matricula" value={novoAluno.matricula} onChange={handleChange} placeholder="Matrícula" required />
        <input type="email" name="email" value={novoAluno.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="telefone" value={novoAluno.telefone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit">Adicionar Aluno</button>
      </form>

      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno._id}>
            {aluno.nome} - {aluno.matricula}
            <button onClick={() => handleDeleteAluno(aluno._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;