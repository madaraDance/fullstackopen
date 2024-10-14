import { useState} from "react"
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [chosenGenre, setGenre] = useState("")

  const { data, loading, error, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre === "" ? null : chosenGenre}
  })

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks

  const genres = new Set()
  props.books.forEach((book) => {
    book.genres.forEach((genre) => {
      genres.add(genre)
    });
  })

  const genreArray = Array.from(genres)

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreArray.map((g) => (
        <button key={g} onClick={async () =>{
          setGenre(g)
          props.booksResult.refetch()
          refetch()
          }}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all</button>
    </div>
  )
}

export default Books
