import { useState, useEffect } from 'react'
import countryServices from './services/countryAPI';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    countryServices.getAllCountries().then(r => r != null ? setCountries(r) : console.log("error"));
  }, [])

  const filteredCountries = countries.filter((c) => c.name != null && c.name.common.toLowerCase().includes(searchInput.toLowerCase()));

  const handleChange = (e) => setSearchInput(e.target.value)

  return (
    <div className="App">
      find countries <input value = {searchInput} onChange = {handleChange} />
    <Countries filteredCountries = {filteredCountries}/>
    </div>
  );
}

const Countries = ({filteredCountries}) =>  {

    const getLanguages = (languages) => {
      var lanList = [];
      for(const key in languages) lanList.push(languages[key]);
      return lanList;
    } 

    return (
    filteredCountries.length > 10 ? 
    <div>Too many matches, specify another filter</div> : 

    filteredCountries.length > 1 ?
    filteredCountries.map((c) => <div key = {c.name.common}>{c.name.common} <button>show</button></div>):
    filteredCountries.map((c) => 
    <div key = {c.name.common + "div"}>
      <h1 key = {c.name.common}>{c.name.common}</h1>
      <div key = {c.name.common + "capital"}>captial {c.capital.map((cap) => cap)}</div>
      <div key = {c.name.common + "area" }>area {c.area}</div>
      <h3 key = {c.name.common + "languages"}>languages:</h3>
      <ul key = {c.name.comon + "ul"}>
        {getLanguages(c.languages).map((lan) => <li key = {lan} >{lan}</li>)}
      </ul>
      <img key = {c.name.common + "image"}  src = {c.flags.png} alt={c.flags.alt}/>
    </div>)
    )
  }

export default App;
