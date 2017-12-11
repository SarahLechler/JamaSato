var exports = module.exports = {};

/**
 *@return
 */
export.basicsearch = function (JSson, searchinput)
{
    if (searchinput[0] != null && searchinput[1] == null && searchinput[2] == null)
    {
     return  _searchname(Json, searchinput[0]); //Name
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null)
    {
     return  ( _searchdatum(Json, searchinput[1])); //Datum
    }

    else  if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null)
    {
     return  (_searchbox(Json, searchinput[2])); //Box
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] == null)
    {
     return  (_searchname(Json, searchinput[0]) &&  _searchdatum(Json, searchinput[1])); // Name + Datum
    }

    else  if (searchinput[0] != null && searchinput[1] == null && searchinput[2] != null)
    {
     return  (_searchname(Json, searchinput[0]) &&  && _searchbox(Json, searchinput[2])); //Name + Box
    }

    else  if (searchinput[0] == null && searchinput[1] != null && searchinput[2] != null)
    {
     return  ( _searchdatum(Json, searchinput[1]) && _searchbox(Json, searchinput[2])); // Datum + Box
    }

    else  if (searchinput[0] != null && searchinput[1] != null && searchinput[2] != null)
    {
     return  (_searchname(Json, searchinput[0]) &&  _searchdatum(Json, searchinput[1]) && _searchbox(Json, searchinput[2])); //Name + Datum + Box
    }

    else
    {
      throw 'No given data';
    }
}

function _searchname(Json, searchname) {
    return Json.description.contains(this.searchname)
}

function _searchdatum(Json, searchdate) {
    if (_stringtoDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0, 10), "YYYY/mm/dd", "-").parse() == this.searchdate.parse()) {
        return true;
    }
}

/**
 * cord1 links oben, cord2 rechts oben, cord3 links unten, cord4 rechts unten
 * [0]= Nord-Süd
 * [1]= Ost-West
 */
function _searchbox(Json, box)
{

    

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
