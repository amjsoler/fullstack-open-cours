import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const savePersonHandler = (event) => {
        event.preventDefault()

        if(persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const personObject = {
            name: newName,
            number: newNumber
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const onChangeFilter = (event) => {
        setFilter(event.target.value)
    }

    const onChangeNewName = (event) => {
        setNewName(event.target.value)
    }

    const onChangeNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChangeFilter={onChangeFilter} />
            <NewPerson newName={newName} newNumber={newNumber} newNameChangeHandler={onChangeNewName} newNumberChangeHandler={onChangeNewNumber} savePersonHandler={savePersonHandler} />
            <h2>Numbers</h2>
            <ul>
                {persons.filter(person =>
                    person.name.toLowerCase().includes(filter.toLowerCase()))
                        .map(person =>
                            <li key={person.name}>{person.name} {person.number}</li>
                        )
                }
            </ul>
        </div>
    )
}

const Filter = ({filter, onChangeFilter}) => {
    return (
        <p>filter shown with <input value={filter} onChange={onChangeFilter}/></p>
    )
}

const NewPerson = ({newName, newNameChangeHandler, newNumber, newNumberChangeHandler, savePersonHandler}) => {
    return (
        <form onSubmit={savePersonHandler}>
            <div>
                name: <input value={newName} onChange={newNameChangeHandler}/>
                phone: <input value={newNumber} onChange={newNumberChangeHandler}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default App