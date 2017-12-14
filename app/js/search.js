var exports = module.exports = {};

/**
 *@return
 */
export.basicsearch = function (JSson, searchinput)
{

  var Jsonobject = JSON.pase(JSon)
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
     return  (_searchname(Jsonobject, searchinput[0]) &&  && _searchbox(Jsonobject, searchinput[2])); //Name + Box
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

function _searchname(Json, searchname)
 {
    return Json.description.contains(this.searchname)
}

function _searchdatum(Json, searchdate) {
    if (_stringtoDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0, 10), "YYYY/mm/dd", "-").parse() == this.searchdate.parse()) {
        return true;
    }
}

/**
 *https://github.com/tmpvar/polygon.js
 *npm install polygon die node.js libary für polygone
 *Copyright (c) <2017> <tmpvar>
 */
function _searchbox(Json, box)
{

    var such = new Polygon([
      Vec2(box[0,0] box[0,1]),
      Vec2(box[1,0] box[1,1]),
      Vec2(box[2,0] box[2,1]),
      Vec2(box[3,0] box[3,1])
    ]);

    var punkte = Json.FOOTPRINT;
    var current = new Polygon( punkte);

    if(current.union(such).toArray[0,0] != null)
    {
      return true;
    }

    else
   {
    return false;
  }

    ])

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
