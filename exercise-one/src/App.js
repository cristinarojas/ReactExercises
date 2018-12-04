import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // this is the state.
    this.state =  {
      todos: []
    }

    // Binding all the context of this class.
    // we can do this section with an arrow function.
    this.saveTodo = this.saveTodo.bind(this);

    // React dataflow, props are the only way that parent components interact with their children.
    // To modify a child, you re-render it with new props.
    // There are a few cases where you need to imperatively modify a child outside
    // of the typical dataflow.
    this.inputRef = React.createRef();
  }

  // componentDidMount: Is invoked immediately after a component is mounted (inserted into the tree)
  // here - load data from remote endpoint, network request, to set up any subscriptions
  async componentDidMount() {
    const res = await fetch("http://localhost:3000/todos"); // For making a request and fetching a resource fetch("here the path to the resource you want to fetch")
    const json = await res.json();

    // You may call setState() immediately in this cycle.
    this.setState(
      {
        todos: json
      }); // It will trigger an extra rendering, but it will happen before the browser updates the screen.
  }

  // Method to save.
  async saveTodo(e) {
    e.preventDefault(); // cancels the event if it is cancelable

    // object with the post method, headers type, and the body that have the current value of the input.
    const options = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo: this.inputRef.current.value }) // To convert it into a string
    };

    const res = await fetch("http://localhost:3000/todos", options); // fetching the todos and options object.
    const json = await res.json(); // all data in json format.

    this.setState({ todos: json }); // sending the new data to the state.
    this.inputRef.current.value = null; // cleaning the input.

    return false; // return false.
  }


  render() { // We must write this method always that we have class component.
    return (
      <div className="App">
        <form onSubmit={this.saveTodo}>
          <ul>
            {this.state.todos.map((item, i) =>
              <li key={i}>{item}</li>
            )}
          </ul>

          <input placeholder="add todo" ref={this.inputRef} />
        </form>
      </div>
    );
  }
}

export default App;
