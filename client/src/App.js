import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.js';
import SearchPage from './components/SearchPage/SearchPage.js';
import NavigationBar from './components/Navigation/Navigation.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavigationBar path="/" component={NavigationBar} />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/applications" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
