import { useState} from "react"
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const booksByGenreResult = useQuery(BOOKS_BY_GENRE)
  const [chosenGenre, setGenre] = useState("")

  const books = props.books 

  const genres = new Set()
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      genres.add(genre)
    });
  })

  const genreArray = Array.from(genres)

  const filteredBooks = chosenGenre
  ? books.filter((book) => book.genres.includes(chosenGenre))
  : books;


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
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreArray.map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all</button>
    </div>
  )
}

export default Books
