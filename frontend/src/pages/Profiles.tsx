import React, { useEffect } from 'react'

import { mixUsers } from '../hooks/mixUsers';


import Card from 'react-bootstrap/Card';

export default function Profiles({resource}:any) {

  const profiles = resource.profiles.read().data.data.users
  
  return (
    <div className='users'>
      {mixUsers(profiles).map((user: any, i: number) => {
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
  )
}

