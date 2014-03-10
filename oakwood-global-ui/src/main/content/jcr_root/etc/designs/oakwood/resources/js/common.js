 
    /**
     * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
     * http://javascript.internet.com
     */
    function checkEmail(emailStr) {
       emailStr=trim(emailStr);
       if (emailStr.length == 0) {
           return true;
       }
       var emailPat=/^(.+)@(.+)$/;
       var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
       var validChars="\[^\\s" + specialChars + "\]";
       var quotedUser="(\"[^\"]*\")";
       var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
       var atom=validChars + '+';
       var word="(" + atom + "|" + quotedUser + ")";
       var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
       var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
       var matchArray=emailStr.match(emailPat);
       if (matchArray == null) {
           return false;
       }
       var user=matchArray[1];
       var domain=matchArray[2];
       if (user.match(userPat) == null) {
           return false;
       }
       var IPArray = domain.match(ipDomainPat);
       if (IPArray != null) {
           for (var i = 1; i <= 4; i++) {
              if (IPArray[i] > 255) {
                 return false;
              }
           }
           return true;
       }
       var domainArray=domain.match(domainPat);
       if (domainArray == null) {
           return false;
       }
       var atomPat=new RegExp(atom,"g");
       var domArr=domain.match(atomPat);
       var len=domArr.length;
       if ((domArr[domArr.length-1].length < 2) ||
           (domArr[domArr.length-1].length > 3)) {
           return false;
       }
       if (len < 2) {
           return false;
       }
       return true;
    }	

    function oneMonthFromNow(day, month, year)
    {
    	return thirtyDaysFromNow(day, month, year);
		// convert to doubles
		//day = day - 0.0;
		//month = month - 0.0;
		//year = year - 0.0;

		//if (!isValidDate(day, month, year))
		//{
		//	return null;
		//}
		
		// Date object counts months starting with 0, so
		// we just pass the regular month value, which will
		// be interpreted as this month plus one
		//return new Date(year, month, day);
    }
    
    function thirtyDaysFromNow(day, month, year)
    {
		// convert to doubles
		day = day - 0.0;
		month = month - 0.0;
		year = year - 0.0;

		if (!isValidDate(day, month, year))
		{
			return null;
		}
		
		// Date object counts months starting with 0, so
		// we just pass the regular month value, which will
		// be interpreted as this month plus one
		return new Date(year, month - 1, day + 30);
    }    
    
	function isValidDate(day, month, year) 
	{
		// convert to doubles
		day = day - 0.0;
		month = month - 0.0;
		year = year - 0.0;
		
		if (year < 1900) 
		{
	    	return false;
	    }
	    if (month < 1 || month > 12) 
	    {
            return false;
        }
        if (day < 1 || day > 31) 
        {
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) &&
            (day == 31)) 
        {
            return false;
        }
        if (month == 2) 
        {
            var leap = (year % 4 == 0 &&
                       (year % 100 != 0 || year % 400 == 0));
                       
            if (day > 29 || (day == 29 && !leap)) 
            {
                return false;
            }
        }
        return true;
    }
    
    function getLastDayThisMonth(month, year)
    {
    	var lastDay = 31;
    	
        if ((month == 4 || month == 6 || month == 9 || month == 11)) 
        {
            lastDay = 30;
        }
        else if (month == 2) 
        {
            var leap = (year % 4 == 0 &&
                       (year % 100 != 0 || year % 400 == 0));
                       
            if (leap)
                lastDay = 29;
            else
            	lastDay = 28;
        }        
        return lastDay;
    }
    
    function isValidDateRange(startDay, startMonth, startYear, endDay, endMonth, endYear) 
    {      	 
    	 // convert to doubles
    	 startDay = startDay - 0.0;
    	 startMonth = startMonth - 0.0;
    	 startYear = startYear - 0.0;
    	 endDay = endDay - 0.0;
    	 endMonth = endMonth - 0.0;
    	 endYear = endYear - 0.0;  

		 if(startYear < 2000) 
		 {
		 	startYear += 1900;
		 }
		 if(endYear < 2000) 
		 {
		 	endYear += 1900;
		 }
		 
		 if (endYear < startYear) 
		 {
			 return false;
		 }
		 else if(endMonth < startMonth && endYear == startYear) 
		 {	
		 	return false;
		 }
		 else if(endDay < startDay && endYear == startYear && endMonth == startMonth) 
		 {		
		 	return false;
		 }
		 else
		 {	
		 	return true;
		 }			
 	} 
	
	function isValueInGroup(group, value) 
	{	   
	   if (group[0]) 
	   { 
	      for (var i=0; i<group.length; i++) 
	      {
	         if (group[i].value == value) 
	         {
	            return true
	         }
	      }
	   } 
	   else 
	   {
	      if (group.value == value) 
	      { 
	      	return true; 
	      } 
	   }
	   
	   return false;
	}    
 	
 	function isAllDigits(argvalue) 
 	{
        argvalue = argvalue.toString();
        var validChars = "0123456789";
        var startFrom = 0;
        if (argvalue.substring(0, 2) == "0x") {
           validChars = "0123456789abcdefABCDEF";
           startFrom = 2;
        } else if (argvalue.charAt(0) == "0") {
           validChars = "01234567";
           startFrom = 1;
        } else if (argvalue.charAt(0) == "-") {
            startFrom = 1;
        }
        
        for (var n = startFrom; n < argvalue.length; n++) {
            if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
        }
        return true;
    }
    
	/**
	 * DHTML phone number validation script. 
	 * Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
	 */
	
	// Declaring required variables
	var digits = "0123456789";
	// non-digit characters which are allowed in phone numbers
	var phoneNumberDelimiters = ".()- ";
	// characters which are allowed in international phone numbers
	// (a leading + is OK)
	var validWorldPhoneChars = phoneNumberDelimiters + "+";
	// Minimum no of digits in an international phone no.
	var minDigitsInIPhoneNumber = 7;
	var minDigitsInUSPhoneNumber = 10;
	
	function isInteger(s)
	{   var i;
	    for (i = 0; i < s.length; i++)
	    {   
	        // Check that current character is number.
	        var c = s.charAt(i);
	        if (((c < "0") || (c > "9"))) return false;
	    }
	    // All characters are numbers.
	    return true;
	}
	
	function stripCharsInBag(s, bag)
	{   var i;
	    var returnString = "";
	    // Search through string's characters one by one.
	    // If character is not in bag, append to returnString.
	    for (i = 0; i < s.length; i++)
	    {   
	        // Check that current character isn't whitespace.
	        var c = s.charAt(i);
	        if (bag.indexOf(c) == -1) returnString += c;
	    }
	    return returnString;
	}
	
	function isValidPhone(strPhone, isDomestic) {
		if (isDomestic) {
			return checkUSPhone(strPhone);
		} else {
			return checkInternationalPhone(strPhone);
		}
	}
	
	function checkInternationalPhone(strPhone)
	{
		s=stripCharsInBag(strPhone,validWorldPhoneChars);
		return (isInteger(s) && s.length >= minDigitsInIPhoneNumber);
	}

    // Check US Phone
	function checkUSPhone(strPhone)
	{
		s=stripCharsInBag(strPhone,validWorldPhoneChars);
		return (isInteger(s) && s.length == minDigitsInUSPhoneNumber);
	}
	
	function isNull(str) {
		if ( (!str) || ( trim(str)=='') ) //same as null
		 return true;
		 
	}
	
	function isNotNull(str) {
		if (!(isNull(str)))
		 return true;		 
	}
		
 	// Removes leading whitespaces
   function LTrim( value ) { 	
    	var re = /\s*((\S+\s*)*)/;
    	return value.replace(re, "$1"); 	
   }
    
   // Removes ending whitespaces
   function RTrim( value ) { 	
    	var re = /((\s*\S+)*)\s*/;
    	return value.replace(re, "$1");	
   }
   
   // Removes leading and ending whitespaces
   function trim( value ) {
    	return LTrim(RTrim(value));  	
   }

	
  function openFlash()
  { 
    var childWindow = window.open('/oakwood_demo.htm', '', 'height=410,width=565,menubar=no,scrollbars=no,resizable=no,status=no,toolbar=no');  
    void('');  
    childWindow.focus(); 
  }
  
  //Check a valid format for Pets - XX/XX/XX
  function checkValidFormatPets(strPets)
  {
	  var str = strPets;	  
	  str = removeSpaces(strPets);
	  var reg = new RegExp("[!-.0-~]/([!-.0-~]+)/[!-.0-~]");
	  return (reg.test(str));		
  }
  
  function removeSpaces(string) {
	  return string.split(' ').join('');
	 }
  
  function toggleOtherPolicyDisplay(policyValue)
  {
	  if ((isNotNull(policyValue)) && (trim(policyValue).toString().toLowerCase() == "Other".toLowerCase())) {
		  document.getElementById("othPolicy").style.display = "block";
	  } else {
		  document.getElementById("othPolicy").style.display = "none";
	  }
  }
  
  function toggleElementDisplay(element)
  {
	  if (trim(element.name.toLowerCase()) == "policy".toLowerCase()) {
		  if ((isNotNull(element.value)) && (trim(element.value).toString().toLowerCase() == "Other".toLowerCase())) {
			  document.getElementById("othPolicy").style.display = "block";
		  } else {
			  document.getElementById("othPolicy").style.display = "none";
		  }
	  }
	  if (trim(element.name.toLowerCase()) == "bookingType".toLowerCase()) {
		  if ((isNotNull(element.value)) && (trim(element.value).toString().toLowerCase() == "MGR".toLowerCase())) {
			  document.getElementById("homeHostLocDiv").style.display = "block";
		  } else {
			  document.getElementById("homeHostLocDiv").style.display = "none";
			  document.forms.bookRequestForm["homeHostLocation"].value = "";
		  }
	  }
	  if (trim(element.name.toLowerCase()) == "carPreference".toLowerCase()) {
		  if ((isNotNull(element.value)) && (trim(element.value).toString().toLowerCase() == "Yes".toLowerCase())) {
			  document.getElementById("carpoolPreferenceDiv").style.display = "block";
		  } else {
			  document.getElementById("carpoolPreferenceDiv").style.display = "none";
			  document.forms.bookRequestForm["carpoolPreference"].value = "";
		  }
	  }	  
	  if (trim(element.name.toLowerCase()) == "projectSite".toLowerCase()) {
		  if ((isNotNull(element.value)) && (trim(element.value).toString().toLowerCase() == "Other".toLowerCase())) {
			  document.getElementById("msOtherLocation").style.display = "block";
		  } else {
			  document.getElementById("msOtherLocation").style.display = "none";
		  }
	  }
	  return true;
  }  
  
  function popUp(url,x,y) { 
		var winX = ((screen.availWidth/2)-(x/2)); 
		var winY = ((screen.availHeight/2)-(y/2)); 
		window.open(url,"page","height="+y+",width="+x+",toolbar=0,menubar=0,directories=0,scrollbars=yes, resizable=yes,left="+winX+",top="+winY); 
  } 
  
  function showMessageBox(innerHTML, error) {
    if (error) {
    	innerHTML='<div class="errorMsg" style="font-weight: bold; padding: 10px 0px 10px 0px">'+innerHTML+'</div>';
    }    

	$('#messageBox').html(innerHTML);
	$('#messageBox').slideDown(100, function(){});	
	
  }

  /* Mapping functions */  
  
  var currentShape;
  var currentIcon;
  var notOver=true;
  
  function startMap() {
	  $.getJSON('/action/oakwood/mapping/mapKey', {p: "0"}, function(data) {setMap(data.key);});
  }
  

  
  function hoverPinHandler(e){
   		    if (e.elementID && notOver){
   		    	notOver=false; //prevents flickering
   	   		    currentShape = oakMap.GetShapeByID(e.elementID);
   	   		    currentIcon = currentShape.GetCustomIcon();
   				var cIcon=currentIcon.replace(/class='.*'/, "class='pinStyle pinStyleHover'");
   	   		    currentShape.SetCustomIcon(cIcon);		        
   		    }
  }

  function hoverOutPinHandler(e){
   		    if (e.elementID){
   		        notOver=true;
   	   		    currentShape.SetCustomIcon(currentIcon);
   		    }
  }     
  
  // preload images.. usage $(imageArray).preloadImages();
  function preloadImages(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	    	$('<img>').attr({ src: this }).load(function() {});
	    });
  }

 
  function goToHelp(relativeUrl) {
		window.location.href= "/"+relativeUrl;
  }
  
  
  //For MS form
