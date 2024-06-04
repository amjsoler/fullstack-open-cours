import {useDispatch} from "react-redux";
import {create, createAnecdote} from "../reducers/anecdoteReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";
import anecdotesService from "../services/anecdotesService.js";

export const NewNote = () => {
    const dispatch = useDispatch()

    const HandlerCreateNote = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.name.value))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={HandlerCreateNote}>
                <div><input name="name"/></div>
                <button>create</button>
            </form>
        </>
    )
}