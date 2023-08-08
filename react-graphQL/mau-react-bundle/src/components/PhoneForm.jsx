import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_PHONE } from '../queries/queries'

export const PhoneForm = ({ setError }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_PHONE)

  const submit = (e) => {
    e.preventDefault()

    changeNumber({ variables: { name, phone } })
    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Person was not found')
    }
  }, [result.data])

  return (
    <div>
      <h2 className='font-bold text-4xl mb-5'>Change phone number</h2>
      <form onSubmit={submit}>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='name'>Name: </label>
          <input id='name' className='rounded-md h-8 ml-2' type='text' value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2'>
          <label htmlFor='phone'>Phone: </label>
          <input id='phone' className='rounded-md h-8 ml-1' type='text' value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <div className='flex gap-x-5 mt-2 justify-center items-center'>
          <button className='ml-2 p-2 active:bg-slate-300 rounded-md mt-5 hover:border hover:border-solid' type='submit'>add entry</button>
        </div>
      </form>
    </div>
  )
}
