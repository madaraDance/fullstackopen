import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query allBooks($authorId: ID, $genre: String) {
    allBooks(authorId: $authorId, genre: $genre) {
      title
      author {
        name
        id
      }
      published
      genres
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
export const ME = gql`
query {
  me {
    username,
    favoriteGenre,
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
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`