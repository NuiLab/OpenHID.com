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
  // Get POST parameters
  let apiReq: PublicationAPI = sanitize(req.body);

  // Design Query
  let query = {
    ...apiReq,
    publishDate: { $lte: new Date() }
  };
  delete query.limit;
  delete query.skip;

  // Responses
  let failure = () => res.status(400).json({ error: "We can't find these posts. :(" });
  let success = msg => res.status(200).json(msg);

  database.then(
    db => {
    let c = db.collection('portfolio');

    let projection = {
      permalink: 1,
      title: 1,
      description: 1,
      cover: 1,
      meta: 1,
      tags: 1,
      data: 1,
      main: 1,
      publishDate: 1
    }

    let data = c.find(query, projection)
      .sort({
        publishDate: 1
      })
      .skip(apiReq.skip)
      .limit(apiReq.limit)
      .toArray((err, data) => {
        if (err || data.length === 0)
          return failure();
        success(data);
      });
  });
}