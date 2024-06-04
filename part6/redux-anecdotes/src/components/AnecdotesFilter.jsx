import {useDispatch} from "react-redux";
import {setFilter} from "../reducers/anecdotesFilterReducer.js";

const AnecdotesFilter = () => {
    const dispatch = useDispatch()

    const HandlerChangeFilter = (event) => {
        event.preventDefault()
        const filter = event.target.value
        console.log(filter)
        dispatch(setFilter(filter))
    }

    return (
        <>
            <form>
                <input name="anecdoteFilter" onChange={HandlerChangeFilter} type="text" placeholder="Filter anecdotes" />
            </form>
        </>
    )
}

export default AnecdotesFilter