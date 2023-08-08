import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries'

export const BirthForm = ({ authors, setError }) => {

  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')

  console.log(name)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.log(messages)
      setError(messages)
    }
  })

  const submit = (e) => {
    e.preventDefault()

    const setBornTo = parseInt(birth)

    editAuthor({ variables: { name, setBornTo } })
    setName('')
    setBirth('')
  }

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <h2 className='font-bold text-4xl mb-5'>Create new entry</h2>
      <form onSubmit={submit}>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='name'>name: </label>
          <select defaultValue='default' className='rounded-md h-8' value={name} onChange={({ target }) => setName(target.value)} >
            <option value='default' hidden>Choose an author</option>
            {
              authors && authors.map(name => (
                <option key={name}>{name}</option>
              ))
            }
          </select>
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='published'>birth year: </label>
          <input id='birth' className='rounded-md h-8' type='text' value={birth} onChange={({ target }) => setBirth(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2 justify-center items-center'>
          <button className='ml-2 p-2 active:bg-slate-300 rounded-md mt-5 hover:border hover:border-solid' type='submit'>add entry</button>
        </div>
      </form>
    </div>
  )
}
