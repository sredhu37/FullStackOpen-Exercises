import React from 'react';
import { useState } from 'react';

import CountryDetails from './CountryDetails';


const Countries = (props) => {
    const { countries } = props;
    const [countryToDisplay, setCountryToDisplay ] = useState(null);

    const handleShowButtonClick = (countryNumericCode) => {
        return (() => {
            if(countries.length !== 1) {
                const country = countries.find(cntry => cntry.numericCode === countryNumericCode);
                console.log('Country: ', country);
                setCountryToDisplay(country);
            } else {
                console.log('Already being displayed!');
            }
        });
    }

    return (
        <div>
            <ul>
                {
                    countries.map(country => {
                        return (
                            <li key={country.numericCode}>
                                {country.name}
                                <button onClick={handleShowButtonClick(country.numericCode)}>show</button>
                            </li>
                        );
                    })
                }
            </ul>
            {countryToDisplay !== null &&
                <CountryDetails country={countryToDisplay} />
            }
        </div>
    );
}

export default Countries;