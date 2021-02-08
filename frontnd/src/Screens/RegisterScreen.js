import React , {useState ,  useEffect}  from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import {Row , Col  , Button, Form} from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { register} from '../actions/userActions'




const RegisterScreen = ({location , history}) => {

   const [email , setEmail] = useState('')
   const [password , setPassword] = useState('')
   const [name , setName] = useState('')
   const [confirmpassword , setConfirmPassword] = useState('')
   const [message , setMessage] = useState('')


   const redirect = location.search ? location.search.split('=')[1] : '/' ;

   const dispatch = useDispatch()

   const userRegister= useSelector(state=>state.userRegister)

   const {loading , error , userInfo} = userRegister

   useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
 
   }, [history , userInfo , redirect])
  

   const submitHandler = (e) => {
       e.preventDefault() ;
      if(password !== confirmpassword){
        setMessage('password do not match') ;
      }
      else{
         dispatch(register(name ,email , password))

      }
   }

    return (
        <FormContainer>
            <h1>Sign Up</h1>

           {error && <Message variant='danger'> {error}</Message>} 
           {message && <Message variant='danger'> {message}</Message>} 

           {loading && <Loader/>}

         <Form onSubmit={submitHandler}>


         <Form.Group controlId='name'>
          <Form.Label>Email Address</Form.Label>
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

            <Button type='submit' variant="primary"> Sign Up</Button>

         </Form>

         <Row className='py-3'>
             <Col>
              Have An Account?{' '} 
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
             </Col>

         </Row>
   
            
        </FormContainer>

      
    )
}

export default RegisterScreen