function validDate(day, monthYear)
{	
	var startDay = day;
	var startMY = monthYear;
	
	var startMonth = "";
	var startYear = "";
			
	var badDate = false;
	// Check that the dates have been selected
    if (startMY == "" || startDay < 1)
        {        	
            badDate = true;
        }
 
 		// Check that the dates are valid dates
	if (!badDate)
    {
    	var startH = startMY.indexOf("_");
   	
    	startMonth = startMY.substring(0, startH) - 0.0 + 1;
    	startYear = startMY.substring(startH + 1, startMY.length);
   	        
    	if (!isValidDate(startDay, startMonth, startYear))
    	{
            badDate = true;
    	}
    }

	return badDate;
}
  
function getDate(day, monthYear)
{	
	var startDay = day;
	var startMY = monthYear;
	
	var startMonth = "";
	var startYear = "";
			
    	var startH = startMY.indexOf("_");
   	
    	startMonth = startMY.substring(0, startH) - 0.0 + 1;
    	startYear = startMY.substring(startH + 1, startMY.length);
    	
    	var d = new Date(startYear, startMonth-1, startDay, 0, 0, 0, 0);

	return d.getTime();
}

//MS specific - Set Length Of Stay or End Date
function setEndDate()
{
	var startDate="";
	var endDate=""; 
	var lengthOfStay=($('#lengthOfStay').val());
	
	if ($('#startDatePicker').val()!=""){
		startDate=new Date($('#startDatePicker').val());
	}
	if ($('#endDatePicker').val()!=""){
		endDate=new Date($('#endDatePicker').val());
	}
	
	if(lengthOfStay !=""){ 
		var end = new Date(startDate);
		end.setDate(startDate.getDate()+parseInt($('#lengthOfStay').val(), 10)-1);
		$("#endDatePicker:text").val(("0" + (end.getMonth() + 1)).slice(-2) + "/" + ("0" + end.getDate()).slice(-2) + "/" + end.getFullYear());
	} else if (endDate !=""){
		$("#lengthOfStay:text").val(setDateDiff(startDate,endDate));		
	}
	
}

