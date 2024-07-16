import { useEffect, useState } from 'react'
import CountryService from './services/CountryService'
import ShowCountriesName from './components/ShowCountriesName'
import ShowCountryInfo from './components/ShowCountryInfo'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [exactCountry, setExactCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    CountryService.getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    const filtered = filter != '' ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())) : countries
    
    setFilteredCountries(filtered)

    if (filtered.length === 1) {
      setExactCountry(filtered[0])
    } else {
      setExactCountry(null)
    }
  }, [filter, countries])

  return (
    <>
    <p>Find countries</p><input type="text" onChange={event => setFilter(event.target.value)}/>
    {!exactCountry ? <ShowCountriesName  filteredCountries={filteredCountries} setExactCountry={setExactCountry} /> : <ShowCountryInfo exactCountry={exactCountry}/>}
    </>
  )
}

export default App
