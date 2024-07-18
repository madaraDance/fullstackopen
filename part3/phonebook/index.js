const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons/', (request, response, next) => {
    Phonebook.find({})
      .then(people => {
        people ? response.status(200).json(people) : response.status(400).end()
      })
      .catch(e => next(e))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findById(id)
    .then(person => {
      response.json(person)
    })
    .catch(e => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const personToUpdate = {name: request.body.name, number: request.body.number}
  Phonebook.findByIdAndUpdate(id, personToUpdate, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    updatedPerson ? response.status(201).json(updatedPerson) : response.status(400).end()
  })
  .catch(e => next(e))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Phonebook.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(e => next(e))
})

app.post('/api/persons', (request, response, next) => {
  const number = request.body.number
  const name = request.body.name

  if (name === ''|| name === null || number === '' ||  number === null) {
    return response.status(400).end("The name or number is missing")
  }

  const newPerson = new Phonebook({"name": name, "number": number})

  newPerson.save()
    .then(savedPerson => {
      savedPerson ? response.status(201).json(savedPerson) : response.status(400).end()
    })
    .catch(e => next(e))
})

app.get('/api/info', (request, response) => {
  response.end(
    ` 
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>${Date()}</p>
    `
  )
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})