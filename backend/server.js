import express from 'express' ;
import dotenv from 'dotenv' ;
import colors from 'colors'
import connectDB from './config/db.js'
//import  products from './data/products.js'
import productRouters from './routes/productRoutes.js'

import usersRouters from './routes/userRoutes.js'

import orderRouters from './routes/orderRoutes.js'

import {NotFound , ErrorHandler} from'./middleware/Errorsmiddleware.js'



dotenv.config()

connectDB() ;




const app = express()


app.use(express.json())


app.get('/' , (req , res) =>{
    res.send('API running')
})


app.use('/api/products' , productRouters)
 
app.use('/api/users' , usersRouters)

app.use('/api/orders' , orderRouters)


app.use(NotFound)

app.use(ErrorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`run server in port ${PORT}`.yellow.bold))

