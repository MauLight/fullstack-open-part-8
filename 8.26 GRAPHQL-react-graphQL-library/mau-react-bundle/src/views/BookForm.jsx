import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries'
import { useNavigate } from 'react-router-dom'

export const BookForm = ({ setError, setType }) => {

  const [title, setTitle] = useState('')
  const [published, setPublished] = useState('')
  const [author, setAuthor] = useState('')
  const [genres, setGenres] = useState('')

  const navigate = useNavigate()

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.log(messages)
      setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },

  })

  const submit = (e) => {
    e.preventDefault()

    const genresArr = genres.split(',')
    console.log(genresArr)
    const publishedInt = parseInt(published)

    createBook({ variables: { title, published: publishedInt, author, genres: genresArr } })
    setType('add')
    setError(`${title} by ${author} posted succesfully!`)
    setTimeout(() => {
      setError(null)
      setType(null)
    }, 5000)
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres('')
    navigate('/')

  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='font-bold text-4xl mb-5'>Create new entry</h2>
      <form onSubmit={submit}>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='title'>title: </label>
          <input id='title' className='rounded-md h-8 ml-1' type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='published'>published: </label>
          <input id='published' className='rounded-md h-8' type='text' value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='author'>author: </label>
          <input id='author' className='rounded-md h-8' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='genres'>genres: </label>
          <div className="flex flex-col justify-center items-center">
            <input id='genres' className='rounded-md h-8' type='text' value={genres} onChange={({ target }) => setGenres(target.value)} />
            <small className='text-[9px] mt-1'>{'Separate genres with a comma (eg. action,fantasy)'}</small>
          </div>
        </div>
        <div className='flex gap-x-5 mt-2 justify-center items-center'>
          <button className='ml-2 p-2 active:bg-slate-300 rounded-md mt-5 hover:border hover:border-solid' type='submit'>add entry</button>
        </div>
      </form>
    </div>
  )
}