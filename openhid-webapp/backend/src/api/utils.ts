import { Response } from 'express';

export function failure(res: Response, error: Object) {
  res.status(400).json(error);
}

export function success(res: Response, msg: Object) {
  res.status(200).json(msg);
}