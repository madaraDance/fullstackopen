const personRouter = require('express').Router()
const Person = require('../models/phonebook')

personRouter.get('/', (request, response, next) => {
  Person.find({})
      .then(people => {
        people ? response.status(200).json(people) : response.status(400).end()
      })
      .catch(e => next(e))
})

personRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      response.json(person)
    })
    .catch(e => next(e))
})

personRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const personToUpdate = {name: request.body.name, number: request.body.number}
  Person.findByIdAndUpdate(id, personToUpdate, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    updatedPerson ? response.status(201).json(updatedPerson) : response.status(400).end()
  })
  .catch(e => next(e))
})

personRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(e => next(e))
})

personRouter.post('', (request, response, next) => {
  const number = request.body.number
  const name = request.body.name

  if (name === ''|| name === null || number === '' ||  number === null) {
    return response.status(400).end("The name or number is missing")
  }

  const newPerson = new Person({"name": name, "number": number})

  newPerson.save()
    .then(savedPerson => {
      savedPerson ? response.status(201).json(savedPerson) : response.status(400).end()
    })
    .catch(e => next(e))
})

personRouter.get('/api/info', (request, response) => {
  response.end(
    ` 
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>${Date()}</p>
    `
  )
})

module.exports = personRouter