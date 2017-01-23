import * as React from 'react';
import { Match, Miss, Redirect} from 'react-router';
import { Nav } from './components';
import { Home, Publications, About, NotFound } from './views';

import './css';

const App = (
    <div>
      <Nav />
      <Match exactly pattern="/" component={Home} />
      <Match pattern="/publications" component={Publications} />
      <Match pattern="/about" component={About}/>
      <Miss component={NotFound} />
    </div>
);

export default App;
