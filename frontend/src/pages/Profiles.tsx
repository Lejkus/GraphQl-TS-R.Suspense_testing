import React, { useEffect } from 'react'

import { mixUsers } from '../hooks/mixUsers';
import { getData } from '../hooks/getData';

import Loading from '../components/Spinner';
import Card from 'react-bootstrap/Card';

export default function Profiles({ users, dispatch }: any) {

  useEffect(() => {
    if (!users.length) {
      (async () => {
        const result = await getData(`{ users{name,posts{id}}}`)
        setTimeout(() => {
          dispatch({ type: 'setUsers', payload: result.data })
        }, 1000);
      })()
    }
  }, [])

  
  return (
    <> {users.length ? <div className='users'>
      {mixUsers(users).map((user: any, i: number) => {
        return <div className='user' key={i}>
          <Card>
            <Card.Header >{user.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                posts number: {user.posts.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      }).reverse()}
    </div>
      : <Loading />}</>
  )
}

