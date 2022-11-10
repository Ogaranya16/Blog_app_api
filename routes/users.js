const jwt = require('jsonwebtoken')
const router = require("express").Router()
const {verifyToken} = require('../middleware/checkAuth')
const Article = require("../models/Article")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const bcryptjs = require('bcryptjs')



//CREATE NEW ARTICLES
router.post("/", async (req, res) =>{
    const newArticle = new Article(req.body);
    if (req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const savedArticle = await newArticle.save();
            res.status(200).json(savedArticle);
        }catch (err) {
        res.status(500).json(err);
      }
    } else{
        res.status(401).json("authorized users only!")
    }
   
})

//UPDATE
router.put("/:id", async (req, res) =>{
    if (req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
           },{new:true}); 
           res.status(200).json(updatedUser)
        }catch (err) {
        res.status(500).json(err);
      }
    } else{
        res.status(401).json("Update your account!")
    }
} )
//DELETE
router.delete("/:id", async (req, res) =>{
    if (req.body.userId === req.params.id) {
        try{
            const user = await User.findbyId(req.params.id)
            try {
                //delete one article
               await Article.findByIdAndDelete({author: user.author})
                //deleting more than one article
              await Article.deleteMany({author:user.author});
                //deleting user
              await User.findByIdAndDelete(res.params.id);
              res.status(200).json("User deleted!")
            }catch (err) {
              res.status(500).json(err);
        }
    }catch (err) {
        res.status(404).json("User not found!")
    }

    } else{
        res.status(401).json("You can only delete your account!")
    }
})


//GET USER 
router.get("/:id", async (req, res) => {
    try{
          const user = await User.findById(req.params.id)
          const {password, ...others} = user._doc
          res.status(200).json(others)
    }catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;