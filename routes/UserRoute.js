const express = require('express');
const { createUser, userLogin, getAllUsers, deleteUserById, getAllUsersById } = require('../controller/UserController');


const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createuser',createUser);

//get  user router
router.get('/allusers',getAllUsers);

//user account login
router.post('/userlogin',userLogin);


router.get('/userdata/:id',getAllUsersById);


//delete user
router.delete('/deleteuser/:id', deleteUserById)

module.exports = router;