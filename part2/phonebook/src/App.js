import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  //2.6
  const addNewName = (e) => {
    e.preventDefault();
  
    //2.7
    const matches = persons.map( person => person.name == newName ? 1 : 0);

    if (matches.indexOf(1) > -1){
      window.alert(newName + " already added to phonebook");
    } else {
      setPersons(persons.concat({name: newName})); 
      setNewName(""); 
    }
  }

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key = {person.name} >{person.name}</p>)}
    </div>
  )
}

export default App