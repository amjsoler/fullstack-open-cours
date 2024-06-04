import {useDispatch, useSelector} from "react-redux";
import {initializeAnecdotes, setAnecdotes, vote, voteAnecdoteThunk} from "../reducers/anecdoteReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";
import {useEffect} from "react";

export const AnecdotesList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes)).filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, []);

    const HandleVote = (anecdote) => {
        dispatch(voteAnecdoteThunk(anecdote))
    }

    return (
        anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => HandleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )
    )
}