function setDefaultEndDate()
{
	var startDate="";
	
	
	if ($('#startDatePicker').val()!=""){
		startDate=new Date($('#startDatePicker').val());
	}
	
	var endDate = new Date($('#endDatePicker').val());
    if(days_into_the_future(startDate, endDate) < 30){
		startDate.setDate(startDate.getDate()+30);
		var mon = startDate.getMonth()+1;
		if(mon < 10)
			mon = '0' + mon;	
		
		$("#endDatePicker:text").val( mon + "/" + (startDate.getDate() < 10?'0'+ startDate.getDate():startDate.getDate()) + "/" + startDate.getFullYear());
    } 
	 
	
}

function days_into_the_future(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms
    
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)

}

//MS specific - Set Length Of Stay or Start Date
function setStartDate()
{
	var startDate="";
	var endDate=""; 
	var lengthOfStay=($('#lengthOfStay').val());
	
	if ($('#startDatePicker').val()!=""){
		startDate=new Date($('#startDatePicker').val());
	}
	if ($('#endDatePicker').val()!=""){
		endDate=new Date($('#endDatePicker').val());
	}
	
	if (startDate !=""){
		$("#lengthOfStay:text").val(setDateDiff(startDate,endDate));		
	} else if(lengthOfStay !=""){ 
		var start = new Date(endDate);
		start.setDate(endDate.getDate()-parseInt($('#lengthOfStay').val(), 10)+1);
		$("#startDatePicker:text").val(("0" + (start.getMonth() + 1)).slice(-2) + "/" + ("0" + start.getDate()).slice(-2) + "/" + start.getFullYear());
	}
	
}

