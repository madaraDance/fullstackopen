import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from './queries'
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)

  if (booksResult.loading || authorsResult.loading) {
    return <div>loading...</div>
  }
  
  const booksFromDB = booksResult.data.allBooks
  const authorsFromDB = authorsResult.data.allAuthors

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} authors={authorsFromDB} notify={notify} />

      <Books show={page === "books"} books={booksFromDB} />

      <NewBook show={page === "add"} notify={notify} />
    </div>
  );
};

export default App;
