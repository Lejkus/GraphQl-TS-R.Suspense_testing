import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

export default function Tabs() {
    console.log('tabs');
    
    return (
        <Nav variant="tabs" >
            <LinkContainer to='/posts'>
                <Nav.Link eventKey="posts">Post</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/profiles'>
                <Nav.Link eventKey="profiles">Profiles</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/liked'>
                <Nav.Link eventKey="liked">Liked posts</Nav.Link>
            </LinkContainer>
        </Nav>
    )
}
