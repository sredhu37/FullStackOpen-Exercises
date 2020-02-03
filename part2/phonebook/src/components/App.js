import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [ persons, setPersons] = useState([]);

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('0000000000');
    const [ searchName, setNewSearchName ] = useState('');

    const fetchDataFromServer = () => {
        console.log('Before fetching data from server');
        axios
        .get('http://localhost:3001/persons')
        .then((response) => {
            console.log(`Got response: ${response.data}`);
            setPersons(response.data);
        })
        .catch((error) => {
            console.log(`Cannot fetch data from server: ${error}`);
        });
        console.log('Before fetching data from server');
    }

    useEffect(fetchDataFromServer, []);

    const submitForm = (event) => {
        event.preventDefault();

        if((persons.filter(person => person.name === newName)).length === 0) {
            const newPerson = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            };

            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('0000000000');

            // updateSearchResults();
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value);
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value);
        setNewNumber(event.target.value);
    }

    const updateSearchResults = () => {
        console.log(`Type of persons: ${persons}`);
        const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
        return filteredPersons.map(person => (<p key={person.id}>{person.name} {person.number}</p>));
    }

    const handleSearchNameChange = (event) => {
        console.log(event.target.value);
        setNewSearchName(event.target.value);

        // updateSearchResults();
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>

            <h3>add a new</h3>

            <PersonForm submitForm={submitForm} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>
            <Persons updateSearchResults={updateSearchResults} />
        </div>
    );
}

export default App;
