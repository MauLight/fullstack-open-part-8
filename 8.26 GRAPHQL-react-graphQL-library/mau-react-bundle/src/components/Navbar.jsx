import React from 'react'
import icon from '../img/icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'

export const Navbar = ({ setToken }) => {

  const client = useApolloClient()
  const navigate = useNavigate()

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div className='flex justify-between items-center py-2 px-20 mb-20'>
      <div>
        <img className='w-[40px] h-[40px]' src={icon} />
      </div>
      <div>
        <ul className='flex gap-x-5'>
          <li>
            <Link to={'/authors'} >authors</Link>
          </li>
          <li>
            <Link to={'/books'} >books</Link>
          </li>
          <li>
            <Link to={'/create'} >create</Link>
          </li>
          <li>
            <Link to={'/recommendations'} >recommendations</Link>
          </li>
          <li>
            <Link to={'/profile'} >profile</Link>
          </li>
          <li>
            <button onClick={logOut} >logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
