import React from 'react'
import { Link } from 'react-router-dom'

export const Books = ({ books }) => {

  console.log(books)

  return (
    <div className='px-[50px] mt-20 px-[100px]'>
      <div className="flex gap-x-5 justify-around items-center my-2">
        <p className='font-bold text-4xl'>Title</p>
        <p className='font-bold text-4xl'>Author</p>
        <p className='font-bold text-4xl'>Published</p>
        <p className='font-bold text-4xl'>Genres</p>
      </div>
      <ul>
        {
          books && books.map(elem => (
            <li key={elem.title}>
              <Link to={`/authors/${elem.id}`}>
                <div className="flex gap-x-2 justify-around">
                  <div className="flex max-w-[200px]">
                    <p className='text-md border-b border-solid'>{elem.title}</p>
                  </div>
                  <div className="flex max-w-[200px]">
                    <p className='text-md border-b border-solid'>{elem.author.name}</p>
                  </div>
                  <div className="flex max-w-[200px]">
                    <p className='text-md border-b border-solid'>{elem.published}</p>
                  </div>
                  <div className="flex max-w-[200px]">
                    <p className='text-md border-b border-solid'>{elem.genres.toString()}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

