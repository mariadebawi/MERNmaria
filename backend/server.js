import express from 'express' ;
import dotenv from 'dotenv' ;
import colors from 'colors'
import connectDB from './config/db.js'
//import  products from './data/products.js'
import productRouters from './routes/productRoutes.js'

import {NotFound , ErrorHandler} from'./middleware/Errorsmiddleware.js'



dotenv.config()

connectDB() ;


const app = express()


app.get('/' , (req , res) =>{
    res.send('API running')
})


app.use('/api/products' , productRouters)
 


app.use(NotFound)

app.use(ErrorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`run server in port ${PORT}`.yellow.bold))

