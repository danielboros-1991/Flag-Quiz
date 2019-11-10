// Package requirements.
var express    = require("express");
    bodyParser = require("body-parser");
    fs         = require('fs');
    
// Setting up express-app.    
var app = express();

// Telling express-app where to find static files.
app.use(express.static("public"));
app.use(express.static("public/images"));

// Telling express-app to use middleware to decode data coming back from POST-requests.
app.use(bodyParser.urlencoded({extended:true}));

// Defining the template engine ejs. 
app.set("view engine", "ejs");

// JSON file is read in and stored into an object so that it can be passed on through the 
// different routes to the templating language, ejs-files.
var data = {};
var json = JSON.parse(fs.readFileSync('public/flags.json', 'utf8'));
for(key in json){
    data[key]=json[key];
}

// Rendering the landing-page which contains the flag-quiz.
app.get("/", function(req,res){
    res.render("quiz")
});

// Rendering the search-page with no user-input yet.
app.get("/search", function(req,res){
    res.render("search")
});

// Handling of post request coming from input on search-sites. Redirecting to site with input stored in URL as an id.
app.post("/search", function(req,res){
    var search = req.body.searchInput;
    res.redirect("/search/"+search);
});

// Taking id and rendering the page showing the result of the user's input by passing on the id and also data-object. 
app.get("/search/:id", function(req,res){
    var id = req.params.id;
    res.render("show",{data:data, id:id})
});

// app.listen(3000);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started.");
})