import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const anecdote = (event) => {
      event.preventDefault()
      dispatch(createAnecdote(event.target.anecdote.value))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={anecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm