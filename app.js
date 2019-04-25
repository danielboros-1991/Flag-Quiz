var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/images"));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var fs = require('fs');

var data = {};

// var searched = "";

var json = JSON.parse(fs.readFileSync('public/flags.json', 'utf8'));
for(key in json){
    data[key]=json[key]
}
console.log(data)

app.get("/", function(req,res){
    res.render("quiz")
});

app.get("/search", function(req,res){
    res.render("search",{data:data})
});

// app.post("/search", function(req,res){
//     var search = req.body.searchImage;
//     searched = search
//     res.redirect("/search");
    
// });




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started.");
})