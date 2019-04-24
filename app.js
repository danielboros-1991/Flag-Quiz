var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/images"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var searched = "";

app.get("/", function(req,res){
    res.render("quiz")
});

app.get("/search", function(req,res){
    res.render("search",{searched:searched})
});

app.post("/search", function(req,res){
    var search = req.body.searchImage;
    searched = search
    res.redirect("/search");
    
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started.");
})