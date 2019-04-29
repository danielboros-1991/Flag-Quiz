// To run the application this file doesn't have to be executed if the flags.json file
// is already created in the public-folder. 
// This file was created to write the data into a JSON-file which is then
// accessed in the flags web-application. The data comes on the one hand from a csv-file
// which contains all needed country names with their acronyms and on the other hand
// from the images-folder which contains images of these countries. The path names 
// of the images contain the acronyms and based on these acronyms the image-paths 
// and the csv-entries are compared to generate the JSON-file with country names and
// corresponding image paths in the form required for the later reading in by the
// flags web-application.
 

// Package requirements.
var path = require('path');
var fs = require('fs');
var csv = require('fast-csv');

// Reading in csv-file with countries (key of list) and acronyms (value of list).
var list = {};
let myData ;
var read = fs.createReadStream('country_flags.csv')
.pipe(csv())
.on('data',function(data){  // this function executes once the data has been retrieved.
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

// Until this point the data from the csv file is retrieved and stored in the object list={}.

// Reading in images paths from Folder 'images'.
var data = [];
readFiles('images/', function(filename, content) {
          
  data.push("\'"+filename+"\'")
  
}, function(err) {
  throw err;
});

// We need to set a time function to have all the data available to proceed on writing
// the JSON-File after we established an object like : key: Country-name & value: path of image (from data array).
setTimeout(function() {
    var result = {}
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            compareData = false;
            for(i=0;i<data.length;i++){
                a = "\'"+list[key]+".png\'"
                if( a == data[i]){
                    result[key]=data[i]
                    compareData = true;
                }
            }
            if(compareData==false){
              console.log("This Country is not found in the image folder: " + key)
            }
        }
    }
    
    // Checking of which images from the folder are not in the result object (from the csv-file).
    for(i=0;i<data.length;i++){
      if(data[i]){
        var checkData = false
        for (var key in result) {
          if (list.hasOwnProperty(key)) {
            if(data[i] == result[key]){
              checkData = true
            } 
          }
        }
        
        // Here all countries not found in the result object are printed out. 
        if(checkData == false){
          console.log(data[i]+" was not found in the results object")
        }
      }
    }
    // Writing of the finished object with key: Countryname, value: corresponding image path into a JSON-file.
        fs.writeFile("flags.json", JSON.stringify(result), function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });
    }, (3 * 1000));