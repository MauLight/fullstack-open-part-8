import React from 'react'

export const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2 className='text-4xl'>{person.name}</h2>
      <div className='text-2xl'>
        {person.address.street} {person.address.city}
      </div>
      <div className='text-2xl'>{person.phone}</div>
      <button className='ml-2 p-2 active:bg-slate-300 rounded-md' onClick={onClose}>close</button>
    </div>
  )
}
