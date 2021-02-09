import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form , Col } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

import CheckoutSteps from '../components/CheckoutSteps'

import { savePaymentMethod} from '../actions/cartActions'



const PaymentScreen  = ({history}) => {

    const cart= useSelector(state=>state.cart)

    const {shippingAddress} = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
  


    const submitHandler = (e) => {
        e.preventDefault() ;
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    
    
   return (
        <FormContainer>

            <CheckoutSteps  step1  step2 step3 />
            
            <h2>Method Payment</h2>


            <Form onSubmit={submitHandler}>


                <Form.Group controlId='paymentMethod'>
                    <Form.Label >  Select Method</Form.Label>

                <Col>
                    <Form.Check 
                         type="radio" label="PayPal or Credit Card" id="PayPal"
                         name="paymentMethod" value="PayPal"
                         checked  onChange={(e) => setPaymentMethod(e.target.value)}>

                     </Form.Check>
                </Col>

                </Form.Group>

                <Button type='submit' variant="primary"> Continue</Button>

            </Form>


        </FormContainer>
    )
}

export default PaymentScreen 
