import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { success, failure } from './utils';
import { database } from '../db';

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;

/**
 * User Database Schema
 * Users can add/edit publications, as
 * well as share their research profile.
 */
export type User = {
  email: string,
  username: string,
  password: string,
  salt: string,
  loginAttempts: number,
  lastLogin: Date,
  social?: {
    facebook?: string,
    twitter?: string,
    github?: string
  }
  name: string,
  // Admins can edit all publications, members can edit their own.
  permissions: 'owner' | 'employee' | 'student',
  description: string,
  avatar: string,
}

/**
 * User API Request Type
 */
export type UserAPI = {
  username: string,
  email?: string,
  password: string
}

/**
 * A sanitize check of a login request,
 * returns errors coresponding to parameter name.
 */
export function sanitizeUser({username, email, password}: UserAPI): UserAPI {
  return {
    username: username
      ? (username.match(/([^A-z0-9])+/)
        ? 'Usernames can only be made of letters and numbers.'
        : '')
      : 'Please enter a username.',
    email: email
      ? (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ? 'Emails must have an @ symbol and a top level domain (like .com).'
        : '')
      : 'Please enter an email.',
    password: password
      ? (password.length < 8
        ? 'Passwords must be at least 8 characters long.'
        : (password.match(/^([^A-Z0-9])+$/)
          ? 'Passwords must contain a Capital letter and number.'
          : '')
      )
      : 'Please enter a password.'
  }
}

/**
 * Login Endpoint
 */
export function login(req: Request, res: Response) {

  let {
    username,
    password
  } = req.body;

  // Responses
  let sanitized = sanitizeUser({
    email: 'a@a.aa',
    ...req.body
  });

  if (Object.values(sanitized).reduce((prev, cur) => prev || cur, ''))
    return failure(res, {
      error: 'Failed to login',
      ...sanitized
    });

  // Query Database
  database.then(async db => {

    let c = db.collection('users');

    let users: User[] = await c.find({ username })
      .toArray();

    if (users.length < 1)
      return failure(res, {
        error: 'Doesn\'t look like that user exists.'
      });

    let [user] = users;
    let {
      password: dbPassword,
      loginAttempts,
      lastLogin
    } = user;

    if (loginAttempts >= MAX_LOGIN_ATTEMPTS)
      if ((new Date().getTime() - new Date(lastLogin).getTime()) < 5 * 60 * 1000)
        return failure(res, {
          error: 'Please try logging in after 5 minutes.'
        });

    if (!(await bcrypt.compare(password, dbPassword, ))) {
      await c.update({ username },
        {
          $inc: {
            loginAttempts: loginAttempts < 5 ? 1 : 0
          },
          $set: {
            lastLogin: new Date()
          }
        },
        {
          upsert: true
        })
        .catch(err => console.error(err));

      return failure(res, { error: 'Incorrect password, please try again.' });
    }

    let token = jwt.sign({
      username,
      password
    }, 'TeStSeCrEat');//process.env.ENCRYPTION_KEY);

    await c.update({ username }, {
      $set: {
        loginAttempts: 0,
        lastLogin: new Date()
      }
    }, { upsert: true })
      .catch(err => console.error(err));

    success(res, {
      message: 'Login successful!',
      token
    })
  });
}

/**
 * Register Endpoint
 */
export function register(req: Request, res: Response) {
  // Responses
  let sanitized = sanitizeUser(req.body);
  if (Object.values(sanitized).reduce((prev, cur) => prev || cur, ''))
    return failure(res, {
      error: 'Failed to register...',
      ...sanitized
    });

  let {
    username,
    email,
    password
  } = req.body;

  // Query Database
  database.then(async db => {
    let c = db.collection('users');

    let users: User[] = await c.find({ $or: [{ username }, { email }] })
      .toArray();
    let [user] = users;

    if (user)
      return failure(res, { error: user.email === email ? 'This email already exists.' : 'This username already exists.' });

    let token = jwt.sign({
      username,
      password
    }, 'TeStSeCrEat');//process.env.ENCRYPTION_KEY);

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hashPassword = await bcrypt.hash(password, salt);

    c.update({ username }, {
      username,
      email,
      password: hashPassword,
      salt,
      loginAttempts: 0,
      lastLogin: new Date()
    }, { upsert: true });

    success(res, {
      message: '🎉 You\'ve successfully registered!',
      token
    })
  });

}

/**
 * Password Recovery Endpoint
 * @TODO - Finish, Captcha, GET endpoint with hash for recovered password, Google Auth
 */
export function recoverPassword(req: Request, res: Response) {
  let { email } = req.body;

  if (!email)
    failure(res, { error: 'Please provide an email so we can email your account. ' });

  database.then(async db => {
    let c = db.collection('users');

    let users = c.find({ email }).toArray();

  });
}

/**
 * Editing User
 */
export function editUser(req, res) {
  res.status(400).json({ message: "WIP" });
}

/**
 * 
 */
export function post(req, res) {
  res.status(400).json({ message: "WIP" });
}

/**
 * Querying for users.
 */
export function users(req: Request, res: Response) {

  database.then(async db => {
    let c = db.collection('users');

    let users = c.find({}, {
      password: 0,
      salt: 0,
      loginAttempts: 0,
      lastLogin: 0
    })
      .skip(0)
      .limit(10)
      .toArray();

    success(res, {
      message: 'Here\'s the list of users!',
      data: users
    });
  })
}