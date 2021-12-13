const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    res.json({"message":"hi users"})
});

router.post('/', ()=>{});


module.exports = router;