const express = require('express');
const { createStaff, staffLogin, getAllStaff, deleteStaffById, getStaffDataById } = require('../controller/StaffController');


const router = express.Router();
router.use(express.json());

//allow url encoding
router.use(express.urlencoded({extended:false}))

//create user router
router.post('/createstaff',createStaff);

//get  user router
router.get('/allstaff',getAllStaff);

//get staff data
router.get('/staffdata/:id',getStaffDataById)

//user account login
router.post('/stafflogin',staffLogin);

//delete staff
router.delete('/deletestaff/:id', deleteStaffById)

module.exports = router;