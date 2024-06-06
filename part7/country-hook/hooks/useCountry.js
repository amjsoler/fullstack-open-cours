import {useEffect, useState} from "react";

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name) {
        fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => response.json())
            .then(response => {
            setCountry({found: true, data: {name: response.name.common, population: response.population, capital: response.capital, flag: response.flags.png}})
            })
            .catch(() => {
            setCountry({found: false})
            })
        }
    }, [name])

    return country
}