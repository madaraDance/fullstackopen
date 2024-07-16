const Course = ({course}) => {
    const total = course.parts.reduce((accumulator, currentvalue) => accumulator + currentvalue.exercises, 0)

    const Header = ({name}) => {
        return (
          <h1>{name}</h1>
        )
    }

    const Content = ({parts}) => {
        return (
          <div>
            <Header name={course.name} />
            <div>
                {parts.map(part => 
                    <Part key={part.id} part={part}/>
                )}
            </div>
            <p><b>Total of {total} of exercises</b></p>
          </div>
        )
      }

    const Part = ({part}) => {
        return (
            <p>{part.name} {part.exercises}</p>
        )
    }

    return (
        <div>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course