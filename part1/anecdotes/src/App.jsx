import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0,  0, 0,  0,  0,  0, 0])


  const handleUpvote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const MostVoted = () => {
    const biggestNumber = Math.max(...votes)
    if (biggestNumber === 0) {
      return (
        <p>Not enough votes to show Anecdote with the most votes</p>
      )
    } else {
      return (
        <>
          <p>
            {anecdotes[votes.indexOf(biggestNumber)]}<br />
            has {biggestNumber} votes
          </p>
        </>
      )
    }
  }

  return (
    <div>
      <h2>{anecdotes[selected]}</h2>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <button onClick={handleUpvote}>vote</button>
      <br />
      <h2>Anecdote with most votes</h2>
      <MostVoted />
    </div>
  )
}

export default App