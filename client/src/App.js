import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage.js';
import SearchPage from './components/SearchPage/SearchPage.js';
import NavigationBar from './components/Navigation/Navigation.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import Resume from './components/Resume/Resume.js';
import CoverLetter from './components/CoverLetter/CoverLetter.js';
import {Helmet} from 'react-helmet';

class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>autoApply</title>
          <link rel="canonical" href="localhost:8080/" />
        </Helmet>
        <BrowserRouter>
          <NavigationBar path="/" component={NavigationBar} />
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/search" exact component={SearchPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/applications" />
            <Route path="/resume/:id" component={Resume} />
            <Route path="/coverLetter/:id" component={CoverLetter} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
