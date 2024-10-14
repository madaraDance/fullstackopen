import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, ME } from './queries'
import Notify from './components/Notify'
import { useApolloClient } from '@apollo/client';
import LoginForm from "./components/LoginForm"
import Reccomended from "./components/Reccomended"


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)

  const booksResult = useQuery(ALL_BOOKS)
  const authorsResult = useQuery(ALL_AUTHORS)
  const userResult = useQuery(ME)
  
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (booksResult.loading || authorsResult.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const booksFromDB = booksResult.data.allBooks
  const authorsFromDB = authorsResult.data.allAuthors
  const loggedUserFromDB = userResult.data.me
  


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? ( 
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("reccomended")}>reccomended</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("loginform")}>login</button>
        )}
        
      </div>
      <Notify errorMessage={errorMessage} />
      <LoginForm show={page === "loginform"} setToken={setToken} setError={notify} setPage={setPage}/>
      <Authors show={page === "authors"} authors={authorsFromDB} notify={notify} />
      <Books show={page === "books"} books={booksFromDB}/>
      <NewBook show={page === "add"} notify={notify} />
      <Reccomended show={page === "reccomended"} books={booksFromDB} user ={loggedUserFromDB} />
    </div>
  )
}

export default App;
