import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export function auth(req: Request, res: Response, next) {
  var jwtToken,
    decodedToken;

  req['auth'] = {};

  if (req.header('Authorization')) {
    jwtToken = req.header('Authorization').replace('Bearer ', '');
  }
  else if (req.body.token) {
    jwtToken = req.body.token;
  }
  else {
    return res.status(400).json({
      message: 'Doesn\'t look like you\'re logged in, please login first.'
    });
  }

  try {
    decodedToken = jwt.verify(jwtToken, process.env.ENCRYPTION_KEY);
  } catch (e) {
    return res.status(400).json({
      message: 'Doesn\'t look like you\'re logged in, please login first.'
    });
  }

  req['auth.username'] = decodedToken.username;
  req['auth.password'] = decodedToken.password;

  next();
}

export function editUser() {

}

export function post() {

}