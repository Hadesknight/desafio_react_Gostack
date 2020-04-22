import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repository, setRepository] = useState([])

  async function loadRepo(){  
    const response = await api.get('repositories')

    
    setRepository(...repository, response.data)
  }

  useEffect(() => {
    loadRepo()
  },[])


  const repoToAdd = {
    "url":"https://github.com/Hadesknight/BootCamp_RocketSeat",
    "title":"Desafio React.js",
    "techs":["ReactJs"]
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', repoToAdd)

    setRepository([...repository, response.data])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const newRepo = repository.filter(repo => repo.id !== id )

    setRepository(newRepo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
 
        {repository.map(repo => (
              <li key={repo.id}>
               {repo.title}  
              <button onClick={() => handleRemoveRepository(repo.id)}>
                 Remover
               </button>
             </li>
   
         ))}     
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
