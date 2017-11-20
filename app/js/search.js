
/**
*@return
*/
function searchname(Json,searchname)
{
  return Json.description.contains(this.searchname)
}

function searchdatum(Json, searchdate)
{
  if(stringtoDate(Json.DATATAKE_1_DATATAKE_SENSING_START.substring(0,10),"YYYY/mm/dd","-").parse() == this.searchdate.parse())
  {
    return true;
  }
}

/**
* cord1 links oben, cord2 rechts oben, cord3 links unten, cord4 rechts unten
* [0]= Nord-Süd
* [1]= Ost-West
*/
function searchbox(Json,cord1,cord2,cord3,cord4)
{

  //von oben
  if([0] <= cord1[0] &&  && this.cord <= cord2[0] && (this.cord >= cord1[1] || this.cord <= cor2[1]))
  {
    return true
  }

  //von unten
  else if([0] >= cord3[0] && this.cord >= cord4[0] && ( this.cord >= cord3[1]||this.cord <= cor4[1]))
  {
    return true
  }

  //von links
  else if( this.cord >= cord1[1]  && this.cord >= cor3[1] && ([0] <= cord1[0] || this.cord >= cord3[0] ))
  {
    return true
  }

  //von rechts
  else if( this.cord <= cord2[1]  && this.cord <= cor4[1] && ([0] <= cord2[0] || this.cord >= cord4[0] ))
  {
    return true
  }

}

/**
* von https://stackoverflow.com/questions/5619202/converting-string-to-date-in-js
*/
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}
