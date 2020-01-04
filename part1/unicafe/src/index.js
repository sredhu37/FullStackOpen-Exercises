import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Heading = (props) => {
    return (
        <h2>
            {props.text}
        </h2>
    );
}

const Button = (props) => {
    return (
        <button onClick={props.onclick}>
            {props.text}
        </button>
    );
}

const Statistic = (props) => {
    return (
        <td>{props.text} {props.value}</td>
    );
}

const Statistics = (props) => {
    if(props.all === 0) {
        return (
            <div>
                No feedback given
            </div>
        );
    }
    return (
        <table>
            <tbody>
            <tr><Statistic text="good" value={props.good}/></tr>
            <tr><Statistic text="bad" value={props.bad}/></tr>
            <tr><Statistic text="neutral" value={props.neutral}/></tr>
            <tr><Statistic text="all" value={props.all}/></tr>
            <tr><Statistic text="average" value={props.average}/></tr>
            <tr><Statistic text="positive" value={props.positive}/></tr>
            </tbody>
        </table>
    );
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [all, setAll] = useState(0);

    const incrementGood = () => {
        setGood(good+1);
        incrementAll();
    }

    const incrementNeutral = () => {
        setNeutral(neutral+1);
        incrementAll();
    }

    const incrementBad = () => {
        setBad(bad+1);
        incrementAll();
    }

    const incrementAll = () => {
        setAll(all+1);
    }

    const calculateAverage = () => {
        return ((good - bad) / all).toFixed(16);
    }

    const calculatePositivePercentage = () => {
        return `${(good / all * 100).toFixed(14)} %`;
    }

    return (
        <div>
            <Heading text="give feedback"/>
            <Button text="good" onclick={incrementGood}/>
            <Button text="neutral" onclick={incrementNeutral}/>
            <Button text="bad" onclick={incrementBad}/>
            <Heading text="statistics"></Heading>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={calculateAverage()} positive={calculatePositivePercentage()}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
