import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import CheckoutSteps from '../components/CheckoutSteps'



import { saveShippingAddress} from '../actions/cartActions'



const ShippingScreen = ({ history }) => {

    const cart= useSelector(state=>state.cart)

    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAdress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    const [country, setcountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(saveShippingAddress({address , city , postalCode , country}))
        history.push('/payment')
    }

    return (
        <FormContainer>

            <CheckoutSteps  step1  step2 />

            <h2>Shipping</h2>


            <Form onSubmit={submitHandler}>


                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal Code'
                        value={postalCode}
                        onChange={(e) => setpostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>




                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

             
                <Button type='submit' variant="primary"> Continue</Button>

            </Form>


        </FormContainer>
    )
}

export default ShippingScreen
