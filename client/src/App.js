import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.js';
import SearchPage from './components/SearchPage/SearchPage.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/profile" />
          <Route path="/applications" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
