import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const[name, setName] = useState('Hello');
  const[age, setAge] = useState(0);
  const[country, setCountry] = useState('');
  const[position, setPosition] = useState('');
  const[wage, setWage] = useState(0);

  const[employeeList, setEmployeeList] = useState([]);

  const[newWage, setNewWage] = useState(0);

  const addEmployee = () => {
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

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees')
    .then((response) => {
      setEmployeeList(response.data);
    });
  }

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', 
      {wage: newWage, id: id})
    .then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

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
      <hr/>
      <div>
        { employeeList.map((val, key) => {
          return <div>
                    <div>
                      <p>{val.name}</p>
                      <p>{val.age}</p>
                      <p>{val.country}</p>
                      <p>{val.position}</p>
                      <p>{val.wage}</p>
                    </div>
                    <input type='text'
                      onChange = {(event) => {
                        setNewWage(event.target.value);
                      }}
                    />
                    <button onClick={ () => { updateEmployeeWage(val.id) } }>Update</button>
                    <button onClick={() => { deleteEmployee(val.id) }}>Delete</button>
                 <hr/>
                 </div> 
        })}
        <button onClick={ getEmployees }>Show employee list</button>
      </div>
    </div>
  );
}

export default App;
