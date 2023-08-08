import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries/queries'

export const Profile = () => {

  // eslint-disable-next-line no-unused-vars
  const { loading, error, data } = useQuery(ME)

  if (loading) {
    return <div>Loading results...</div>
  }

  console.log(data)

  const user = data ? data.me : null

  return (
    <div>
      <h1>Profile</h1>
      {
        user && (
          <>
            <h1>{user.username}</h1>
            <p>{user.favoriteGenre || 'all'}</p>
            <ul>
              {
                user.friends.map((elem, i) => <li key={i}>{elem.username}</li>)
              }
            </ul>
            <ul>
              {
                user.friendOf.map((elem, i) => <li key={i}>{elem.username}</li>)
              }
            </ul>
          </>
        )
      }
    </div>
  )
}
