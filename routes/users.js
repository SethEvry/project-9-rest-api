const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/authenticateUser')
const { errorCatcher } = require('../middleware/errorCatcher');
const { User, Course } = require('../models')

router.get('/', authenticateUser, errorCatcher( async (req, res)=>{
   let user = {
       firstName: req.currentUser.firstName,
       lastName: req.currentUser.lastName,
       emailAddress: req.currentUser.emailAddress
   };
   res.status(200).json(user);
}));

router.post('/', authenticateUser, errorCatcher(async (req,res)=>{
    try {
        await User.create(req.body);
        res.redirect(201, '/');
      } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          const errors = error.errors.map(err => err.message);
          res.status(400).json({ errors });   
        } else {
          throw error;
        }
      }
}));


module.exports = router;