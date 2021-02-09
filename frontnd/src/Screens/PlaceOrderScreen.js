import React, { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

import CheckoutSteps from '../components/CheckoutSteps'

import Message from '../components/Message'

import { createOrder} from '../actions/orderActions'


const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    //calculate Prices 
     
    const addDecimals = (num) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc , item) => acc + item.price * item.qty , 0))

    cart.shippingPrice = addDecimals(cart.cartItems > 100 ? 0 :100)

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


    const orderCreate= useSelector(state=>state.orderCreate)

    const {order , success , error} = orderCreate


    useEffect(() => {
        if(success){
            history.push(`/orders/${order._id}`)
            console.log('success ')
        }
   }, [history , success])
  


    const placeOrderHandler = (e) => {
        e.preventDefault();
        //console.log('placeorder')

        dispatch(createOrder({
            orderItems : cart.cartItems ,
            shippingAddress : cart.shippingAddress ,
            paymentMethod : cart.paymentMethod ,
            itemsPrice : cart.itemsPrice ,
            shippingPrice : cart.shippingPrice ,
            taxPrice : cart.taxPrice ,
            totalPrice :  cart.totalPrice 
        }))
    }



    return (
        <>

            <CheckoutSteps step1 step2 step3 step4 />

            <h2>Place Order </h2>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong> Address : {' '}</strong>
                                {cart.shippingAddress.address} ,{cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode}{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong> Method : {' '}</strong>
                                {cart.paymentMethod}

                            </p>
                        </ListGroup.Item>


                      
                        <ListGroup.Item>
                            <h2>Order Items </h2>
                            {cart.cartItems.length === 0 ? <Message> Your cart is empty </Message> :
                                (

                                    <ListGroup cariant='flush'>
                                        {cart.cartItems.map( (item , index) => (

                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt='item.name' fluid rounded />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                         {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Col>

                                                </Row>

                                            </ListGroup.Item>

                                        ))}
                                  </ListGroup>
                                )}
               
                         </ListGroup.Item>

                </ListGroup>
                </Col>



                <Col md={4}>
               <Card>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2> Order Summary </h2>
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <Row>
                               <Col> Items </Col>
                               <Col> ${cart.itemsPrice}</Col>
                           </Row>
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <Row>
                               <Col> Shipping </Col>
                               <Col> ${cart.shippingPrice}</Col>
                           </Row>
                       </ListGroup.Item>


                       <ListGroup.Item>
                           <Row>
                               <Col> Tax </Col>
                               <Col> ${cart.taxPrice}</Col>
                           </Row>
                       </ListGroup.Item>


                       <ListGroup.Item>
                           <Row>
                               <Col> Total </Col>
                               <Col> ${cart.totalPrice}</Col>
                           </Row>
                       </ListGroup.Item>


                       <ListGroup.Item>
                          {error &&  <Message variant='danger'> {error}</Message>}
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
           
           
           
           
           
            </Row>
        </>

    )
}

export default PlaceOrderScreen
