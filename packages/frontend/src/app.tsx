import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Navbar } from './components';
import { Home, Publications, About, User, Publication, NotFound } from './views';

const App = (
  <div style={{ width: '100vw', height: '100vh' }}>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/404" component={NotFound} />
      <Route exact path="/about" component={About} />
      <Route exact path="/publications" component={Publications} />
      <Route exact path="/publications/:permalink" component={Publication} />
      <Route exact path="/:user" component={User} />
    </Switch>
  </div>
);

export default App;
