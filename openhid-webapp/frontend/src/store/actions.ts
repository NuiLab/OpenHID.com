import { transport, checkHttpStatus, parseJSON } from './utils';

export type APIRequest = {
  permalink?: string,
  data?: boolean,
  tags?: string[],
  meta?: {
    likes?: number,
    views?: number,
    social?: { name: string, url: string }[]
  }
}

export type APIResponse = {
  permalink: string,
  title: string,
  description: string,
  main: string,
  data: string,
  tags: string[],
  publishDate: Date,
  meta?: {
    likes: number,
    views: number,
    social: { name: string, url: string }[]
  }
}

export const failure = (error: string) => ({
  type: 'ERROR',
  payload: { error }
});

export const hideMenu = () => ({
  type: 'HIDE_MENU'
});

const fetchingSubapp = () => ({
  type: 'FETCHING_SUBAPP'
});

const fetchedSubapp = (req: APIRequest, res: APIResponse[]) => ({
  type: 'FETCHED_SUBAPP',
  payload: { req, res }
});

export const setSubapp = (permalink: string) => ({
  type: 'SET_SUBAPP',
  payload: { permalink }
})

export const fetchSubapp = (req: APIRequest) =>
  dispatch => {
    transport('/api/v1/portfolio', req)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(res => dispatch(fetchedSubapp(req, res)))
      .catch((err) => dispatch(failure(err.message)));

    return fetchingSubapp();
  };