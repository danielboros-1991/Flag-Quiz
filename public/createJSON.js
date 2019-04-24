var path = require('path');
var fs = require('fs');
var csv = require('fast-csv');

// Reading in csv file with countries (key of list) and acronyms (value of list)
var list = {};
let myData ;
var read = fs.createReadStream('country_flags.csv')
.pipe(csv())
.on('data',function(data){  // this function executes once the data has been retrieved
    // console.log(data);  
    var key = data[1]
    list[key] = data[2]
})
.on('end', function(data){
    console.log('Read finished');
})

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

// So until now we have data from csv file in object list={}

// Reading in images paths from Folder 'images'
var data = [];
readFiles('images/', function(filename, content) {
          
  data.push("\'"+filename+"\'")
  
}, function(err) {
  throw err;
});

// We need to set a time function to have all the data available to proceed on writing
// the JSON File after we established an object like : key: Country & value: path (from data array)

setTimeout(function() {
    // console.log(data);
    var result = {}

    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            yep = false;
            for(i=0;i<data.length;i++){
                a = "\'"+list[key]+".png\'"
                
                if( a == data[i]){
                    result[key]=data[i]
                    yep = true;
                }
            }
            if(yep==false){
              console.log("This Country is not found in the image folder: " + key)
            }
        }
    }
    // Here we check which images from the folder are not in the result object (from the csv-file)
    for(i=0;i<data.length;i++){
      if(data[i]){
        var ok = false
        for (var key in result) {
          if (list.hasOwnProperty(key)) {
            if(data[i] == result[key]){
              ok = true
            } 
          }
        }
        // Here we print out all countries not found in the result object
        if(ok == false){
          console.log(data[i]+" was not found in the results object")
        }
      }
      
    }
    // Write the finished object with key: Countryname, value: corresponding image path into a JSON-file
        fs.writeFile("flags.json", JSON.stringify(result), function(err) {
          if(err) {
            return console.log(err);
          }
    
          console.log("The file was saved!");
        });
    }, (3 * 1000));