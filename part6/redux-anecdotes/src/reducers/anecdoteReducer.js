import { v4 as uuidv4 } from 'uuid'
import {createSlice} from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotesService.js";
import {setNotification} from "./notificationReducer.js";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: uuidv4(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload
        },
        vote(state, action) {
            const noteToChange = state.find(n => n.id === action.payload.id)
            const changedNote = {
                ...noteToChange,
                votes: noteToChange.votes + 1
            }
            return state.map(note =>
                note.id !== action.payload.id ? note : changedNote
            )
        },
        create(state, action) {
            return [...state, action.payload]
        },

        voteAnecdote(state, action) {
            return state.map(anecdote => anecdote.id === action.payload.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
        }
    }
})

export const voteAnecdoteThunk = (anecdote) => {
    return async dispatch => {
        dispatch(voteAnecdote(await anecdotesService.voteAnecdote(anecdote)))
        dispatch(setNotification(`You voted for: ${anecdote.content}`))
    }
}
export const initializeAnecdotes = () => {
    return async dispatch => {
        dispatch(setAnecdotes(await anecdotesService.getAll()))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        dispatch(create(await anecdotesService.createAnecdote(content)))
        dispatch(setNotification(`You created: ${content}`))
    }
}

export const { vote, create, setAnecdotes, voteAnecdote } = reducer.actions
export default reducer.reducer