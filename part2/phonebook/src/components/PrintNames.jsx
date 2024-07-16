const PrintNames = ({persons, filter, handleDelete}) => {
    const filteredPersons = filter != '' ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
    return (
      filteredPersons.map((person, i) => 
        <p key={i}>
          {person.name} {person.number} <button value={person} onClick={() => handleDelete(person)}>Delete</button>
        </p>
      )
    )
  }

  export default PrintNames