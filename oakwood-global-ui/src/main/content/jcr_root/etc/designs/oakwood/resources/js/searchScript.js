//for new search controller 

var searchingHTML= '<span style="font-family: Arial; font-size: 14px">Searching for properties that<br/> match your criteria, please wait...<br/><img src="http://images.oakwood.com/oakwood2/images/new/spinner.gif"/></span>';


$('#searchButton').click(function() {
	

	  $.blockUI({ css: { 
          border: '2px solid #42747f', 
          padding: '10px', 
          backgroundColor: '#FFF', 
          'border-radius': '10px', 
          '-moz-border-radius': '10px', 
          opacity: 1.0, 
          color: '#000' 
      }, 
      overlayCSS:  { 
          backgroundColor: '#000', 
          opacity:         0.3 
      },
      message: searchingHTML });	
	
	//delay submit by 500ms to allow animated search message to fully load
	setTimeout ("$('#propertySearchForm').submit();", 500);

	//don't submit the search, use the setTimeOut to do that
	return false;
});	


function selectLocation(location)
{
	$("#locationSuggestion").val(location);
	$("#searchButton").click();
}