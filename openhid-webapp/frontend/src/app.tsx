import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './components';
import { Home, Publications, About, User, Publication, NotFound } from './views';

const App = (
  <div>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/publications" component={Publications} />
      <Route exact path="/about" component={About} />
      <Route path="/:user" component={User} />
      <Route path="/:user/:permalink" component={Publication} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
