const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find(p => p.id === id )
  response.json(person)
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find(p => p.id === id )
  person.number = request.body.number
  console.log(person)
  console.log(phonebook)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  phonebook = phonebook.filter(p => p.id !== id )
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const number = request.body.number
  const name = request.body.name

  if (name === ''|| name === null || number === '' ||  number === null) {
    return response.end("The name or number is missing")
  }

  if (phonebook.some(p => p.name === name)) {
    return response.json({ error: 'name must be unique' })
  }

  const newPerson = {"id": generateId(), "name": name, "number": number}
  phonebook = phonebook.concat(newPerson)
  response.json(newPerson)
})

app.get('/api/info', (request, response) => {
  response.end(
    ` 
      <p>Phonebook has info for ${phonebook.length} people</p>
      <p>${Date()}</p>
    `
  )
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})