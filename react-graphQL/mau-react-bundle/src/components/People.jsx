import React, { useState } from 'react'
import { Person } from './Person'
import { useQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries/queries'

export const People = ({ people }) => {

  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    console.log('DONE!')
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  console.log(nameToSearch)

  return (
    <div>
      <h2 className='font-bold text-4xl mb-2'>People</h2>
      {
        people.map(person => (
          <div className='text-2xl' key={person.name}>
            {person.name}
            <button className='ml-2 p-2 active:bg-slate-300 rounded-md' onClick={() => setNameToSearch(person.name)} >details</button>
          </div>
        ))
      }
    </div>
  )
}
