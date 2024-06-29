import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './component/MyComponent';
import React from 'react';

class App extends React.Component {

  state = {
    name: 'Huy',
    address: 'CTU-CanTho University',
    age: 19
  }

  handleClick = (event) => {
    console.log(this.state.name)
    this.setState({
      name: 'Yahoo!',
      age: Math.floor(Math.random() * 100 + 1)
    });
  }

  handleMouseOver(event) {
    //   console.log(event.clientX)
    //   console.log(event.clientY)
  }

  render() {
    return (
      <div>
        <div>
          My name is {this.state.name}, {this.state.age} ys, U can call me Evan &amp; I come from {this.state.address}
          <button onClick={this.handleClick}>Click Me!</button>
          <button onMouseOver={this.handleMouseOver}>Hover Me</button>
        </div>
        <MyComponent />
      </div>
    );
  }
}



// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Hello world Yue
//     </p>
//     <div>Count = {count}</div>
//     <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//     <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//   </header>
// </div>
//   );
// }

export default App;
