import React from 'react';
import CountryDetails from './CountryDetails';

const Countries = (props) => {
    const { countries } = props;

    const handleShowButtonClick = (countryNumericCode) => {
        return (() => {
            const country = countries.find(cntry => cntry.numericCode === countryNumericCode);
            console.log('Country: ', country);
            return <CountryDetails country={country} />;
        });
    }

    const getContentToDisplay = () => {
        if (countries.length === 1) {
            const country = countries[0];

            return (
                <CountryDetails country={country} />
            );
        } else if(countries.length < 10) {
            const namesArr = [];
            countries.map(country => {
                namesArr.push(
                    <li key={country.numericCode}>
                        {country.name}
                        <button onClick={handleShowButtonClick(country.numericCode)}>show</button>
                    </li>
                );
            });
            return <ul>{namesArr}</ul>;
        } else {
            return <p>Too many matches, specify another filter</p>
        }
    }

    return (
        <div>
            {
                getContentToDisplay()
            }
        </div>
    );
}

export default Countries;