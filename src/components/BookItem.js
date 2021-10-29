import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function BookItem(props) {
  const { id, title, excerpt, featured_media, author } = props.book
  const [isLoaded, setIsLoaded] = useState(false)
  const [imgUrl, setImgUrl] = useState()
  const [authorName, setAuthorName] = useState()

  useEffect(() => {
    axios.get(`/wp-json/wp/v2/media/${featured_media}`)
      .then(res => {
        setImgUrl(res.data.media_details.sizes.full.source_url)
      })
      .catch(err => console.log(err))
    axios.get(`/wp-json/wp/v2/users/${author}`)
      .then(res => {
        setAuthorName(res.data.name)
      })
      .catch(err => console.log(err))

    setIsLoaded(true)

  }, [featured_media, author])

  if (isLoaded) {
    return (
      <>
        <h2 style={{ marginBottom: '0' }}>
          {title.rendered}
        </h2>
        <small>Reviewed by 
          <strong>
            {authorName}
          </strong>
        </small>
        <img style={{ width: '35%' }} src={imgUrl} alt={title.rendered} />
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
        <Link to={`/book/${id}`}>
          Read Review
        </Link>
        <hr />
      </>
    )
  } else {
    return (
      null
    )
  }


}

export default BookItem
