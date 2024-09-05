import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { postAnecdote } from '../requests'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/reducer'
const ANECDOTE_MIN_LENGTH = 5

const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  }
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const queryClient =  useQueryClient() 

  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(setNotification(`New Anecdote Created: "${newAnecdote.content}" `, 5))
      //queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length < 5) {
      dispatch(setNotification(`Too short anecdote, must have length "${ANECDOTE_MIN_LENGTH}" or more `, 5))
    } else {
      newAnecdoteMutation.mutate(asObject(content))
      console.log('new anecdote', newAnecdoteMutation)
    }

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
