// Root component
const App = () => {

  // Changed all of the data about the course into
  // An object so the data is more manageable
  const course = 
  {
    name: "Half Stack application development",
    parts: 
    [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  // The data being returned by the root component
  return (
    <div>
      <Header course = {course} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

// ----------------------------
// Indivdual components of page
// -----------------------------

// Renders the name of the course
const Header = (props) => 
(
  <h1>{props.course.name}</h1>
);

// Renders the parts and their numer of exercises
const Content = (props) => 
{
  // I write an anonymous function within the return
  // data, which maps all the values in the list
  // to a format in which they can be rendered.
  return (
    <b>
      {props.parts.map((part) => {
        return (<p>{part.name} {part.exercises}</p>);
      })}
    </b>
  );
};

// Renders the number of total exercises.
const Total = (props) => 
{
  // Calls anonymous function to calculate total number of 
  // excercises
  var num = (function() {
    var i = 0;
    for(var x = 0; x!=props.parts.length;x++)
    {
      i = i + props.parts[x].exercises;
    }
    return i;
  })();

  // Returns the total HTML with the total number of exercises
  return (
    <p>Number of exercises {num}</p>
  );
};


export default App