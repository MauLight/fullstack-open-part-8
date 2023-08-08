import { useState, useEffect } from 'react'
import axios from 'axios'

export const useNotes = (url) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    })
  }, [url])

  return notes

}

export const useGenres = (books) => {
  let genresArr = []
  // eslint-disable-next-line no-unused-vars
  const mapGenres = books.map(elem => {
    if (elem.genres.length > 0) {
      for (elem of elem.genres) {
        genresArr.push(elem)
      }
    }
  }
  )

  const filteredGenres = genresArr.filter((elem, i) => elem.length > 0 && genresArr.indexOf(elem) === i)
  return filteredGenres

}