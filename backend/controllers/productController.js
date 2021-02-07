import Product from '../models/productModel.js'

import asyncHandler from 'express-async-handler'


// @desc fetch ALL Products
// @route GET /api/products
// @access  Public


const getProducts =  asyncHandler(async(req , res) =>{
    const products = await Product.find({})
    //throw new Error('some error')

    res.json(products)

})



// @desc fetch  Product  with id
// @route GET /api/products/:id
// @access  Public


const getProductById =  asyncHandler(async(req , res) =>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)

    }
    else{
        //res.json(`message : product Not found`)
        res.status(404) ;
        throw new Error('Product Not Found ')

    }
})

export {
    getProducts , getProductById
     
}