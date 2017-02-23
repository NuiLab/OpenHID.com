import { Request, Response } from 'express';
import { database } from '../db';

/**
 * API for finding/updating API posts
 */
export type PublicationAPI = {
  find: Publication,
  update: Publication[]
}

/**
 * Cleans up query prior to feeding it to MongoDB
 */
function sanitize(user: Publication) {

}

/**
 * Publications are stored in BibJSON,
 * With extra metainformation for OpenHID
 */
export type Publication = {
  title: string,
  author: { name: string }[],
  type: 'article' | 'publication' | 'capstone',
  year: string,
  journal: { name: string, identifier: { id: string, type: string }[], volume: string, pages: string },
  link: { anchor: string, url: string }[],
  identifier: { type: string, id: string, url: string }[]
  files: ({ icon: string, name: string, url: string }),
  extras: {
    tags: string[],
    coverImage: string,
    paperImage: string,
    abstract: string,
  }
}

export default function(req: Request, res: Response) {
    res.status(400).json({ message: "WIP" });
}