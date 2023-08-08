import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries/queries'
import { Link, useNavigate } from 'react-router-dom'

export const Login = ({ setToken, setError }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    }
  }, [result.data])

  return (
    <div className="px-[500px]">
      <h1 className='text-5xl text-center mb-5'>Login</h1>
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
        <div >
          <button
            id='login-btn'
            className="rounded w-full h-12 mt-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75" type='submit'>
            Log in
          </button>
          <div className="flex gap-x-2 items-center mt-2">
            <small>Not a member?</small>
            <Link to={'/signin'}><p className='font-bold text-sm'>Sign-In</p></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

