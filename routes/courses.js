const express = require("express");

const router = express.Router();

router.get('/', (req, res)=>{
    res.json({"message":"hi courses"})
});

router.post('/', ()=>{});

router.get('/:id', ()=>{});
router.put('/:id', ()=>{});
router.delete('/:id', ()=>{});




module.exports = router;