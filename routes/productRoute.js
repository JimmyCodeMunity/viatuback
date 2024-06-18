const express = require('express');
const { createProduct, getProducts,getProductById, deleteProductById } = require('../controller/ProductController');


const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createproduct',createProduct);

//get  user router
router.get('/allproducts',getProducts);

//get product by id
router.get('/allproducts/:id',getProductById)


//delete product
router.delete('/deleteproduct/:id', deleteProductById)

//user account login
// router.post('/userlogin',userLogin);

module.exports = router;