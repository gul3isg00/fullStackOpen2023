import { useState, useEffect } from 'react'
import peopleServices from './services/people';

const App = () => {

  const [persons, setPersons] = useState([]);

  //2.12
  useEffect(() => {peopleServices.getAllPeople().then(p => {setPersons(p)})},[]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  //2.9
  const [filter, setFilter] = useState('');

  const peopleToDisplay = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  //2.6
  const addNewName = (e) => {
    e.preventDefault();
  
    //2.7
    const matches = persons.map( person => person.name == newName ? 1 : 0);

    if (matches.indexOf(1) > -1){
      window.alert(newName + " already added to phonebook");
    } else {
      const personObj = {name: newName, number: newNum};
      //2.12
        peopleServices.createPerson(personObj);
        setPersons(persons.concat(personObj)); 
        setNewName(""); setNewNum("");
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  //2.8
  const handleNumChange = (e) => setNewNum(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>
      
      <PersonForm addNewName={addNewName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} newName={newName} newNum={newNum}/>

      <h3>Numbers</h3>

      <Persons peopleToDisplay={peopleToDisplay}/>
    </div>
  );
}

//2.10
const Filter = ({filter, handleFilterChange}) => <div>Filter shown with <input value = {filter} onChange={handleFilterChange}/></div>;
const PersonForm = ({addNewName, handleNameChange, handleNumChange, newName, newNum}) => (
  <form onSubmit={addNewName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNum} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
);
const Persons = ({peopleToDisplay}) => {
  const deletePerson = (id) => {
    console.log("delete",id);
    peopleServices.deletePerson(id);
  };
 return (peopleToDisplay.map(person => <div key = {person.name} >{person.name} {person.number} <button onClick={deletePerson(person.id)}>delete</button></div>));
}

export default App