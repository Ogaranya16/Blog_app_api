const router = require("express").Router()
 const Article = require("../models/Article")



router.get("/", async (req, res) => {
   try {
       const articles = await Article.find(
        {state: "published"}
       )

       res.status(200).json(articles)
   } catch (err) {
    res.status(400).json(err)
   }
})

router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
 
        res.status(200).json(article)
    } catch (err) {
     res.status(400).json(err)
    }
 })




module.exports = router;