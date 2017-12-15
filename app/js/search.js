var exports = module.exports = {};

/**
 *@return
 */
exports.search = function (JSon, searchinput)
{

  var Jsonobject = JSON.parse(JSon);
    if (searchinput[0] != null && searchinput[1] == null && searchinput[2] == null)
    {
     return  _searchname(Jsonobject, searchinput[0]); //Name
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null)
    {
     return  ( _searchdatum(Jsonobject, searchinput[1])); //Datum
    }

    else  if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null)
    {
     return  (_searchbox(Jsonobject, searchinput[2])); //Box
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] == null)
    {
     return  (_searchname(Jsonobject, searchinput[0]) &&  _searchdatum(Jsonobject, searchinput[1])); // Name + Datum
    }

    else  if (searchinput[0] != null && searchinput[1] == null && searchinput[2] != null)
    {
     return  (_searchname(Jsonobject, searchinput[0]) &&  _searchbox(Jsonobject, searchinput[2])); //Name + Box
    }

    else  if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null)
    {
     return  ( _searchdatum(Jsonobject, searchinput[1]) && _searchbox(Jsonobject, searchinput[2])); // Datum + Box
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null)
    {
     return  (_searchname(Jsonobject, searchinput[0]) &&  _searchdatum(Jsonobject, searchinput[1]) && _searchbox(Jsonobject, searchinput[2])); //Name + Datum + Box
    }

    else
    {
      throw 'No given data';
    }
}

function _searchname(Json, name)
 {
    return Json.description.contains(name);
}

function _searchdatum(Json, date)
 {
    if (_stringToDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0, 10), "yyyy/mm/dd", "-").parse() == date.parse())
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
