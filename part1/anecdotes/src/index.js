import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const anecdotesObjects = [
        {
            quote: 'If it hurts, do it more often',
            votes: 0
        },
        {
            quote: 'Adding manpower to a late software project makes it later!',
            votes: 0
        },
        {
            quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            votes: 0
        },
        {
            quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            votes: 0
        },
        {
            quote: 'Premature optimization is the root of all evil.',
            votes: 0
        },
        {
            quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
            votes: 0
        }
    ];

    const [selected, setSelected] = useState(0)
    const [anecdotes, setAnecdotes] = useState(anecdotesObjects);

    const showRandomAnecdote = () => {
        const index = Math.floor(Math.random() * anecdotes.length);
        console.log(index);
        setSelected(index);
    }

    const handleVote = () => {
        const newAnecdotes = [...anecdotes];
        newAnecdotes[selected].votes += 1;
        setAnecdotes(newAnecdotes);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected].quote}
            <p>
                has {anecdotes[selected].votes} votes
            </p>
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={showRandomAnecdote}>next anecdote</button>
            </div>

            <h1>Anecdote with most votes</h1>
            {(anecdotes.reduce((left, right) => (left.votes < right.votes) ? right : left)).quote}
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
