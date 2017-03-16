export type Portfolio = {
  cover: string,
  icon: string,
  permalink: string,
  title: string,
  description: string,
  authors: string[],
  publishDate: Date,
  lastUpdated: Date,
  views: number,
  tags: string[],
  social: any,
  main: string,
  data: any
}

type Publication = {
  link: string,
  badges: {
    name: string,
    url: string
  }[],
  pictures: string[],
  bibtex: BibTex,
  abstract: string,
  references: BibTex
}

type BibTex = any;