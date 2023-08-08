import { gql } from '@apollo/client'

export const SIGNUP = gql`

mutation createUser($username: String!, $password: String!, $favoriteGenre: String!) {
  createUser(username: $username, password: $password, favoriteGenre: $favoriteGenre) {
    username
    favoriteGenre
  }
}

`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
    friends {
      username
      favoriteGenre
    }
    friendOf {
        username
        favoriteGenre
    }
  }
}
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
        name
        born
        bookCount
   }
  }
`

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
      name
      born
      bookCount
}
`

export const BOOK_COUNT = gql`
query {
    bookCount
}
`

export const AUTHOR_COUNT = gql`
query {
    authorCount
}
`

export const ALL_USERS = gql`

query {
  allUsers {
    username
    favoriteGenre
    friends
  }
}

`

export const ALL_BOOKS = gql`
query {
    allBooks {
      ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const ALL_BOOKS_BY_GENRE = gql`
query($genre: String!) {
  allBooksByGenre(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title
        author: $author
        published: $published
        genres: $genres
    ) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation editAuthorByName($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        ...AuthorDetails
    }
  }
${AUTHOR_DETAILS}
`

export const USER_ADDED = gql`

subscription {
  userAdded {
    username
    favoriteGenre
  }
}

`

export const BOOK_ADDED = gql`

subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`