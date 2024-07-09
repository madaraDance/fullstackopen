/* eslint-disable react/prop-types */
const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 'Fundamentals of React',
        exercises: 10
      },
      {
        part: 'Using props to pass data',
        exercises: 7
      },
      {
        part: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  } 

  const Content = (props) => {
    return (
      <div>
        <Part part={props.parts[0]}/>
        <Part part={props.parts[1]}/>
        <Part part={props.parts[2]}/>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.part.part} {props.part.exercises}</p>
    )
  }

  const Total = (props) => {
    return (
      <p>Number of exercices {props.sum}</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total sum = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

export default App