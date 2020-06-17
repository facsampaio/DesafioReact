import React, {useState, useEffect} from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {api.get('repositories').then(response => setRepositories(response.data))},[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:`New repo - number: ${Math.floor(100*Math.random())}`,
      url: `New github url - id: ${Math.floor(100*Math.random())}`,
      techs: `New Tech`
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const url = `repositories/${id}`;
    console.log(url)
    await api.delete(url);

    const newRepositories = repositories.filter((repository) => repository.id !== id );

    setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
