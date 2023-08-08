import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PEOPLE } from '../queries/queries'

export const PersonForm = ({ setError }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PEOPLE }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.log(messages)
      setError(messages)
    }
  })

  const submit = (e) => {
    e.preventDefault()

    createPerson({ variables: { name, phone, street, city } })
    setName('')
    setPhone('')
    setStreet('')
    setCity('')

  }

  return (
    <div>
      <h2 className='font-bold text-4xl mb-5'>Create new entry</h2>
      <form onSubmit={submit}>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='name'>Name: </label>
          <input id='name' className='rounded-md h-8 ml-1' type='text' value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='phone'>Phone: </label>
          <input id='phone' className='rounded-md h-8' type='text' value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='street'>Street: </label>
          <input id='street' className='rounded-md h-8' type='text' value={street} onChange={({ target }) => setStreet(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='city'>City: </label>
          <input id='city' className='rounded-md h-8 ml-4' type='text' value={city} onChange={({ target }) => setCity(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2 justify-center items-center'>
          <button className='ml-2 p-2 active:bg-slate-300 rounded-md mt-5 hover:border hover:border-solid' type='submit'>add entry</button>
        </div>
      </form>
    </div>
  )
}
