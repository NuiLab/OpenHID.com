import { Express } from 'express';
import publications from './publications';
import { login, register } from './users';

export default function(app: Express) {
  app.post('/api/v1/login', login);
  app.post('/api/v1/register', register);
  app.post('/api/v1/publications', publications);
};