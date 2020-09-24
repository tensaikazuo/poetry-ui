import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';
import Input from './Input';
import Output from './Output';

createStore({
  data: {}
});

function App() {
  return (
    <StateMachineProvider>
      <Router>
        <Route exact path="/" component={Input} />
        <Route path="/output" component={Output} />
      </Router>
    </StateMachineProvider>
  );
}

export default App;
