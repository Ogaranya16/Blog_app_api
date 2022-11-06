const User = require("../models/User")
const Articles = require('../models/Article')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {verifyToken} = require('../middleware/checkAuth')

//ERROR HANDLING
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password:'' }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = "user already exist"
        return errors;
    }


//error validating
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
      })
    }

    return errors;
}



module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {

    try{
      const {first_name,last_name, email, password, username} = req.body;
      if(!(email && password && first_name && last_name && username)){
        res.status(400).send("All input is required")
      }
        
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
       const user = await User.create({first_name, last_name, username, email, password})
       //create jwt
       const token = jwt.sign(
        {user_id: user._id, email},
         process.env.JWT_SERECTKEY,
        {
          expiresIn: "1h"
         }
       )
       ///saving token
       user.token = token
       res.status(200).json(user)
    }catch (err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    
   try {
    const { email, password} = req.body;
    if (!(email, password)) {
      res.status(400).send("All input are required")
    }
    const user = await User.findOne({email})
     if (user && (await bcrypt.compare(password, user.password))) {
        //create jwt
        const token = jwt.sign(
          {user_id:user._id, email},
           process.env.JWT_SERECTKEY,
          {
            expiresIn: "1h"
           }
         )
         ///saving token
         user.token = token
      res.status(200).json(user);
    } 
    res.status(400).send('invalid credentials')
  }catch (err) {
      console.log(err)
  }
   
   
}