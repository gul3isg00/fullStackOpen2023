import { useState, useEffect } from 'react'
import peopleServices from './services/people';
import './index.css';

const App = () => {

  const [persons, setPersons] = useState([]);

  //2.12
  useEffect(() => {peopleServices.getAllPeople().then(p => p.code == null ? setPersons(p) : setDisplayMessage("Cannot get phone numbers - bad request",true))},[]);

  //2.16
  const [displayMessage, setDisplayMessage] = useState(['',false]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  //2.9
  const [filter, setFilter] = useState('');

  const peopleToDisplay = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const updateDisplayMessage = (message, bad) => setDisplayMessage([message,bad]);

  const getNewID = () => {
    var highest = 0;
    persons.forEach(person => {
      if(person.id > highest) highest = person.id;
    })
    console.log("newID:",highest+1);
    return highest+ 1;
  };

  //2.6
  const addNewName = (e) => {
    e.preventDefault();
  
    //2.7
    const matches = persons.map( person => person.name == newName ? 1 : 0);
    var newPersons = [...persons];
    if (matches.indexOf(1) > -1){
      persons.forEach(person => {
        if(person.name == newName){
          if(person.number != newNum){
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
              peopleServices.updatePerson(person.id,{...person, number: newNum}).then(r => {
                const newPerson = {...person, number: newNum};
                console.log(newPerson);
                console.log(r);
                if(r.name != null && r.name == newPerson.name) {
                  newPersons[newPersons.indexOf(person)] = newPerson
                  updateDisplayMessage(`${person.name}'s phone number has been updated.`,false);
                } else r.request.status == 404 ? updateDisplayMessage(`${person.name} has already been removed from the server.`,true) : updateDisplayMessage(`${person.name} cannot be updated.`,true);
              });
            }
          }
          else updateDisplayMessage(`${person.name} already added to phonebook.`,true);
        }
      });
      setPersons(newPersons);
    } else {
      const personObj = {name: newName, number: newNum, id: getNewID()};
      //2.12
        peopleServices.createPerson(personObj).then(r => r.code != null ? updateDisplayMessage(`Couldn't add ${newName}, bad request`,true) : updateDisplayMessage(`Added ${newName}`,false));
        setPersons(persons.concat(personObj)); 
        setNewName(""); setNewNum("");
    }
  };

  //2.14
  const removeName = (id) => {
    var newPersons = [...persons];
    const curPerson = persons.filter(person => person.id == id)[0];
    newPersons.splice(persons.indexOf(curPerson),1);
    setPersons(newPersons);
  }

  const handleNameChange = (e) => setNewName(e.target.value);
  //2.8
  const handleNumChange = (e) => setNewNum(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <MessageDisplay message={displayMessage[0]} bad = {displayMessage[1]}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>
      
      <PersonForm addNewName={addNewName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} newName={newName} newNum={newNum}/>

      <h3>Numbers</h3>

      <Persons updateDisplayMessage={updateDisplayMessage} peopleToDisplay={peopleToDisplay} localDelete={removeName}/>
    </div>
  );
}

const MessageDisplay = ({message, bad}) => message === ''? <div></div>: (bad ? <div style = {{color: "red"}}className='message'>{message}</div> : <div className='message'>{message}</div>)

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
const Persons = ({peopleToDisplay, localDelete, updateDisplayMessage}) => {
 return (peopleToDisplay.map(person => <div key = {person.name} >{person.name} {person.number} <button onClick = {() => {if(window.confirm(`Do you want to delete ${person.name}?`)){peopleServices.deletePerson(person.id).then(r => {
  console.log(r);
  r.code != null ? updateDisplayMessage(`${person.name} has already been removed from the server.`,true) : updateDisplayMessage(`${person.name} deleted.`,false);
  localDelete(person.id);
 });}}}>delete</button></div>));
}

export default App