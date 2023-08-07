import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

// 2.1 & 2.2 & 2.3 & 2.4
// const Course = ({courses}) => courses.map(course => <div><h1>{course.name}</h1>{course.parts.map(part => <p key = {part.name} >{part.name} {part.exercises}</p>)}<b>total of {(course.parts.map(part => part.exercises)).reduce((x, cur) => x + cur)} exercises</b></div>);

export default App