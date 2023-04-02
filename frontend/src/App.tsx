
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { lazy, Suspense } from 'react';
import Login from './pages/Login';
import Loading from './components/Spinner';
import { useState } from 'react'

import WithTabs from './components/WithTabs';
import WithoutTabs from './components/WithoutTabs';

const LikedComponent = lazy(() => import('./pages/Liked'));
const PostsComponent = lazy(() => import('./pages/Posts'));
const ProfilesComponent = lazy(() => import('./pages/Profiles'));
const SinglePostComponent = lazy(()=>import('./pages/SinglePost') )

import { fetchProfileData } from './API';


const initialResource = fetchProfileData();

function App() {
  const [user, setUser] = useState(0)
  const [resource, setResource] = useState(initialResource);
  
  return (
    <>
      <Navbar style={{ fontSize: 14 }} bg="primary" variant="dark" expand="sm">
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>PostingNET</Navbar.Brand>
        </LinkContainer>
          
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user > 0 ? <>Signed as : {user}</> : <Link to='/login' style={{ textDecoration: 'none' }}><>Login</></Link>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <center>
        <div className='main-page'>
          <Routes>
            <Route element={<WithoutTabs />}>
              <Route path="/login" element={!user ?<Login user={user} setUser={setUser} />:<Navigate to="/liked" />}></Route>
            </Route>
            <Route element={<WithTabs />}>
              <Route path="/" element={<Navigate to="/posts" />}></Route>

              <Route path="/posts" element={
                <Suspense fallback={<Loading />}>
                  <PostsComponent resource={resource} user={user} />
                </Suspense>}>
              </Route>

              <Route path="/profiles" element={
                <Suspense fallback={<Loading />}>
                  <ProfilesComponent resource={resource} user={user} />
                </Suspense>}>
              </Route>

              <Route path="/liked" element={
                <Suspense fallback={<Loading />}>
                  <LikedComponent resource={resource} user={user} />
                </Suspense>}>
              </Route>

              <Route path="/post/:id" element={
                <Suspense fallback={<Loading />}>
                  <SinglePostComponent resource={resource} setResource={setResource} user={user}/>
                </Suspense>}>
              </Route>

            </Route>
          </Routes>
        </div>
      </center>
    </>
  )
}


export default App
