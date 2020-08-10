const router = require('express').Router();
const verify = require('./verifyRoute');
const User = require('../model/user');

router.get('/',verify, async (req,res) =>{

    res.send(await User.findById({_id:req.user._id}));
    
    
}); 



module.exports = router;