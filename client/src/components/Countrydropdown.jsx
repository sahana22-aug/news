import React from 'react';

function Countrydropdown({ selectedCountry, onCountryChange }) {
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'gb', name: 'United Kingdom' },
    // Add more countries as needed
  ];

  return (
    <div className="country-dropdown">
      <label htmlFor="country">Select Country: </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Countrydropdown;