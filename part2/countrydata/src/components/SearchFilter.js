import React from 'react';

const SearchFilter = (props) => {
    const { value, onChange } = props;

    return (
        <form>
            Find countries <input value={value} onChange={onChange} />
        </form>
    );
}

export default SearchFilter;