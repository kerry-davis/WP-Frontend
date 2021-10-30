import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function BookPage(props) {
  const { id } = props.match.params

  const [isLoaded, setIsLoaded] = useState(false)
  const [book, setBook] = useState()

  useEffect(() => {
    axios.get(`/wp-json/wp/v2/books/${id}`)
      .then((res) => {
        setBook(res.data)
        setIsLoaded(true)
      })
      .catch(err => console.log(err))
  }, [id])

  if (isLoaded) {
    return (
      <>
        <Link to="/">Go Back</Link>
        <hr />
        <h1>
          {book.title.rendered}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
        <h4>
          Publisher: {book.acf.publisher}
        </h4>
      </>
    )
  } else {
    return (
      <h3>
        Loading...
      </h3>
    )
  }

}

export default BookPage
