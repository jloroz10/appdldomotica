import logo from './logo.svg';
import React,{Component} from 'react';
// import FirstComponent from './components/FirstComponent';
// import SecondComponent from './components/SecondComponent';
// import Counter from './components/Counter';
import TodoApp from './components/bitso/TodoApp';
import './bootstrap.css'
import './App.css';
function App() {
  return (
    <div className="App">
        {/* <Counter></Counter> */}
          <React.Fragment>
            <TodoApp/>
          </React.Fragment>
      </div>
  );
}

export default App;
