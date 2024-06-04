import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const App = () => {

  const queryClient = useQueryClient()
  const voteAnecdote = async (anecdote) => {
    fetch(`http://localhost:3001/anecdotes/${anecdote.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...anecdote, votes: anecdote.votes + 1})
    }).then(response => response.json())
  }

  const voteNoteMutation = useMutation({mutationFn: voteAnecdote, onSuccess: () => queryClient.invalidateQueries('anecdotes')})

  const handleVote = (anecdote) => {
    voteNoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: 'anecdotes',
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      return response.json()
    }
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  else if(result.isError) {
    return <div>error loading data</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
