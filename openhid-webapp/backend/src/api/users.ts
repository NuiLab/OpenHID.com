import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { success, failure } from './utils';
import { database } from '../db';

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;

/**
 * User Database Schema
 * Users add/edit publications.
 */
export type User = {
  email: string,
  username: string,
  password: string,
  salt: string,
  loginAttempts: number,
  lastLogin: Date,
  social: {
    facebook: string,
    twitter: string,
    github: string
  }
  name: string,
  // Admins can edit all publications, members can edit their own.
  permissions: 'owner' | 'employee' | 'student',
  description: string,
  avatar: string,
}

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

  // Responses
  let sanitized = sanitizeUser({ email: 'a@a.aa', ...req.body });
  if (Object.values(sanitized).reduce((prev, cur) => prev || cur, ''))
    return failure(res, {
      error: 'Failed to login',
      ...sanitized
    });

  let {
    username,
    password
  } = req.body;

  // Query Database
  database.then(async db => {
    let c = db.collection('users');

    let users: User[] = await c.find({ username })
      .toArray();

    if (users.length < 1)
      return failure(res, { error: 'Doesn\'t look like that user exists.' });

    let [user] = users;
    let {
      password: dbPassword,
      salt,
      loginAttempts,
      lastLogin
    } = user;

    if (loginAttempts > MAX_LOGIN_ATTEMPTS)
      if ((new Date().getMilliseconds() - new Date(lastLogin).getMilliseconds()) > 5 * 60 * 1000)
        return failure(res, { error: 'Please try logging after 5 minutes.' });

    if (!(await bcrypt.compare(password, salt))) {
      c.update({ username }, { loginAttempts: loginAttempts < 5 ? '$inc' : 5, lastLogin: new Date() });
      return failure(res, { error: 'Incorrect password, please try again.' });
    }

    let token = jwt.sign({
      username,
      password
    }, process.env.ENCRYPTION_KEY);

    c.update({ username }, { loginAttempts: 0, lastLogin: new Date() });

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
      error: 'Failed to lregister...',
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
      return failure(res, { error: user.email ? 'This email already exists.' : 'This username already exists.' });

    let token = jwt.sign({
      username,
      password
    }, process.env.ENCRYPTION_KEY);

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hashPassword = await bcrypt.hash(password, salt);

    c.update({}, {
      username,
      email,
      password: hashPassword,
      salt,
      loginAttempts: 0,
      lastLogin: new Date()
    });

    success(res, {
      message: '🎉 You\'ve successfully registered!',
      token
    })
  });

}