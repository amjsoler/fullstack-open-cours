import { useState } from 'react'

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const StatisticLine = ({text, value}) => {
return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    return (
        <>
            <h2>statistics</h2>
            {all === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="all" value={all} />
                        <StatisticLine text="average" value={parseFloat(average).toFixed(1)} />
                        <StatisticLine text="positive" value={parseFloat(positive).toFixed(1).toString() + " %"} />
                    </tbody>
                </table>
            )}
        </>
    )
}

const App = () => {
    // guarda los clics de cada botón en su propio estado
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState(0)

    function goodCallback() {
        const newGood = good + 1
        const newAll = all + 1

        setGood(newGood)
        setAll(newAll)
        setAverage(calculateAverage(newGood, bad, newAll))
        setPositive(calculatePositive(newGood, newAll))
    }

    function neutralCallback() {
        const newNeutral = neutral + 1
        const newAll = all + 1

        setNeutral(newNeutral)
        setAll(newAll)
        setAverage(calculateAverage(good, bad, newAll))
        setPositive(calculatePositive(good, newAll))
    }

    function badCallback() {
        const newBad = bad + 1
        const newAll = all + 1

        setBad(newBad)
        setAll(newAll)
        setAverage(calculateAverage(good, newBad, newAll))
        setPositive(calculatePositive(good, newAll))
    }

    function calculateAverage(good, bad, all) {
        return (good - bad)/all
    }

    function calculatePositive(good, all) {
        return good*100/all
    }

    return (
        <div>
            <h1>give feedback</h1>

            <Button onClick={goodCallback} text="good"/>
            <Button onClick={neutralCallback} text="neutral" />
            <Button onClick={badCallback} text="bad" />

            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        </div>
    )
}

export default App