/* eslint-disable react/prop-types */
const ShowCountriesName  = ({filteredCountries, setExactCountry}) => {
    if (filteredCountries.length > 10) {
      return (
        <p>Too Many Matches, specify another filter </p>
      )
    } else {
      return (
        filteredCountries.map((country, i) => {
          return (
            <div key={i}  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <p>{country.name.common}</p> <button onClick={() => setExactCountry(country)}>Show</button>
            </div>
          )
        })
      )
    }
  }


  export default ShowCountriesName