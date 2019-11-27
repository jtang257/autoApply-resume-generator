import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" />
          <Route path="/profile" />
          <Route path="/applications" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
