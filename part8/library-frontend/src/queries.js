import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title,
      author,
      published,
      id
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount,
      id
    }
  }
`
export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
    genres
  }
}
`
export const EDIT_BORN = gql`
mutation EditBorn($name: String!, $born: Int!) {
  editBorn(
    name: $name,
    born: $born
    ) {
    name
    born
    id
  }
}
`