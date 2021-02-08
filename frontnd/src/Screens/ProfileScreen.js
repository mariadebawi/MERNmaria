import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { USER_UPDATE_PROFILE_RESET } from '../constantes/userConstants'


import { getUserDetails , updateUserProfile } from '../actions/userActions'


const ProfileScreen = ({  history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo } = userLogin


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)

    const {success } = userUpdateProfile



    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        } else {
          if (!user || !user.name || success) {
            
            dispatch({ type: USER_UPDATE_PROFILE_RESET })

            dispatch(getUserDetails('profile'))
          } 
          
          else {
            //console.log(user)
            setName(user.name)
            setEmail(user.email)
          }
        }
      }, [dispatch,history, userInfo, user, success])

      
      const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
          setMessage('Passwords do not match')
        } else {
         // console.log(user._id)
          dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
      }
    



    return (
        <Row>
            <Col md={5}>
                <FormContainer>
                    <h3>User Profile</h3>

                    {message && <Message variant='danger'> {message}</Message>}
                    {success && <Message variant='success'> Updated Success</Message>}

                    {loading && <Loader />}

                    {error && <Message variant='danger'> {error}</Message>}


                    <Form onSubmit={submitHandler}>


                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmpassword'>
                            <Form.Label>ConfirmPassword</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant="success" className="btn-block">  Update</Button>

                    </Form>

                   


                </FormContainer>
            </Col>

            <Col md={7}>
            </Col>
        </Row>
    )
}

export default ProfileScreen
