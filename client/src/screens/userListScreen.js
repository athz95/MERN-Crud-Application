import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers , deleteUser } from '../actions/userActions'
import { Link } from 'react-router-dom'


const UserListScreens = () => {
       
    //setting up redux dispatch and selector functions
    const dispatch = useDispatch()

    const userList = useSelector(state =>  state.userList)
    const { loading, error, users }  = userList
    
    const userDelete = useSelector(state =>  state.userDelete)
    const { success: successDelete }  = userDelete

    //fetching all users 
     useEffect(() => {
         dispatch(listUsers())
    }, [ dispatch, successDelete ])


    //delete handler function 
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
           dispatch(deleteUser(id))
        } 
    }


    return (
         <>
            <Row className="pt-4 pb-4">
              <Col md={8}>
                 <h1>All Users</h1>
              </Col>
              <Col md={4} style={{display:"flex",justifyContent: "end"}}>
                <Link to="/addUser">
                  <Button>Create User</Button>
                </Link>
              </Col>
            </Row>
      
            <Row>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>COUNTRY</th>
                            <th>GENDER</th>
                            <th>MOBILE NUMBER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                   <p>{user.country}</p>
                                </td>
                                <td>
                                   <p>{user.gender}</p>
                                </td>
                                <td>
                                   <p>{user.mobileNumber}</p>
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                          <Button variant='light' className='btn-sm'> 
                                              <i className='fas fa-edit'></i>
                                           </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Row>
        </>
    )
}

export default UserListScreens
