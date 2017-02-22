import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import { database } from './db';
import api from './api';
import { renderPage } from './render';

const app = express();

// Configure Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ level: 9 }));
app.use((err, req, res, next) => res.status(500).json({ error: '💫 We\'re not sure what happened...' }));

// Route Frontend
const root = path.join(__dirname, '..', '..', 'frontend');
app.use('/assets', express.static(path.join(root, 'assets')));
api(app);
app.get('*', renderPage);

// Server Start
app.listen(8000, () => {
  console.log('⚪ OpenHID.com Running @ port 8000');
});

// Expose Modules
export {app, database};