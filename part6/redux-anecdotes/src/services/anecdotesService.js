const baseUrl = 'http://localhost:3001/anecdotes'
const anecdotesService = {
    getAll: async () => {
        const response = await fetch(baseUrl)
        return await response.json()
    },

    createAnecdote: async (anecdote) => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: anecdote,
                votes: 0
            })
        })
        return await response.json()
    },

    voteAnecdote: async (anecdote) => {
        const newAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        const response = await fetch(`${baseUrl}/${anecdote.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAnecdote)
        })

        return await response.json()
    }
}

export default anecdotesService