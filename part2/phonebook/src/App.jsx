import {useEffect, useState} from 'react'
import noteService from "./services/noteService.js";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState({message: null, type: null})

    useEffect(() => {
        noteService.getAllNotes()
            .then(response => {
                setPersons(response)
            })
    }, []);

    const savePersonHandler = (event) => {
        event.preventDefault()

        if(persons.find(person => person.name === newName)) {
            const result = window.confirm(`Contact is already added to the phonebook: ${newName}. Replace the old number with a new one?`)

            if(result) {
                const person = persons.find(person => person.name === newName)
                const changedPerson = {...person, number: newNumber}

                noteService.putPerson(changedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
                    })
                    .catch(error => {
                        setMessage({
                            message: `Error occurred while adding contact ${newName} to the phonebook: ${error}`,
                            type: "error"
                        })
                    })
            }
        }
        else{
            const personObject = {
                name: newName,
                number: newNumber
            }

            noteService.createNote(personObject)
                .then(response => {
                    setPersons(persons.concat(response))
                })
                .catch(error => {
                    setMessage({
                        message: `Error occurred while adding contact ${newName} to the phonebook: ${error}`,
                        type: "error"
                    })
                })

            setNewName('')
            setNewNumber('')
        }

        setMessage({
            message: `Contact ${newName} added to the phonebook`,
            type: "success"
        })
    }

    const deletePersonHandler = (id) => {
        const response = window.confirm("Do you really want to delete this person?")

        if(response) {
            noteService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setMessage({
                        message: `Error occurred while deleting contact ${newName} from the phonebook: ${error}`,
                        type: "error"
                    })
                })
        }
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

            <Notification notification={message}/>

            <Filter
                filter={filter}
                onChangeFilter={onChangeFilter}
            />

            <NewPerson
                newName={newName}
                newNumber={newNumber}
                newNameChangeHandler={onChangeNewName}
                newNumberChangeHandler={onChangeNewNumber}
                savePersonHandler={savePersonHandler}
            />

            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filter}
                deletePersonHandler={deletePersonHandler}
            />
        </div>
    )
}

const Notification = ({notification}) => {
    if(notification.message === null) {
        return null
    }

    const styleNotification = {
        backgroundColor: notification.type === "success" ? "green" : "red",
        color: "white",
    }
    return (
        <div style={styleNotification}>
            {notification.message}
        </div>
    )

}

const DeletePersonButton = ({person, deletePersonHandler}) => {
    return <button onClick={() => deletePersonHandler(person.id)} key={`delete-${person.name}`}>delete</button>

}

const Person = ({person}) => {
    return <li key={person.name}>{person.name} {person.number}</li>
}

const Persons = ({persons, filter, deletePersonHandler}) => {
    return !persons || persons.length === 0 ? <p>No persons to show</p> : (
        filter === "" ?
            (persons.map(person =>
                <section key={`mappersons-${person.name}`}>
                    <Person key={person.name} person={person} />
                    <DeletePersonButton key={`deletebutton-${person.name}`} person={person} deletePersonHandler={deletePersonHandler}/>
                </section>
            )) :
            (persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                <section key={`filterpersons-${person.name}`}>
                    <Person key={person.name} person={person} deletePersonHandler={() => deletePersonHandler(person.id)}/>
                    <DeletePersonButton key={`deletefilteredbutton-${person.name}`} person={person} deletePersonHandler={deletePersonHandler}/>
                </section>
            ))
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