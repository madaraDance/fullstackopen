import { useSelector, useDispatch } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(an => an.content.toLowerCase().includes(state.filters.toLowerCase()))
    })

    anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(changeVote(id))
        dispatch(setNotification(`You voted for "${content}" !`, 5))
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList