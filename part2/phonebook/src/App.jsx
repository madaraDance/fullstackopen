import { useEffect, useState } from 'react'
import PrintNames from './components/PrintNames'
import PhoneBookForm from './components/PhoneBookForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'
import Notification from './components/MessageNotification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    phonebookService.getAll()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  const handleSumbit = (event) => {
    event.preventDefault()

    let isNameUnique = !persons.some(person => person.name === newName)
    let isPhoneUnique = !persons.some(person => person.number === newNumber)

    if(isNameUnique && isPhoneUnique) {
      const person = {
        name: newName,
        number: newNumber,
      }

      phonebookService.addNew(person)
      .then(respone => {
        setPersons(persons.concat(respone.data))
        setMessage(`Added ${person.name}`)
        setTimeout(() => {
          setMessage('')
        }, 1000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage('')
        }, 3000)
      })
      
    } else if(!isNameUnique && isPhoneUnique) {

      const isConfirmed = window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`)

        if(isConfirmed) {
          const person = persons.find(p => p.name === newName)
          const personWithNewNumber = {...person, number: newNumber}
          phonebookService.update(person.id, personWithNewNumber)
          .then(response => setPersons(persons.map(p => p.id === response.data.id ? response.data : p)))
          .catch((error) => {
            console.log(error)
            setErrorMessage(
              `${error.response.data.error}`
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 3000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
        }

    } else {
      alert(`Either ${newName} or ${newNumber} are already added to phonebook`)
    }
  }

  const handleChange = (event) => {
    if (event.target.id === "name") {
      setNewName(event.target.value)
    } else {
      setNewNumber(event.target.value)
    }
  }

  const handleDelete = (person) => {
    console.log('delete')
    const isConfirmed = window.confirm(`Delete ${person.name}`)
    if(isConfirmed) {
      phonebookService.deleteEntry(person.id)
      .then(() => {
        phonebookService.getAll()
        .then(response => {
          setPersons(response.data)
      })
    .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(
          `Person '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} />
        <ErrorNotification message={errorMessage} />
        <Filter setFilter={setFilter} />
        <PhoneBookForm 
          handleSumbit={handleSumbit}
          handleChange={handleChange}
          newName={newName}
          newNumber={newNumber}
        />
      <h3>Numbers</h3>
      <div>
        <PrintNames persons={persons} filter={filter} handleDelete={handleDelete}/>
      </div> 
    </div>
  )
}

export default App