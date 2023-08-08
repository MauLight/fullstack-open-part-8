import React, { useState } from 'react'
import { useGenres } from '../hooks'
import { ALL_BOOKS_BY_GENRE } from '../queries/queries'
import { useQuery } from '@apollo/client'

export const Recommendations = ({ books }) => {

  const [genre, setGenre] = useState('all')
  const genres = useGenres(books)

  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre },
    fetchPolicy: 'no-cache'
  })

  if (loading) {
    return <div>Loading results...</div>
  }

  const filterBooks = data.allBooksByGenre

  return (
    <div>
      <div className='flex flex-col gap-x-5 mt-2  w-[250px]'>
        <label htmlFor='name'>Choose your favorite genre: </label>
        <select defaultValue='default' className='rounded-md h-8' value={genre} onChange={({ target }) => setGenre(target.value)} >
          <option value='default' hidden>Choose a genre</option>
          {
            genres && genres.map((genre, i) => (
              <option key={i}>{genre}</option>
            ))
          }
        </select>
      </div>
      <div className='mt-10'>
        <ul>
          {
            filterBooks.length > 0 ? filterBooks.map(elem => <li className='text-2xl' key={elem.title}>{`${elem.title} by ${elem.author.name}`}</li>)
              :
              null
          }
        </ul>
      </div>
    </div>
  )
}
