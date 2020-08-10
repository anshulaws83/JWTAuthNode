const router = require('express').Router();

const User = require('../model/user');
const {registerValidation, loginValidation} = require('../validation');
const becrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register user

router.post('/register', async(req, res) => {
    //Validate before creating user

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    //Check if user exists

    const emailExists = await User.findOne({email:req.body.email});

    if(emailExists) return res.status(400).send('Email already exists');

    //hash the password
    const salt = await becrypt.genSalt(10);
    const hashPwd = await becrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashPwd
    });
    try{
        const savedUser = await user.save();
        res.send(user._id);
    }catch(err){
        res.status(400).send(err);
    }
});


//login user


router.post('/login', async(req, res) => {
    //Validate before creating user

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    //Check if user exists

    const user = await User.findOne({email:req.body.email});

    if(!user) return res.status(400).send('User does not exist');

    //check the password

    const validPwd = await becrypt.compare(req.body.password, user.password);
    if(!validPwd)return res.status(400).send('Invalid Password');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});








module.exports = router;