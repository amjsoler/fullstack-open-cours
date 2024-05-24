const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    return fetch(`${baseURL}/all`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
}

export default {getAllCountries}