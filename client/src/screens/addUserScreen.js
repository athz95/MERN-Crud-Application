import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { USER_REGISTER_RESET } from "../constants/userConstants"
import { Link } from 'react-router-dom'


const AddUserScreen = ({ location, history }) => {
  
  //storing form values in the states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  //setting up redux dispatch and selector functions
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

   //rediecting the page after success
    useEffect(() => {
      if(success){
        dispatch({ type: USER_REGISTER_RESET })
        history.push(redirect)
      } 
      },[success,history,redirect,dispatch])

  //submit function
  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(register(name, email, country, gender, mobileNumber))
    }
  

  return (

    <>
        <Link to='/' className='btn btn-dark my-3'>
           Go Back
        </Link>
    <FormContainer >
       
      <h1 className="pt-5 pb-3">Add User</h1>
     
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      
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
          Add
        </Button>
      </Form>
    </FormContainer>
    </>
  )
}

export default AddUserScreen