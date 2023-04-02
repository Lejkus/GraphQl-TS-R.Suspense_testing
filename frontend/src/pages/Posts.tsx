import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../hooks/fetchData';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
export default function PostsPage({ resource, user }: any) {

  const navigate = useNavigate()
  const [posts, setPosts] = useState(resource.posts.read().data.data.posts)

  const handleDeleteLike = (postID: number) => {
    import('../hooks/postsActions').then(module => {
      setPosts([...module.deleteLike(postID, posts, user)])
    })
  }

  const handleLike = (postID: number) => {
    if (user) {
      import('../hooks/postsActions').then(module => {
        setPosts([...module.addLike(postID, posts, user)])
      })
    } else {
      navigate("/login")
    }
  }


  return (
    <div className='posts'>
      <Button onClick={() => { fetchData(`{posts{id,thema,content,likes,user{id,name},comments {id}}}`).then(data => setPosts(data.data.posts)) }}>refresh</Button>
      {posts.map((post: any, i: number) => {
        return <div className='post' key={i}>
          <Card >
            <Card.Header >{post.user.name}</Card.Header>

            <Card.Body>

              <LinkContainer to={`/post/:${post.id}`} style={{ cursor: 'pointer' }}>
                <div>
                  <Card.Title>{post.thema}</Card.Title>
                  <Card.Text>
                    {post.content}
                  </Card.Text>
                </div>
              </LinkContainer>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <div style={{ cursor: 'pointer' }}>{post.likes.length}{post.likes.find((id: Number) => id === user)
                  ? <svg style={{ height: "40px" }} onClick={() => { handleDeleteLike(post.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path d="M5.5 10.5h-5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 6 23V11a.5.5 0 0 0-.5-.5zM24 11c0-1.378-1.122-2.5-2.5-2.5h-6.295c.305-.929.795-2.632.795-4 0-2.169-1.843-4-3-4-1.039 0-1.781.584-1.813.609A.504.504 0 0 0 11 1.5v3.39l-2.88 6.241-.843.421A.503.503 0 0 0 7 12v9c0 .133.053.26.146.354.749.748 2.429 1.146 3.354 1.146h9.25a2.252 2.252 0 0 0 2.015-3.25 2.24 2.24 0 0 0 1-3 2.24 2.24 0 0 0 1.235-2c0-.6-.239-1.161-.65-1.575.415-.452.65-1.044.65-1.675z"></path></svg>
                  : <svg style={{ height: "40px" }} onClick={() => { handleLike(post.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path d="M7.5 23.501h-7a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5zm-6.5-1h6v-11H1v11z"></path><path d="M19.75 22.501H10.5c-.925 0-2.605-.398-3.354-1.146a.5.5 0 0 1 .707-.707c.473.473 1.834.854 2.646.854h9.25c.689 0 1.25-.561 1.25-1.25 0-.344-.14-.666-.395-.907a.499.499 0 0 1 .286-.859A1.249 1.249 0 0 0 22 17.251c0-.344-.14-.666-.395-.907a.499.499 0 0 1 .286-.859A1.247 1.247 0 0 0 23 14.251c0-.466-.262-.89-.684-1.106a.497.497 0 0 1-.034-.87c.449-.278.718-.754.718-1.274 0-.827-.673-1.5-1.5-1.5h-7a.502.502 0 0 1-.468-.677c.01-.027.968-2.564.968-4.323 0-1.637-1.452-3-2-3-.431 0-.792.157-1 .272v3.228a.501.501 0 0 1-.046.209l-3 6.5a.506.506 0 0 1-.23.238l-1 .5a.5.5 0 0 1-.447-.895l.843-.421L11 4.891v-3.39c0-.152.069-.295.188-.391A3.13 3.13 0 0 1 13 .501c1.157 0 3 1.831 3 4 0 1.368-.49 3.071-.795 4H21.5c1.378 0 2.5 1.122 2.5 2.5 0 .631-.235 1.223-.65 1.675.411.413.65.974.65 1.575a2.24 2.24 0 0 1-1.235 2 2.24 2.24 0 0 1-1 3 2.253 2.253 0 0 1-2.015 3.25z"></path></svg>}
                </div>
                <div style={{ cursor: 'pointer' }}><svg style={{ height: "40px" }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.86 122.88"><title>comment</title><path d="M30.28,110.09,49.37,91.78A3.84,3.84,0,0,1,52,90.72h60a2.15,2.15,0,0,0,2.16-2.16V9.82a2.16,2.16,0,0,0-.64-1.52A2.19,2.19,0,0,0,112,7.66H9.82A2.24,2.24,0,0,0,7.65,9.82V88.55a2.19,2.19,0,0,0,2.17,2.16H26.46a3.83,3.83,0,0,1,3.82,3.83v15.55ZM28.45,63.56a3.83,3.83,0,1,1,0-7.66h53a3.83,3.83,0,0,1,0,7.66Zm0-24.86a3.83,3.83,0,1,1,0-7.65h65a3.83,3.83,0,0,1,0,7.65ZM53.54,98.36,29.27,121.64a3.82,3.82,0,0,1-6.64-2.59V98.36H9.82A9.87,9.87,0,0,1,0,88.55V9.82A9.9,9.9,0,0,1,9.82,0H112a9.87,9.87,0,0,1,9.82,9.82V88.55A9.85,9.85,0,0,1,112,98.36Z" /></svg> {post.comments.length}</div>
              </div>

            </Card.Body>
          </Card>
        </div>
      }).reverse()}
    </div>


  );
}
