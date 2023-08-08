/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import PromisePolyfill from 'promise-polyfill'
import { Routes, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Notes } from './views/Notes'
import { Authors } from './views/Authors'
import { BookForm } from './views/BookForm'
import Notification from './components/Notification'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER_ADDED } from './queries/queries'
import { Books } from './views/Books'
import { Login } from './views/Login'
import { Recommendations } from './views/Recommendations'
import { SignIn } from './views/SignIn'
import { Profile } from './views/Profile'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {

  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState(null)

  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  useSubscription(USER_ADDED, {
    onData: ({ data }) => {
      const addedUser = data.data.userAdded
      notify(`${addedUser.username} just created an account!`)
      client.cache.updateQuery({ query: ALL_USERS }, ({ allUsers }) => {
        return {
          allUsers: allUsers.concat(addedUser),
        }
      })
    }
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} by ${addedBook.author.name} was just added!`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>Loading...</div>
  }

  const authors = resultAuthors.data.allAuthors ? resultAuthors.data.allAuthors : []
  const books = resultBooks.data.allBooks ? resultBooks.data.allBooks : []

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      {
        token ?
          <div className="App w-[100vw] min-h-screen px-20">
            <Navbar setToken={setToken} />
            <Notification errorMessage={errorMessage} />
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path="/login" element={<Login setToken={setToken} setError={notify} />} />
              <Route path="/authors" element={<Authors setError={notify} authors={authors} />} />
              <Route path="/create" element={<BookForm setError={notify} setType={setType} />} />
              <Route path="/books" element={<Books books={books} />} />
              <Route path="/recommendations" element={<Recommendations books={books} />} />
              <Route path="/profile" element={<Profile setError={notify} />} />
            </Routes>
          </div>
          :
          <div className="App w-[100vw] min-h-screen px-20 pt-[180px]">
            <Notification type={type} errorMessage={errorMessage} />
            <Routes>
              <Route path="/" element={<Login setToken={setToken} setError={notify} />} />
              <Route path="/signin" element={<SignIn setError={notify} />} />
            </Routes>
          </div>
      }
    </>
  )

}

export default App