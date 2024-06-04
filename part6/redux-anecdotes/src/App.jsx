import {NewNote} from "./components/NewNote.jsx";
import {AnecdotesList} from "./components/AnecdotesList.jsx";
import AnecdotesFilter from "./components/AnecdotesFilter.jsx";
import Notification from "./components/Notification.jsx";
import {useSelector} from "react-redux";


const App = () => {
    const notification = useSelector(state => state.notification)
  return (
    <div>
        {notification && <Notification />}
      <h2>Anecdotes</h2>
        <AnecdotesFilter />
        <AnecdotesList />
      <NewNote />
    </div>
  )
}

export default App