import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/reducer'
import axios from 'axios'
import { getAnecdotes, updateAnecdote } from './requests'


const App = () => {

  const dispatch = useDispatch()
  const queryClient =  useQueryClient() 

  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      //queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const anecdoteToUpdate = {...anecdote, votes: anecdote.votes +1}
    newAnecdoteMutation.mutate(anecdoteToUpdate)
    dispatch(setNotification(`You voted for "${anecdote.content}" !`, 5))
    console.log('vote')
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.error){
    return <div>Anecdote service is not available due to problems in server</div> 
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
