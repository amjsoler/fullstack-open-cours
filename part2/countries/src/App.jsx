import {useEffect, useState} from "react";
import CountryService from "./services/CountryService.js";

const SearchForm = ({search, handleSearchChange}) => {
    return (
        <div>
            find countries <input value={search} onChange={handleSearchChange}/>
        </div>
    )
}

function App() {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        CountryService.getAllCountries()
            .then(response => {
                setCountries(response)
            })
    }, []);

    const handleSearchChange = (event) => {
        const newValueSearch = event.target.value

        setSearch(newValueSearch)
    }

    const filteredCountries = () => {
        return countries.filter(country =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
        )
    }

  return (
    <>
        <SearchForm search={search} handleSearchChange={handleSearchChange} />
        {
            (filteredCountries().length > 10) ? <p>Too many matches, specify another filter</p> :
                (filteredCountries().length > 1 && filteredCountries().length <= 10) ? filteredCountries().map(country => <p key={country.name.common}>{country.name.common}</p>) :
                    (filteredCountries().length === 1) ? (
                        <div>
                            <h1>{filteredCountries()[0].name.common}</h1>
                            <p>area {filteredCountries()[0].area}</p>
                            <h3>languages:</h3>
                            <ul>
                                {Object.values(filteredCountries()[0].languages).map(language => <li key={language}>{language}</li>)}
                            </ul>
                            <img src={filteredCountries()[0].flags.png} alt={filteredCountries()[0].name.common} width="100"/>
                        </div>
                        ) :
                        <p>No matches, specify another filter</p>
        }
    </>
  )
}

export default App
