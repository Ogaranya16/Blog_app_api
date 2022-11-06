const router = require("express").Router()
 const Article = require("../models/Article")



router.patch("/:id", async (req, res) => {
   try {
    //await Car.findOneAndUpdate({id:req.body.car},{status:'available'})
    const {id} = req.params
       const article = await Article.findOneAndUpdate(
        {_id: id}, {state:"Published"}, {returnOriginal: false}
       )
    //    collection.findOneAndUpdate(
    //     whereObj,
    //     updateObj,
    //     {returnOriginal: false});
       res.status(200).json(article)
   } catch (err) {
    res.status(400).json(err)
   }
})




module.exports = router;