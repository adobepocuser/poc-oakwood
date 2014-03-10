<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

  Default body script.

  Draws the HTML body with the page content.

  ==============================================================================

--%><%@page session="false" pageEncoding="ISO-8859-1" %><%
%><%@include file="/libs/wcm/global.jsp"%><%
%><body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" class="home">
    <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script> 
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places">
</script>
<script type="text/javascript">
var WRInitTime=(new Date()).getTime();
var geocoder = new google.maps.Geocoder();   
var PostCodeid = "#Postcode";
var longval = "#hidLong";
var latval = "#hidLat";
$(document).ready(function () {
   
	$(function () {
        $(PostCodeid).autocomplete({
            //This bit uses the geocoder to fetch address values
            source: function (request, response) {
                geocoder.geocode({ 'address': request.term }, function (results, status) {
                    response($.map(results, function (item) {
                 	   $(latval).val(results[0].geometry.location.lat());
						   $(longval).val(results[0].geometry.location.lng());
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address
                        };
                    }));
                });
            }
        });
    });
});
			
			
			
</script>
<style>
    #bookAptSearch{
		right:25.5%;
     }
    .footerContainer{
            background-color : #75a1aa;
    }
</style>


<div>
<cq:include script="header.jsp"/>
</div>

<div class="middleContentContainer">
<div class="middleContentWrapper mainPageWidth">

	<div>
    	<div style="width:72%;background-color:#FFFFFF;">
            <cq:include path="contentContainer" resourceType="foundation/components/parsys"/>
        </div>
        
        
        
        <div>
        <cq:include path="searchContainer" resourceType="/apps/oakwood/components/oakwoodSearch"/>
        </div>
    </div>    
    
    <div>
    <cq:include path="calloutContainer" resourceType="/apps/oakwood/components/oakwoodCallouts"/>
    </div>
    
    <div>
    <cq:include path="footerlinksContainer" resourceType="/apps/oakwood/components/footerLinks"/> 
    </div>

</div>   
</div>    

<div>
<cq:include script="footer.jsp"/>
</div>

<script src="<%= designer.getDesignPath(currentPage) %>/resources/js/easySlider/easySlider1.7.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/BrightcoveExperiences.js" type="text/javascript"></script><script type="text/javascript">
				
			$(document).ready(function() {
				showBookAptSearch();
				showBookAptSearchPanel();
				$("#sliderContainer").show();											
			});

			$(document).ready(function(){	
				$("#slider").easySlider({
					auto: 		true,
					continuous: true,
					pause:		4000,
					speed: 		600,
					numeric: 	true
				});
				brightcove.createExperiences();	
			});	
			
			$("#sliderLi1").click(function() {
				$("#slider").hide();
		  		$("#controls").hide(); 
		  		$("#frontPageVideo").show();
			});
		
			$("#frontPageVideoClose").click(function() {
				$("#frontPageVideo").hide();
				$("#controls").show();
				$("#slider").show();
			});
					
		</script>
<div style="display: none;" id="ClickTaleDiv"></div>
<script type="text/javascript">
			document.write(unescape("%3Cscript%20src='"+
			(document.location.protocol=='https:'?
			'https://clicktale.pantherssl.com/':
			'http://s.clicktale.net/')+
			"WRc5.js'%20type='text/javascript'%3E%3C/script%3E"));
		</script><script type="text/javascript">
			var ClickTaleSSL=1;
			if(typeof ClickTale=='function') ClickTale(49684,0.25,"www");
		</script>

	<cq:include path="timing" resourceType="foundation/components/timing"/>
    <cq:include path="analytics" resourceType="cq/analytics/components/analytics"/>
</body>