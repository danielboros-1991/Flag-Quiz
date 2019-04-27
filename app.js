var express    = require("express");
    bodyParser = require("body-parser");
    fs         = require('fs');
    
var app = express();
app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var data = {};
var json = JSON.parse(fs.readFileSync('public/flags.json', 'utf8'));
for(key in json){
    data[key]=json[key];
}

app.get("/", function(req,res){
    res.render("quiz")
});


app.get("/search", function(req,res){
    res.render("search",{data:data})
});

app.post("/search", function(req,res){
    var search = req.body.searchInput;
    res.redirect("/search/"+search);
});

app.get("/search/:id", function(req,res){
    var id = req.params.id;
    res.render("show",{data:data, id:id})
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started.");
})