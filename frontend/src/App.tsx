
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { lazy, Suspense } from 'react';
import Loading from './components/Spinner';
import Tabs from './components/Tabs';
import { useState, useReducer, useEffect, useMemo } from 'react'

import WithTabs from './components/WithTabs';
import WithoutTabs from './components/WithoutTabs';

const LikedComponent = lazy(() => import('./pages/Liked'));
const PostsComponent = lazy(() => import('./pages/Posts'));
const ProfilesComponent = lazy(() => import('./pages/Profiles'));

const initialState = {
  posts: [],
  user: 0,
  users: []
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'setPosts':
      return {
        ...state,
        posts: action.payload.posts
      }
    case 'setUsers':
      return {
        ...state,
        users: action.payload.users
      }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Navbar style={{ fontSize: 14 }} bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand href="/">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {state.user !== 0 ? <>Signed as JSON</> : <Link to='/login' style={{ textDecoration: 'none' }}><>Login</></Link>}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <center>
        <div className='main-page'>
          <Routes>
            <Route element={<WithoutTabs />}>
              <Route path="/login" element={<></>}></Route>
            </Route>
            <Route element={<WithTabs />}>
              <Route path="/" element={<Navigate to="/posts" />}></Route>
              <Route path="/posts" element={<Suspense fallback={<Loading />}>{<PostsComponent state={state} dispatch={dispatch} />}</Suspense>}></Route>
              <Route path="/profiles" element={<Suspense fallback={<Loading />}><ProfilesComponent users={state.users} dispatch={dispatch} /></Suspense>}></Route>
            </Route>
          </Routes>
        </div>
      </center>
    </>
  )
}

export default App
