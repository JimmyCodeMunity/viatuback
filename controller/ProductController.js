const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/Product');
const upload = require('../utils/stogareConfig');
const cloudinary = require('../utils/cloudinaryConfig');


// const createProduct = async (req, res) => {
//     try {
//         const { productname, price, description } = req.body;
//         const images = req.files.map(file => file.filename);


//         const product = await Product.create({
//             productname,
//             price,
//             description,
//             image:images
//         })
//         res.status(200).json({ message: 'new product added successfully',product });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'We experienced and error while creating product.Please try again.\u{1F625}' })

//     }
// }

const createProduct = async (req, res) => {
    try {
      const { productname, price, description } = req.body;
      const files = req.files;
  
      // Upload images to Cloudinary and get the URLs
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'products',
        })
      );
  
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map((result) => result.secure_url);
  
      const product = await Product.create({
        productname,
        price,
        description,
        image: imageUrls,
      });
  
      res.status(200).json({ message: 'New product added successfully', product });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'We experienced an error while creating the product. Please try again. 😥',
      });
    }
  };

//see all products

const getProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error fetching products' })
    }
}


const getProductById = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}


//delete product
const deleteProductById = async (req, res) => {
  try {
      const {id} = req.params;
      const product = await Product.findByIdAndDelete(id, req.body);
      if(!product){
          res.status(404).json({message: 'Product not found'})
      }
      else{
          console.log("Product deleted successfully")
          res.status(200).json(product)
      }
      
  } catch (error) {
      console.log(error);
      res.status(500).json({message: error.message})
      
  }
}
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProductById,
}