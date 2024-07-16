/* eslint-disable react/prop-types */
import ShowWatherInCapitalCity from "./ShowWeatherInCapitalCity"

const ShowCountryInfo = ({exactCountry}) => {
    console.log(exactCountry)
    if (exactCountry) {
      const { name, capital, area, flags } = exactCountry;
      const languages = Object.values(exactCountry.languages)
       return (
        <>
          <h2>{name.common}</h2>
          <h3>Capital: {capital}</h3>
          <h3>Area: {area}</h3>
          <h3>Languages: </h3>
          <ul>
            {languages.map((l, index) =>
              <li key={index}>
                {l}
              </li>
            )}
          </ul>
          <img alt={flags.alt} src={flags.png}/>
          <ShowWatherInCapitalCity capital={capital}/>
        </>
       )
    }
  }

  export default ShowCountryInfo