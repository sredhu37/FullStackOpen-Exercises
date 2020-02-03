import React from 'react';

const CountryDetails = (props) => {
    const { country } = props;

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' width={500} height={300}/>
        </div>
    );
}

export default CountryDetails;