import React from 'react'
import { Link } from 'react-router-dom'
import { BirthForm } from '../components/BirthForm'

export const Authors = ({ authors, setError }) => {

  console.log(authors)

  const authorNames = authors.map(author => author.name)
  console.log(authorNames)

  return (
    <div className='px-[400px] mt-20'>
      <div className="flex gap-x-5 justify-between items-center my-2">
        <p className='font-bold text-4xl'>Author</p>
        <p className='font-bold text-4xl'>Born</p>
        <p className='font-bold text-4xl'>Books</p>
      </div>
      <ul>
        {
          authors && authors.map(elem => (
            <li key={elem.name}>
              <Link to={`/authors/${elem.id}`}>
                <div className="flex gap-x-5 justify-between items-center">
                  <p className='text-lg border-b border-solid max-w-[120px]'>{elem.name}</p>
                  <p className='text-lg border-b border-solid'>{elem.born}</p>
                  <p className='text-lg border-b border-solid'>{elem.bookCount}</p>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
      <BirthForm authors={authorNames} setError={setError} />
    </div>
  )
}

