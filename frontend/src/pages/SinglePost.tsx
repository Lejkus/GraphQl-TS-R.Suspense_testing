import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// #1 method
// import { fetchProfileData } from '../API';
// import { useEffect } from 'react';

export default function SinglePost({ resource, user, setResource }: any) {

  const { id } = useParams();
  const navigate = useNavigate()

  // #1 method when you fetching singlepost data with api
  // disadvantages:
  // - longer waiting time
  // - (probably) need to provide initial state ,so by default it will load one post and then it will change to the correct one
  // advantages:
  // - you can ask for more details of a given post like comment contnet when you dont need it in all posts fetch

  // const post = (resource.post.read().data.data.post)
  // useEffect(() => {
  //   setResource(fetchProfileData(parseInt(id.substring(1))))
  // }, [])


  // #2 method when you just use the all posts data and you find single post by id
  // disadvantages:
  // - to have all post data you have to ask for it when fetching all which can cause delays
  // advantages:
  // - cleaner , easier , faster when data already load 

  const post = resource.posts.read().data.data.posts.find(post => post.id === parseInt(id.substring(1)))

  const [like, setLike] = useState(post.likes.find((id: Number) => id === user))

  const handleDeleteLike = (postID: number) => {
    import('../hooks/postsActions').then(module => {
      module.deleteLike(postID, resource.posts.read().data.data.posts, user)
      setLike(false)
    })
  }

  const handleLike = (postID: number) => {
    if (user) {
      import('../hooks/postsActions').then(module => {
        module.addLike(postID, resource.posts.read().data.data.posts, user)
        setLike(true)
      })
    } else {
      navigate("/login")
    }
  }

  return (
    <>
      <Card style={{ width: '80%' }}>
        <Card.Body>
          <Card.Title>{post.thema}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{post.user.name}</Card.Subtitle>
          <Card.Text>
            {post.content}
          </Card.Text>
          <div style={{ cursor: 'pointer' }}>{post.likes.length}{like
            ? <svg style={{ height: "40px" }} onClick={() => { handleDeleteLike(post.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path d="M5.5 10.5h-5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 6 23V11a.5.5 0 0 0-.5-.5zM24 11c0-1.378-1.122-2.5-2.5-2.5h-6.295c.305-.929.795-2.632.795-4 0-2.169-1.843-4-3-4-1.039 0-1.781.584-1.813.609A.504.504 0 0 0 11 1.5v3.39l-2.88 6.241-.843.421A.503.503 0 0 0 7 12v9c0 .133.053.26.146.354.749.748 2.429 1.146 3.354 1.146h9.25a2.252 2.252 0 0 0 2.015-3.25 2.24 2.24 0 0 0 1-3 2.24 2.24 0 0 0 1.235-2c0-.6-.239-1.161-.65-1.575.415-.452.65-1.044.65-1.675z"></path></svg>
            : <svg style={{ height: "40px" }} onClick={() => { handleLike(post.id) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="thumbs-up"><path d="M7.5 23.501h-7a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5zm-6.5-1h6v-11H1v11z"></path><path d="M19.75 22.501H10.5c-.925 0-2.605-.398-3.354-1.146a.5.5 0 0 1 .707-.707c.473.473 1.834.854 2.646.854h9.25c.689 0 1.25-.561 1.25-1.25 0-.344-.14-.666-.395-.907a.499.499 0 0 1 .286-.859A1.249 1.249 0 0 0 22 17.251c0-.344-.14-.666-.395-.907a.499.499 0 0 1 .286-.859A1.247 1.247 0 0 0 23 14.251c0-.466-.262-.89-.684-1.106a.497.497 0 0 1-.034-.87c.449-.278.718-.754.718-1.274 0-.827-.673-1.5-1.5-1.5h-7a.502.502 0 0 1-.468-.677c.01-.027.968-2.564.968-4.323 0-1.637-1.452-3-2-3-.431 0-.792.157-1 .272v3.228a.501.501 0 0 1-.046.209l-3 6.5a.506.506 0 0 1-.23.238l-1 .5a.5.5 0 0 1-.447-.895l.843-.421L11 4.891v-3.39c0-.152.069-.295.188-.391A3.13 3.13 0 0 1 13 .501c1.157 0 3 1.831 3 4 0 1.368-.49 3.071-.795 4H21.5c1.378 0 2.5 1.122 2.5 2.5 0 .631-.235 1.223-.65 1.675.411.413.65.974.65 1.575a2.24 2.24 0 0 1-1.235 2 2.24 2.24 0 0 1-1 3 2.253 2.253 0 0 1-2.015 3.25z"></path></svg>}
          </div>
        </Card.Body>
      </Card>
      <Card style={{ width: '70%', marginTop: '30px' }}>
        <Card.Header>{post.comments.length} comments:</Card.Header>
        <ListGroup variant="flush">
          {post.comments.map((comment: any) => {
            return <ListGroup.Item key={comment.id}>
              <h4>{comment.user.name}</h4>
              <Card.Body>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </ListGroup.Item>
          })}
        </ListGroup>
      </Card>
    </>
  )
}
