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

// Returns an anonymous function which maps
// Each part in the list to the formatting
// of the "Part" and returns each
// one "Part" component for each element
// of the list
const Content = (props) => 
{
    return(props.parts.map((part) => {
      return (<Part name = {part.name} exercises = {part.exercises} />);
    }));
};

const Part = (props) => 
(
  <p>{props.name} {props.exercises}</p>
);

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