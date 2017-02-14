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