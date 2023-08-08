import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { SIGNUP } from '../queries/queries'
import { useNavigate } from 'react-router-dom'

export const SignIn = ({ setError }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const navigate = useNavigate()

  const [signup, result] = useMutation(SIGNUP, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    signup({ variables: { username, password, favoriteGenre } })
  }

  useEffect(() => {
    if (result.data) {
      navigate('/')
    }
  }, [result.data])

  return (
    <div className="px-[500px]">
      <h1 className='text-5xl text-center mb-5'>Sign-In</h1>
      <form onSubmit={submit}>
        <div className="flex flex-col">
          <label className='text-sm text-start' htmlFor='username'>Username:</label>
          <input
            className='rounded h-8'
            type='text'
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className='text-sm text-start' htmlFor='password'>Password:</label>
          <input
            className='rounded h-8'
            type='password'
            id='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className='text-sm text-start' htmlFor='genre'>Favorite genre:</label>
          <input
            className='rounded h-8'
            type='genre'
            id='genre'
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <div >
          <button
            id='login-btn'
            className="rounded w-full h-12 mt-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75" type='submit'>
                        Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

