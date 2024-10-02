import { useState, useEffect } from "react"
import {useMutation } from '@apollo/client'
import { EDIT_BORN } from "../queries"

const EditAuthor = ({authors, notify}) => {
    const [born, setBorn] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        if (authors.length > 0) {
          setName(authors[0].name); // Set the first author as default once available
        }
      }, [authors])

      const [ editBorn ] = useMutation(EDIT_BORN, {
        onError: (error) => {
          const messages = error.graphQLErrors.map(e => e.message).join('\n')
          props.notify(messages)
        }
      })

    const submit = async (event) => {
        event.preventDefault()
    
        editBorn({  variables: {born, name } })
    
        setBorn('')
      }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit} style={{display: "flex", flexDirection: "column", width: "7%"}}>
                <select
                onChange={({ target }) => {
                    console.log(target.value)
                    setName(target.value)
                }}>
                    <option value="" disabled>Select an author</option>
                    {authors.map((a) => (
                    <option 
                    key={a.name}
                    value={a.name}
                    >
                        {a.name}
                    </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Enter birthyear :"
                    style={{marginTop: "10px"}}
                    value={born}
                    onChange={({ target }) => {
                        const bornAsNumber = Number(target.value)
                        setBorn(bornAsNumber)
                    }}
                    />
                    <button type="submit" style={{marginTop: "10px"}}>Update birthyear</button>
            </form>
        </div>
    )
}

export default EditAuthor