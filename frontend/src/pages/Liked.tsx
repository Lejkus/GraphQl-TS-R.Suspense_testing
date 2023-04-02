import React, { useState } from 'react'
import { userLiked } from '../hooks/userLiked'
import { Card } from 'react-bootstrap';


export default function Liked({ resource, user }: any) {
  const posts = resource.posts.read().data.data.posts
  const [liked_posts, setLiked_posts] = useState(userLiked(posts, user))



  const handleDeleteLike = (postID: number) => {
    import('../hooks/postsActions').then(module => {
      const NewPosts = module.deleteLike(postID, posts, user)
      setLiked_posts(userLiked(NewPosts, user))
    })
  }

  return (
    <>{liked_posts.length ? <div className='liked_posts'>
      {liked_posts.map((post: any, i: number) => {
        return <div className='post' key={i}>
          <Card>
            <Card.Header >{post.user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{post.thema}</Card.Title>
              <Card.Text>
                {post.content}
              </Card.Text>
              <div style={{ width: "40px", display: 'flex', alignItems: 'center' }}>
                {post.likes.length}{2 ? <svg onClick={() => { handleDeleteLike(post.id) }} style={{ height: "40px", cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path d="M5.5 10.5h-5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 6 23V11a.5.5 0 0 0-.5-.5zM24 11c0-1.378-1.122-2.5-2.5-2.5h-6.295c.305-.929.795-2.632.795-4 0-2.169-1.843-4-3-4-1.039 0-1.781.584-1.813.609A.504.504 0 0 0 11 1.5v3.39l-2.88 6.241-.843.421A.503.503 0 0 0 7 12v9c0 .133.053.26.146.354.749.748 2.429 1.146 3.354 1.146h9.25a2.252 2.252 0 0 0 2.015-3.25 2.24 2.24 0 0 0 1-3 2.24 2.24 0 0 0 1.235-2c0-.6-.239-1.161-.65-1.575.415-.452.65-1.044.65-1.675z"></path></svg> : <></>}

              </div>
            </Card.Body>
          </Card>
        </div>

      }).reverse()}
    </div>
      : <h1>No posts liked</h1>}</>
  )
}
