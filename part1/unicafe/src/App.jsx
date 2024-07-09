/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = good + bad + neutral
  
  const avg = (good - bad) / sum

  const Button = (props) => (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  )

  const TableRow = (props) => (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )

  const Statistics = () => {
    if (sum === 0) {
      return <p>No feedback</p>
    } else {
      return (
        <table>
          <tbody>
            <TableRow text ="good" value={good} />
            <TableRow text ="bad" value={bad} />
            <TableRow text ="neutral" value={neutral} />
            <TableRow text ="all" value={sum} />
            <TableRow text ="average" value={isNaN(avg)? 0 : avg} />
          </tbody>
        </table>
      )

    }
  }

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={() => setGood(good + 1)} text = "good" />
      <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral"/>
      <br />
      <h3>statistics</h3>
      <Statistics />
    </div>
  )
}

export default App