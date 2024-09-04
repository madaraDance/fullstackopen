import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateAnecdoteVote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        console.log(state)
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(an => an.content.toLowerCase().includes(state.filters.toLowerCase()))
    })

    anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(updateAnecdoteVote(anecdote))
        dispatch(setNotification(`You voted for "${anecdote.content}" !`, 5))
    }
    
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList