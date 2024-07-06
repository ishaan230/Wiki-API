const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


mongoose.connect("mongodb://localhost:27017/wikiDB")
const document = {    
    title: String,
    articleContent: String
}
const Document = mongoose.model("Document",document)



app = express()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))



app.route("/articles")

.get(function(req,res){
    Document.find({}).then((data) => {
        res.send(data)
       })
})

.post(function(req,res){
    let title = req.body.title
    let articleContent = req.body.articleContent
    const article = new Document({
        title:title,
        articleContent:articleContent
    })
    article.save()
    console.log('Post Successfull!')
    res.send('Post Successfull!')
    
})

.delete(function(req,res){
    Document.deleteMany({}).then((result)=>{
        console.log(result)
    })

    console.log('Deleted all articles!')
    res.send('Deleted!')
})


app.route("/articles/:name")

.get(function(req,res){
    Document.find({title:req.params.name}).then((data) => {
            res.send(data)
    })
})

.put(function(req,res){
    Document.update(
        {title:req.params.name},
        {title: req.body.title,articleContent:req.body.articleContent}
    ).then((data)=>{
    res.send("Updated with put")
    })
})

.patch(function(req,res){
    Document.updateOne(
            {title:req.params.name},
            {$set : req.body}
    ).then((data)=>{
        res.send("Updated with patch")
    })
})

.delete(function(req,res){
    Document.deleteOne({title:req.params.name}).then((result)=>{
        console.log(result)
    })

    console.log('Deleted all articles!')
    res.send('Deleted!')
})

// .put(async function(req, res) {
//     try {
//         await Document.updateMany(
//             { title: req.params.name },
//             { title: req.body.title, articleContent: req.body.articleContent }
//         );
//         res.send("Updated");
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// })


app.listen(3000,function(){
    console.log("Server started at 3000")
})

