var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var jsonfile = require('jsonfile');
//var gdalinfo = require('gdalinfo-json');

var mainFolderPath = "C:\\Users\\Emma\\Documents\\Uni\\WiSe17\\Geosoftware2\\exampleData"; //'/opt/sentinel2'

var folderArray = fs.readdirSync(mainFolderPath, "")

for (var i = 0; i < folderArray.length; i++) {
    var jsonData = mainFolderPath + '\\' + folderArray[i] + '/metadata.json'   //pfade zusammenfügen als funktion
    if (!fs.existsSync(jsonData)) {
        var dataPath1 = mainFolderPath + '\\' + folderArray[i] + '/MTD_MSIL1C.xml';
        var dataPath2 = mainFolderPath + '\\' + folderArray[i] + '/MTD_MSIL2A.xml';

        if (fs.existsSync(dataPath1)) {
            
            var jsonmd = child_process.execSync('gdalinfo -json ' + dataPath1, {'encoding': 'UTF8'});
            jsonfile.writeFile(jsonData, jsonmd);
           
        } else if (fs.existsSync(dataPath2)) {
            var jsonmd = child_process.execSync('gdalinfo -json ' + dataPath2, {'encoding': 'UTF8'});
            jsonfile.writeFile(jsonData, jsonmd);
        }
        console.log(jsonmd);
    }

}

