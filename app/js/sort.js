
/**
*@function sorts the coordinats after date (/LF00050/)
**/
function sortdate(liste)
{
  liste.sort(function(a,b)

  {
    var date1 = a._getdatum;
    var date2 = b._getdatum;

    return date1 - date2;
  }
}

/**
* Nur die Metadaten
*/
function _getdatum()
{
  _stringtoDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0, 10), "YYYY/mm/dd", "-").parse()
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
