const router = require("express").Router()
const User = require("../models/User")
const readingTime = require('reading-time')
const Article = require("../models/Article")
const mongoose = require('mongoose')
const {verifyToken} = require('../middleware/checkAuth')


//CREATE NEW ARTICLES
router.post("/", verifyToken, async (req, res) =>{
  const newArticle = new Article(req.body);
      try {
          const savedArticle = await newArticle.save();
          res.status(200).json(savedArticle);
      }catch (err) {
      res.status(500).json(err);
      }
})

//UPDATE ARTICLES
router.put("/:id", verifyToken, async (req, res) =>{
  try {
    const article = await Article.findByIdAndUpdate(req.params.id);
    if(article.author === req.body.author){

        try {
           const updatedArticle = await Article.findByIdAndUpdate(req.params.id,{
            $set:req.body,
           },
           { new: true}
           );
           res.status(200).json(updatedArticle)
        } catch (err) {
            res.status(500).json(err)
        }
    } else{
        res.status(401).json("You can only update your article!")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//DELETE POST
router.delete("/:id",verifyToken, async (req, res) =>{
    try {
      const article = await Article.findById(req.params.id);
      if(article.author === req.body.author){
          try {
            await article.delete()
            res.status(200).json("Article deleted ...")
          } catch (err) {
              res.status(500).json(err)
          }
      } else{
          res.status(401).json("You can only delete your article!")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  })
//GET ARTICLES by id
router.get("/:id", async (req, res) => {
  try{
      const article = await Article.findById(req.params.id)
        article.readcount++
        await article.save()
        res.status(200).json(article)
        console.log(article)
     
      
  }catch (err) {
    res.status(500).json(err)
  }
}
);


//GET ALL ARTICLES
router.get("/", async (req, res) => {
  try { 
      const {page = 1, limit = 20} = req.query;
    const articles = await Article.find()
     .limit(limit *1)
     .skip((page - 1) * limit);
     const search = req.query.search||"";
     let sort = req.query.sort || "state";
     let state = req.query.state || "All";

     const stateOptions = [
      "Published",
      "Draft",
     ];

     state === "All"
      ?(state = [...stateOptions])
      :(state = req.query.state.split(","));
      req.query.sort?(sort = req.query.sort.split(",")): (sort = [sort])


      let sortBy = {}
      if (sort[1]){
        sortBy[sort[0]] = sort[1]
      } else {
        sortBy[sort[0]] = "asc"
      }
      // const articles = await Article.find({title: { $regex: search, $options: "i"}})
       

       const total = await Article.countDocuments({
        state: {$in: [...state]},
        name: {$regex: search, $options: "i"},
        state: {$regex: search, $options:"i"}
       })
       .where("state")
       .in([...state])
       .sort(sortBy)
       .skip(page * limit)
       .limit(limit)

       const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        state: stateOptions,
        articles,
       }
     res.status(200).json({ total: articles.length, articles})
  }catch(err) {
   console.log(err);
   res.status(500).json({
      error: err
   })
  }
}
)

router.get("/", async (req, res) => {
  const author = req.query.author;
  const title = req.query.title;
  const tags = req.query.tags;
  try{
    let articles;
    if(author, title, tags){
     const  articles = await Article.find({author, title, tags})
    } else if (titlename){
      articles = await Article.find({title});
    } else if (tagsname){
      articles = await Article.find({tags: {
        $in: [tagsname]
      }})
    } else {
      articles = articles.find();
    }
    res.status(200).json();
  }catch (err) {
      res.status(500).json(err)
  }
}
)





module.exports = router;