import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeVote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(an => an.id === id)
      if (anecdoteToChange) {
        anecdoteToChange.votes = action.payload.votes
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {changeVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdoteVote = (anecdote) => {
  const anecdoteToUpdate = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdoteToUpdate)
    dispatch(changeVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
