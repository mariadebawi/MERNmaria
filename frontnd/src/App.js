
import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import { Container} from 'react-bootstrap'

import HomeScreen from './Screens/HomeScreen'

import ProductScreen from './Screens/ProductScreen'

import CartScreen from './Screens/CartScreen'

import LoginScreen from './Screens/LoginScreen'

import RegisterScreen from './Screens/RegisterScreen'

import ProfileScreen from './Screens/ProfileScreen'

import ShippingScreen from './Screens/ShippingScreen'

import PaymentScreen from './Screens/PaymentScreen'

import PlaceOrderScreen from './Screens/PlaceOrderScreen'



const App = () => {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          

          <Route  path='/login'  component={LoginScreen}/>

          <Route  path='/register'  component={RegisterScreen}/>

          <Route  path='/profile'  component={ProfileScreen}/>


          <Route  path='/product/:id'  component={ProductScreen}/>

          <Route  path='/cart/:id?'  component={CartScreen}/>

          <Route  path='/shipping'  component={ShippingScreen}/>

          <Route  path='/payment'  component={PaymentScreen}/>

          <Route  path='/placeorder'  component={PlaceOrderScreen}/>

          
          <Route  path='/'  component={HomeScreen} exact/>

        </Container>
        
      </main>
      <Footer/>

    </Router>
  )
}

export default App
