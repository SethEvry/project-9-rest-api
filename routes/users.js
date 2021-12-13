const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/', authenticateUser, (req, res)=>{
    res.json({"message":"hi users"})
});

router.post('/', ()=>{});


module.exports = router;