import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personsService from '../services/persons';

const App = () => {
    const [ persons, setPersons] = useState([]);

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('0000000000');
    const [ searchName, setNewSearchName ] = useState('');

    const fetchDataFromServer = () => {
        console.log('Before fetching data from server');
        personsService
            .getAll()
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

            personsService
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setNewName('');
                    setNewNumber('0000000000');
                })
                .catch(error => {
                    console.log(`Error while sending new user to server: ${error}`);
                });
        } else {
            const result = window.confirm(`newName is already added to phonebook, replace the old number with a new one?`);
            if(result) {
                const existingPerson = persons.find(person => person.name === newName);
                const newPersonInfo = { ...existingPerson, number: newNumber }

                personsService
                    .update(existingPerson.id, newPersonInfo)
                    .then(response => {
                        setPersons(persons.map(person => {
                            if(person.id === existingPerson.id) {
                                person = response.data;
                            }
                            return person;
                        }));
                    })
                    .catch(error => {
                        console.log(`Error in updating the number for ${existingPerson.name}`);
                    })
            }
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

    const deletePerson = (id, name) => {
        const result = window.confirm(`Delete ${name}`);
        if(result) {
            personsService
            .deleteOne(id)
            .then(response => {
                setPersons(persons.filter(person => person.id !== id));
            })
            .catch(error => console.log(`Error in deleting the person: ${error}`));
        }
    }

    const updateSearchResults = () => {
        console.log(`Type of persons: ${persons}`);
        const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
        return filteredPersons.map(person => (<p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>));
    }

    const handleSearchNameChange = (event) => {
        console.log(event.target.value);
        setNewSearchName(event.target.value);
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
