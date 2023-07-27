import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //1.6
  const goodIncrease = () => setGood(good + 1);
  const neutralIncrease = () => setNeutral(neutral + 1);
  const badIncrease = () => setBad(bad + 1);

  // 1.7
  //var average = (good + (bad * -1)) / (good + bad + neutral);
  //var positive = (good / (good + bad +  neutral)) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button buttonEvent={goodIncrease} text = "good"/>
        <Button buttonEvent={neutralIncrease} text = "neutral"/>
        <Button buttonEvent={badIncrease} text = "bad"/>
      </div>
      <h1>statistics</h1>
      <Statistics good = {good} bad = {bad} neutral={neutral}/>
    </div>
  )
}

// 1.8
const Statistics = ({good, bad, neutral}) =>
{
  // 1.9
  if(good == 0 && bad == 0 && neutral == 0)
  {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  var average = (good + (bad * -1)) / (good + bad + neutral);
  var positive = (good / (good + bad +  neutral)) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text = "good" value = {good} percentage = "no"/>
        <StatisticLine text = "neutral" value = {neutral} percentage = "no"/>
        <StatisticLine text = "bad" value = {bad} percentage = "no"/>
        <StatisticLine text = "average" value = {average} percentage = "no"/>
        <StatisticLine text = "positive" value = {positive} percentage = "yes"/>
      </tbody>
    </table>
  );
};

// 1.10
const Button = ({buttonEvent, text}) => <button onClick={buttonEvent}>{text}</button>;

const StatisticLine = ({text, value, percentage}) => {
  if(percentage == "yes") return <tr><td>{text}</td><td>{value} %</td></tr>;
  return <tr><td>{text}</td><td>{value}</td></tr>;
}

export default App