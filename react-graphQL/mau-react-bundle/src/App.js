/* eslint-disable no-undef */
import React, { useState } from 'react'
import PromisePolyfill from 'promise-polyfill'

import { useQuery, gql } from '@apollo/client'
import { People } from './components/People'
import { PersonForm } from './components/PersonForm'
import Notification from './components/Notification'
import { PhoneForm } from './components/PhoneForm'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const ALL_PEOPLE = gql`
query {
  allPeople {
    name
    phone
    id
  }
}
`

const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PEOPLE)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <>
      <Notification errorMessage={errorMessage} />
      <div className='ml-5 flex gap-x-[400px]'>
        <People people={result.data.allPeople} />
        <div className="flex flex-col">
          <PersonForm setError={notify} />
          <PhoneForm setError={notify} />
        </div>
      </div>
    </>
  )
}

export default App