import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const[name, setName] = useState('Hello');
  const[age, setAge] = useState(0);
  const[country, setCountry] = useState('');
  const[position, setPosition] = useState('');
  const[wage, setWage] = useState(0);

  const addEmployee = () => {
    console.log(name);
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    })
    .then(() => {
      console.log('success');
    });
  }

  return (
    <div className="App">
      <div>
      	<label>Name:</label>
      	<input type='text' onChange={ (event) => { setName(event.target.value) } }/>
      	<label>Age:</label>
      	<input type='number'  onChange={ (event) => { setAge(event.target.value) } }/>
      	<label>Country:</label>
      	<input type='text'  onChange={ (event) => { setCountry(event.target.value) } }/>
      	<label>Position:</label>
      	<input type='text'  onChange={ (event) => { setPosition(event.target.value) } }/>
      	<label>Wage (month):</label>
      	<input type='number'  onChange={ (event) => { setWage(event.target.value) } }/>
        <button onClick={ addEmployee }>Add</button>
      </div>
    </div>
  );
}

export default App;
