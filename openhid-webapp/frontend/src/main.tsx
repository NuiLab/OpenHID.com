import * as React from 'react';
import { BrowserRouter } from 'react-router';
import { render } from 'react-dom';
import App from './app';

let app = <BrowserRouter>{App}</BrowserRouter>;

render(app, document.getElementById('app'));
