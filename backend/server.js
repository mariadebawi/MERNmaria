import express from 'express' ;
import  products from './data/products.js'
import dotenv from 'dotenv' ;

dotenv.config()

const app = express()

app.get('/' , (req , res) =>{
    res.send('running')
})


app.get('/api/products' , (req , res) =>{
    res.json(products)
})


const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`run server in port ${PORT}`))

