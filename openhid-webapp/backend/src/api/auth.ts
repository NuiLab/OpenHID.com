import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function auth(req: Request, res: Response, next: NextFunction) {
  var jwtToken,
    decodedToken;

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
    decodedToken = jwt.verify(jwtToken, 'TeStSeCrEat');//process.env.ENCRYPTION_KEY);
  } catch (e) {
    return res.status(400).json({
      message: 'Doesn\'t look like you\'re logged in, please login first.'
    });
  }

  req['auth'] = { ...decodedToken };

  next();
}

export function editUser(req, res) {
  res.status(400).json({ message: "WIP" });
}

export function post(req, res) {
  res.status(400).json({ message: "WIP" });
}