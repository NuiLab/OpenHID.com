import { Express, Router } from 'express';
import publications from './publications';
import { login, register, forgotPassword, recoverPassword, users } from './users';
import { auth, editUser, post } from './auth';

export default function (app: Express) {

  // User Accounts
  app.post('/api/v1/login', login);
  app.post('/api/v1/register', register);
  //app.post('/api/v1/register', (req, res) => res.status(400).json({ message: 'Registrations are disabled!' }));
  app.post('/api/v1/forgot', forgotPassword);
  app.post('/api/v1/recover', recoverPassword);

  // Data Queries
  app.post('/api/v1/publications', publications);
  app.post('/api/v1/users', users);

  // Editing Content
  app.use('/api/v1/auth', auth);
  app.post('/api/v1/auth/post', post);
  app.post('/api/v1/auth/user', editUser);

  // Default Message
  app.post('/api/v1/*', (req, res) => {
    res.status(200).json({
      message: '⚪ OpenHID API v1.0',
    });
  });

};