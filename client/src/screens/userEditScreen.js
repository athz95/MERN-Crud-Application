import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button  } from 'react-bootstrap'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {

  //fetching user id
  const userId = match.params.id

  //storing form values in the states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  //setting up redux dispatch and selector functions
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate


 //rediecting the page after success and fetching data to fill the form
  useEffect(() => {
      if(successUpdate){
          dispatch({ type: USER_UPDATE_RESET })
          history.push('/')
      } 
      else {
          if( !user.name || user._id !== userId ){
              dispatch(getUserDetails(userId))
          } 
          else {
              setName(user.name)
              setEmail(user.email)
              setCountry(user.country)
              setGender(user.gender)
              setMobileNumber(user.mobileNumber)
          }
      }
      }, [user, dispatch, userId, successUpdate, history])


       //submit function
      const submitHandler = (e) => {
        console.log(mobileNumber, country);
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, country, gender, mobileNumber}))
      }

  return (
      <>
        <Link to='/' className='btn btn-dark my-3'>
           Go Back
        </Link>
        <FormContainer>
        <h1 className="pt-5 pb-4">Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}

        <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId='password'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId='confirmPassword'>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId='confirmPassword'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter your phone number'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
   

          <Button className="my-3" type='submit' variant='primary'>
            Update
          </Button>
    </Form>
    
    </FormContainer>
      </>
  
 
  )
}

export default UserEditScreen