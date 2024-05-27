const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

var morgan = require('morgan')

var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.use(cors())

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = String(req.params.id)

    Person.findById(id).then(person => {
        if(person) {
            res.json(person)
        }else{
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    let person = new Person({
        name: req.body.name,
        number: req.body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).end()
    })
    .catch(error => {
        console.log(error)
        res.status(404).end()
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(422).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})