const Course = ({courses}) => courses.map(course => <div><h1>{course.name}</h1>{course.parts.map(part => <p key = {part.name} >{part.name} {part.exercises}</p>)}<b>total of {(course.parts.map(part => part.exercises)).reduce((x, cur) => x + cur)} exercises</b></div>);
// 2.5
export default Course