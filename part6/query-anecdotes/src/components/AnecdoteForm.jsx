import {useMutation, useQueryClient} from "@tanstack/react-query";

const AnecdoteForm = () => {

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation({
        mutationFn: newNote =>
            fetch('http://localhost:3001/anecdotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNote)
            }).then(response => response.json()),
        onSuccess: () => {
            console.log('new anecdote added')
            queryClient.invalidateQueries('anecdotes')
        }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