//MS specific - Using End Date and Start Date, set Length Of Stay
function setLengthOfStay() {
	var startDate="";
	var endDate=""; 
	var lengthOfStay=($('#lengthOfStay').val());
	
	if ($('#startDatePicker').val()!=""){
		startDate=new Date($('#startDatePicker').val());
	}
	if ($('#endDatePicker').val()!=""){
		endDate=new Date($('#endDatePicker').val());
	}
	
	if (!isNaN(lengthOfStay)){
		if (startDate !=""){
			var end = new Date(startDate);
			end.setDate(startDate.getDate()+parseInt($('#lengthOfStay').val(), 10)-1);
			$("#endDatePicker:text").val(("0" + (end.getMonth() + 1)).slice(-2) + "/" + ("0" + end.getDate()).slice(-2) + "/" + end.getFullYear());
		} else if(endDate !=""){
			var start = new Date(endDate);
			start.setDate(endDate.getDate()-parseInt($('#lengthOfStay').val(), 10)+1);
			$("#startDatePicker:text").val(("0" + (start.getMonth() + 1)).slice(-2) + "/" + ("0" + start.getDate()).slice(-2) + "/" + start.getFullYear());
		}

	};
}


//MS specific - Using End Date and Start Date, calculate Length Of Stay
function setDateDiff(startDate, endDate) {
	
	var startDate = new Date(startDate);
	var endDate = new Date(endDate);	
	var day = Math.round((endDate.getTime()-startDate.getTime())/24000/3600);
	
	return day+1;	
}


function oak_setDisplay(elem, disp) {
    if (document.getElementById) { //ie5+ / ns6+
        obj = document.getElementById(elem);
        obj = obj.style;
    }
    else if (document.all) obj = document.all[elem].style
    else if (document.layers) obj = document.layers[elem].layer;
    if (!obj) return false;

	if (disp == true)
	{
    	obj.display = "block";
    }
    else
    {
    	obj.display =  "none";
    }

    return true;
}
  