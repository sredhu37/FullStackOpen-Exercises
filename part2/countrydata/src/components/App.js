import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './Countries';
import CountryDetails from './CountryDetails';
import SearchFilter from './SearchFilter';

function App() {
    const [countries, setCountries] = useState([]);
    const [matchingCountries, setMatchingCountries] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const effectHook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                setCountries(response.data);
                setMatchingCountries(response.data);
            })
            .catch((error) => {
                console.log(`Unable to load countries list from server: ${error}`);
            });
    }

    useEffect(effectHook, []);

    const searchChangeHandler = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        setMatchingCountries(countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase())));
    }

    return (
        <div>
            <SearchFilter value={searchValue} onChange={searchChangeHandler} />
            <Countries countries={matchingCountries} />
            {/* <CountryDetails country={}/> */}
        </div>
    );
}

export default App;
