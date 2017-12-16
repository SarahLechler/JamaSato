var exports = module.exports = {};

/**
 *@return
 */
exports.search = function (input)
{
    var mainFolderPath = "C:\\Users\\Emma\\Documents\\Uni\\WiSe17\\Geosoftware2\\exampleData";
    var i = 0;
    var liste = [];
    var erg = [];
    switch(_tofind(input))
    {
        case 1:
            while(i < liste.length-1)
            {
                if(_searchname(JSON.parse(liste[i]), input[0]))
                {
                     erg.push(liste[i]);
                }
                 i++;
             }

        break;

        case 2:
            while(i < liste.length-1)
            {
                if(_searchdatum(JSON.parse(liste[i]), input[1]))
                {
                    erg.push(liste[i]);
                }
                i++;
            }

        break;

        case 3:
            while(i < liste.length-1)
            {
                if(_searchbox(JSON.parse(liste[i]), input[2]))
                {
                    erg.push(liste[i]);
                }
                i++;
            }

        break;

        case 4:
            while(i < liste.length-1)
            {
                if(_searchname(JSON.parse(liste[i]), input[0]))
                {
                    if(_searchdatum(JSON.parse(liste[i]), input[1]))
                    {
                        erg.push(liste[i]);
                    }
                }
                i++;
            }

        break;

        case 5:
            while(i < liste.length-1)
            {
                if(_searchname(JSON.parse(liste[i]), input[0]))
                {
                    if(_searchbox(JSON.parse(liste[i]), input[2]))
                    {
                        erg.push(liste[i]);
                    }
                }
                i++;
            }

        break;

        case 6:

            while(i < liste.length-1)
            {
                if(_searchdatum(JSON.parse(liste[i]), input[1]))
                {
                    if(_searchbox(JSON.parse(liste[i]), input[2]))
                    {
                        erg.push(liste[i]);
                    }
                }
                i++;
            }

        break;

        case 7:
            while(i < liste.length-1)
            {
                if(_searchname(JSON.parse(liste[i]), input[0]))
                {
                    if(_searchdatum(JSON.parse(liste[i]), input[1]))
                    {
                        if(_searchbox(JSON.parse(liste[i]), input[2]))
                        erg.push(liste[i]);
                    }
                }
                i++;
            }

        break;

        default:


    }

    return erg;


}
function _tofind(searchinput)
{
       if (searchinput[0] != null && searchinput[1] == null && searchinput[2] == null) {
           return 1 //Name
       }

       else if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null) {
           return 2 //Datum
       }

       else if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null) {
           return 3; //Box
       }

       else if (searchinput[0] != null && searchinput[1] != null && searchinput[2] == null) {
           return 4; // Name + Datum
       }

       else if (searchinput[0] != null && searchinput[1] == null && searchinput[2] != null) {
           return 5; //Name + Box
       }

       else if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null) {
           return 6; // Datum + Box
       }

       else if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null) {
           return 7; //Name + Datum + Box
       }



}

function _searchname(Json, name)
 {
    return Json.description.contains(name);
}

function _searchdatum(Json, date)
 {
    if (_stringToDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0, 10), "yyyy/mm/dd", "-").getTime() == date.getTime())
    {
        return true;
    }
}

/**
 *https://github.com/tmpvar/polygon.js
 *npm install polygon, die node.js libary für polygone
 *Copyright (c) <2017> <tmpvar>
 */
function _searchbox(Json, box)
{

    var such = new Polygon(box);
    var punkte = Json.FOOTPRINT;
    var current = new Polygon(punkte);
    return current.union(such).toArray[0,0] != null;

}

/**
 * von https://stackoverflow.com/questions/5619202/converting-string-to-date-in-js
 */
function _stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}
