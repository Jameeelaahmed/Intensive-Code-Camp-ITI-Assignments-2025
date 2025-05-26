import { Component } from 'react';
import Movies from './Components/Movies/Movies';
import './App.css'
class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Movie List</h1>
        <Movies />
      </div>
    );
  }
}

export default App;
