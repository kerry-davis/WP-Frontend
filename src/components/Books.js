import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookItem from './BookItem'

function Books() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [books, setBooks] = useState()

  useEffect(() => {
    axios.get('/wp-json/wp/v2/books')
      .then(res => {
        setBooks(res.data)
        setIsLoaded(true)
      })
      .catch(err => console.log(err))
  }, [])

  if (isLoaded) {
    return (
      <>
        {
          books.map(book => (
            <BookItem key={book.id} book={book} />
          ))

        }
      </>
    )

  } else {
    return <h3>Loading...</h3>
  }

}

export default Books
