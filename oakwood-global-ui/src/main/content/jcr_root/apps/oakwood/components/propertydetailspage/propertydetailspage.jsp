<%--

  Property Details Page component.



--%>


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

  Default page component.

  Is used as base for all "page" components. It basically includes the "head"
  and the "body" scripts.

  ==============================================================================

--%><%@page session="false" pageEncoding="ISO-8859-1" contentType="text/html; charset=ISO-8859-1" %><%
%><%@page import="com.day.cq.wcm.api.WCMMode,org.apache.sling.api.request.RequestPathInfo,javax.jcr.*,java.util.*" %><%
%><%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %><%
%><cq:defineObjects/><%
	String propertyName = "Property Name";
    String propertyOverview = "Property Overview";
	Value[] propertyApartmentAmenities = null;
	Value[] propertyCommunityAmenities = null;
	Value[] propertyRoomType = null;
	StringBuilder address = new StringBuilder("");
	List<String> photosList = new ArrayList<String>();
      try{
		RequestPathInfo requestPathInfo = slingRequest.getRequestPathInfo();
        String[] selectorsArray = requestPathInfo.getSelectors();
      	int selectorsLength = 0;
    	if(selectorsArray != null){
       		selectorsLength = selectorsArray.length;
    	}
      	if(selectorsLength !=0){
            Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
            Node oakwoodNode = session.getNode("/etc/commerce/products/oakwood");
            if(oakwoodNode!=null){
                if(oakwoodNode.hasNode(selectorsArray[0])){
                    Node propertyNode = oakwoodNode.getNode(selectorsArray[0]);
                    if(propertyNode.hasNode("propertyimages")){
                        NodeIterator iter = propertyNode.getNode("propertyimages").getNodes();
                        while(iter.hasNext()){
                            Node imageNode = iter.nextNode();
                            if(imageNode.hasNodes()){
								NodeIterator imageNodeIter = imageNode.getNodes();
                                while(imageNodeIter.hasNext()){
                                    Node imageNode1 = imageNodeIter.nextNode();
                                    if(imageNode1.hasProperty("fileReference")){
										photosList.add(imageNode1.getProperty("fileReference").getString());
                                    }
                                }
                            }
                        }
                    }
                    if(propertyNode.hasProperty("name")){
                        propertyName = propertyNode.getProperty("name").getString();
                        address.append(propertyName + "  |  ");
                    }
					if(propertyNode.hasProperty("city")){
                        address.append(propertyNode.getProperty("city").getString() + "  ");
                    }
                    if(propertyNode.hasProperty("state")){
                        address.append(propertyNode.getProperty("state").getString() + "  ");
                    }
                    if(propertyNode.hasProperty("postcode")){
                        address.append(propertyNode.getProperty("postcode").getString() + "  |  ");
                    }
                    if(propertyNode.hasProperty("phonenum")){
                        address.append(propertyNode.getProperty("phonenum").getString());
                    }
                    if(propertyNode.hasProperty("overview")){
                        propertyOverview = propertyNode.getProperty("overview").getString();
                    }
                    if(propertyNode.hasProperty("apartment_amenities")){
                        if(propertyNode.getProperty("apartment_amenities").isMultiple()){
                            propertyApartmentAmenities = propertyNode.getProperty("apartment_amenities").getValues();
                        }else{
                            propertyApartmentAmenities = new Value[1];
							propertyApartmentAmenities[0] = propertyNode.getProperty("apartment_amenities").getValue();
                        }
                    }
                    if(propertyNode.hasProperty("community_amenities")){
                        if(propertyNode.getProperty("community_amenities").isMultiple()){
                        	propertyCommunityAmenities = propertyNode.getProperty("community_amenities").getValues();
                        }else{
							propertyCommunityAmenities = new Value[1];
                            propertyCommunityAmenities[0] = propertyNode.getProperty("community_amenities").getValue();
                        }
                    }
                    if(propertyNode.hasProperty("room_type")){
                        if(propertyNode.getProperty("room_type").isMultiple()){
                        	propertyRoomType = propertyNode.getProperty("room_type").getValues();
                        }else{
							propertyRoomType = new Value[1];
    						propertyRoomType[0] = propertyNode.getProperty("room_type").getValue();
                        }
                    }
                }

            }

%>
<%

    // read the redirect target from the 'page properties' and perform the
    // redirect if WCM is disabled.
    String location = properties.get("redirectTarget", "");
    if (WCMMode.fromRequest(request) == WCMMode.DISABLED && location.length() > 0) {
        // check for recursion
        if (!location.equals(currentPage.getPath())) {
            response.sendRedirect(request.getContextPath() + location + ".html");
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
        return;
    }    
    if (currentDesign.getPath().endsWith("geometrixx")) {
        %><cq:include path="." resourceType="geometrixx/components/contentpage" /><%
    } else {
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><%=propertyName%></title>
<meta name="description" content="Seattle corporate housing and temporary furnished, executive or luxury, apartment rentals available. Whether you are looking for short term housing or extended stay, for vacation or business travel, Oakwood has the Furnished Apartments you are looking for.">
<meta name="keywords" content="Seattle Furnished Apartments, Seattle corporate housing, Seattle temporary apartments, Seattle furnished apartments, furnished housing, corporate apartments, temporary housing, Seattle serviced apartments, short term housing, extended stay, business travel, corporate suites, relocation, rentals, accommodations, lodging, condotel, executive, luxury">
<meta content="0y-8Rjl6OhbDEPHH-GJyduucYDRGTlfHj71I69p6Yjw" name="google-site-verification">
<meta content="256EEBD629C23DDD0C09BB0A6987974E" name="msvalidate.01">
<link type="text/css" href="http://www.oakwood.com/css/style-sheet.css" rel="Stylesheet">
<link media="screen" href="http://www.oakwood.com/css/superfish/superfish_custom.css" type="text/css" rel="stylesheet">
<LINK MEDIA="screen" HREF="http://www.oakwood.com/css/property-details.css" TYPE="text/css" REL="StyleSheet">
<LINK MEDIA="screen" HREF="//images.oakwood.com/scripts/jquery/css/smoothness/jquery-ui-1.10.0.custom.min.css" TYPE="text/css" REL="StyleSheet">
<!--[if IE 7]><link rel="stylesheet" href="http://www.oakwood.com/css/style-sheet-ie7.css" type="text/css" /><![endif]-->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/jquery.blockUI.js" type="text/javascript"></script><script src="//images.oakwood.com/scripts/jquery/js/jquery-ui-1.10.0.custom.min.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/dhtml.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/common.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/flashDetection.js" type="text/javascript"></script>
    </head>
<body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" class="home">
<script type="text/javascript">
			var WRInitTime=(new Date()).getTime();
		</script>
<div class="mainNavContainer">
<div class="mainNavWrapper mainPageWidth">
<div id="bookAptSearch">
<span id="bookAptNavButton"><img title="Click to Open/Close Apartment Search" src="http://images.oakwood.com/images/frontPage/btn_apartmentSearch.png"></span>
<div id="bookAptSearchPanel">

<div id="advancedSearchPanel">

<form id="propertySearchForm" action="/action/oakwood/search" method="get">
    	<input id="currentPage" type="hidden" name="currentPage" value="1"/>		
    	<input id="altLocationIndex" type="hidden" name="altLocationIndex" value="-1"/>
    	<input id="resultsPerPage" name="resultsPerPage" type="hidden" value="20"/>
    	<input id="sort" name="sort" type="hidden" value="avl"/>
				<input type="hidden" name="basicSearch" value="false"/>			
<div class="searchboxWrapper">

<div class="tb"><div class="bb"><div class="lb"><div class="rb">
<div class="rbl"><div class="rbr"><div class="rtl"><div class="rtr">  

	<div id="MainContent" class="searchbox" style="font-size: 12px">   			   			 			

	  	  <div id="searchFields">	


			  <div id="locationInput" class="row" style="margin-bottom: 10px">											
					<input id="locationSuggestion" name="locationSuggestion" class="inputfield" style="width:200px;" type="text" value="Seattle, Washington, United States"/>						
			  </div>
			<div id="furnishedBox" class="row" style="margin-bottom: 10px">
					<input id="furnishedTrue" name="furnished" type="radio" value="true" checked="checked"/>			
					<span><label for="furnishedTrue">Furnished</label></span>
						<input id="furnishedFalse" name="furnished" type="radio" value="false"/>
						<span><label for="furnishedFalse">Unfurnished</label></span>
			</div>
			    <div class="row">
			  	  <div><b>Search Within:</b></div>
			      <div>
			  	    <select id="radius" name="radius" class="inputfield" style="width: 60px;">
			  	    	<option value="3">3</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
						<option value="20">20</option>
						<option value="25" selected="selected">25</option>
						<option value="30">30</option>
						<option value="35">35</option>
						<option value="40">40</option>
						<option value="45">45</option>
						<option value="50">50</option>
						<option value="75">75</option>
						<option value="100">100</option>
	   			    </select>

	   			    <input id="distanceMiles" name="distanceType" type="radio" value="1" checked="checked"/>
	   			    <span><label for="distanceMiles">Miles</label></span>

	   			    <input id="distanceKilometers" name="distanceType" type="radio" value="2"/>
	   			    <span><label for="distanceKilometers">Kilometers</label></span>
			  	  </div>	

			    </div>
			<div class="row">
				<div>			
				</div>
				<div>
					<div>
					  <b>Move-In Date:</b>
					</div>
					<div>
						<input id="startDatePicker" name="startDateString" class="inputfield" style="width:90px;" onchange="setDefaultEndDate();" readonly="readonly" type="text" value="02/19/2014"/>
					</div>
				</div>
			</div>
			<div class="row">
			    <div>

			    </div>
				<div  >
					<div>
					  <b>Move-Out Date:</b>
					</div>

					<div>
						<input id="endDatePicker" name="endDateString" class="inputfield" style="width:90px;" readonly="readonly" type="text" value="03/20/2014"/>
					</div>
				</div>


			 </div>			




			  <div class="row">
			 	<div><b>Room Type:</b></div>
			  	<div>
    				<select id="bedrooms" name="bedrooms" class="inputfield" style="width: 100px">>
          				<option value="0">Studio</option><option value="1" selected="selected">1 Bedroom</option><option value="2">2 Bedroom</option><option value="3">3 Bedroom</option><option value="4">4 Bedroom</option><option value="5">5 Bedroom</option>	
					</select>
			  	</div>
			  </div>
			  <div class="row">
			    <div style="float:left;width:110px;">
					<div><b>Number of Apts:</b></div>

					<input id="quantity" name="quantity" class="inputfield" style="width: 30px;" type="text" value="1" maxlength="2"/>

				</div>

			  	<div style="margin-bottom:5px">
			    	<div><b>Pet Friendly:</b>	</div>
					<div><input id="petFriendly1" name="petFriendly" type="checkbox" value="true"/><input type="hidden" name="_petFriendly" value="on"/></div>				
			  	</div>
			  </div>	

			  <div class="row" >
				<b>Promo Code:</b>
				<div>
					<input id="promoCode" name="promoCode" class="inputfield" style="width: 100px;" type="text" value="" maxlength="30"/>
				</div>
			  </div>		  


			<div class="row" style="margin-top: 5px; overflow: hidden;">
				<input id="searchButton" type="image" src="http://images.oakwood.com/images/frontPage/SearchNow_btn.png" alt="Search">
			</div>



	     </div>




	</div>

</div></div></div></div>
</div></div></div></div>

</div>


</form>




<script type="text/javascript">

	var pleaseWaitSearch='Please wait while we search for properties that match your criteria...';
	var errorSearch='There was a problem with your search, please check the apartment search form.';
	var cityLabel='City';
	var zipLabel='Zip/Postal Code';

	var isAdvancedSearch=false;

	var inputSuggestion='Please enter a city or zip';

	var currentLocationSuggestion= $.trim($("#locationSuggestion").val());

	if (currentLocationSuggestion=='') {
		$("#locationSuggestion").val(inputSuggestion);
	}

	$("#locationInput").show();

	$("#locationSuggestion").click(function() {
			currentLocationSuggestion= $.trim($("#locationSuggestion").val());
			if (currentLocationSuggestion==inputSuggestion) {
				$("#locationSuggestion").val('');
			}
	});




	   isAdvancedSearch=true;





	$(function() {
		$( "#startDatePicker" ).datepicker({
			numberOfMonths: 1,
			minDate: +1
		});

		$( "#endDatePicker" ).datepicker({
			numberOfMonths: 1
		});
	});



	//location search suggestion autocomplete
	$("#locationSuggestion").autocomplete({
	   	 	source: function (request, response) {
	   	 		$.getJSON("/action/oakwood/search/locationSuggestion?location=" + $('#locationSuggestion').val(), function(data) {  
	           	  response( $.map( data, function(item) {	
	                return {
	                  label: item['label'],
	                  value: item['value']
	                };
	              }));          
	           	});
	   	 	},
	   	 	select: function( event, ui ) {
	          },
		    minLength: 3,
		    delay: 300
	});






</script>


<script type="text/javascript" src="http://www.oakwood.com/js/searchScript.js"></script>
   


</div>

			</div>
</div>
<div class="miniNav">
<a href="http://www.oakwood.com/groupreserve">Group Reservations</a>
                |
              <a href="http://www.oakwood.com/cms/events.html">Events</a>
                |
              <a href="http://www.oakwood.com/cms/careers-1.html">Careers</a>
                |
              <a id="clientLogin" href="https://portal.oakwood.com/c/portal/forward_last?userType=client">Client Login</a>
                |
              <a id="residentLogin" href="http://www.oakwood.com/myOakwood">Resident Login</a>
                |
              <a href="http://www.oakwood.com/cms/contact-us-1.html">Contact Us</a>
</div>
<div class="mainNavLogo">
<a title="Oakwood Worldwide Home" href="http://www.oakwood.com"><img alt="Oakwood, The Most Trusted Name in Corporate Housing Worldwide" border="0" src="http://images.oakwood.com/images/Oakwood_logo.png"></a>
</div>
<ul style="position: absolute; bottom: 0px; left: 0px" class="sf-menu">
<li>
<a style="color: #FFF" href="http://www.oakwood.com/cms/accommodations.html">Accommodations</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/take-a-tour.html">Take A Tour!</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/video-tour.html">Video Tour</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/photo-gallery.html">Photo Gallery</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/typical-floor-plans.html">Typical Floor Plans</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/virtual-tours.html">Virtual Tours</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/furnished-rentals.html">Furnished Rentals</a>
</li>
</ul>
</li>
<li>
<a href="http://www.oakwood.com/cms/apartments.html">Furnished Apartments</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/residences.html">Residences</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/group-accommodations.html">Group Accommodations</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/rental-options.html">Rental Options</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/apartment-services.html">Apartment Services</a>
</li>
</ul>
</li>
<li style="position: relative; top: 9px">|</li>
<li>
<a style="color: #FFF" href="http://www.oakwood.com/cms/industries-served.html">Business Solutions</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/client-testimonials.html">Client Testimonials</a>
</li>
<li>
<a href="http://www.oakwood.com/government">Government</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/federal-civilian.html">Federal Civilian</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/gsa-schedule-48.html">GSA Schedule 48</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/military-2.html">Military</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/per-diem-rates.html">Per Diem Rates</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/government-contracting.html">Government Contractors</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/fedrooms-2.html">Fedrooms</a>
</li>
</ul>
</li>
<li>
<a href="http://www.oakwood.com/cms/insurance.html">Insurance</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/displaced-insured.html">Displaced Insured</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/adjusters.html">Adjusters</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/catastrophe-teams.html">Catastrophe Teams</a>
</li>
</ul>
</li>
<li>
<a href="http://www.oakwood.com/cms/relocation.html">Relocation</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/consulting.html">Consulting</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/entertainment.html">Entertainment</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/filming-at-oakwood.html">Filming at Oakwood</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/child-actor-program.html">Child Actor Program</a>
</li>
</ul>
</li>
<li>
<a href="http://www.oakwood.com/cms/oil-and-gas.html">Oil &amp; Gas</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/finance-and-banking.html">Finance &amp; Banking</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/health-care.html">Health Care</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/education.html">Education</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/construction.html">Construction</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/retail.html">Retail</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/travel-and-tourism.html">Travel &amp; Tourism</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/travel-agents.html">Travel Agents</a>
</li>
</ul>
</li>
</ul>
</li>
<li style="position: relative; top: 9px">|</li>
<li>
<a style="color: #FFF" href="http://www.oakwood.com/cms/the-oakwood-difference.html">Why Oakwood</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/home-away-from-home.html">A Home Away From Home</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/locations-where-you-need.html">Locations Where You Need Them</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/gold-stand-cust-serv.html">Gold Standard Customer Service</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/industry-leader.html">The Industry Leader</a>
</li>
</ul>
</li>
<li style="position: relative; top: 9px">|</li>
<li>
<a style="color: #FFF" href="http://www.oakwood.com/cms/global-destinations.html">Global Destinations</a>
<ul>
<li>
<a href="http://www.oakwood.com/cms/north-america.html">North America</a>
<ul>
<li>
<a href="http://www.oakwood.com/area/properties/US/IL/Chicago.html">Chicago</a>
</li>
<li>
<a href="http://www.oakwood.com/area/properties/US/DC/Washington.html">Washington D.C.</a>
</li>
<li>
<a href="http://www.oakwood.com/area/properties/US/CA/Los-Angeles.html">Los Angeles</a>
</li>
<li>
<a href="http://www.oakwood.com/area/properties/US/CA/Mountain-View.html">Mountain View</a>
</li>
<li>
<a href="http://www.oakwood.com/area/properties/US/NY/New-York.html">New York</a>
</li>
<li>
<a href="http://www.oakwood.com/area/properties/US/CA/San-Diego.html">San Diego</a>
</li>
</ul>
</li>
<li>
<a href="http://www.oakwood.com/cms/europe-middleeast-africa.html">Europe, Middle East &amp; Africa</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/asia-pacific.html">Asia Pacific</a>
</li>
<li>
<a href="http://www.oakwood.com/cms/latin-america.html">Latin America</a>
</li>
</ul>
</li>
<li style="position: relative; top: 9px">|</li>
<li>
<a style="color: #FFF" href="http://www.oakwood.com/cms/special-offers.html">Special Offers</a>
</li>
</ul>
<script src="http://www.oakwood.com/js/superfish/hoverIntent.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/superfish/superfish.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/superfish/supersubs.js" type="text/javascript"></script><script src="http://www.oakwood.com/js/customNavigation.js" type="text/javascript"></script>
</div>
</div>
<div class="middleContentContainer">
<div class="middleContentWrapper mainPageWidth">
<div id="messageBox"></div>
<div class="bodyNoNav">         	 


<link rel="stylesheet" href="http://www.oakwood.com/css/prettyPhoto/prettyPhoto-compressed.css" type="text/css" media="screen" charset="utf-8" />
<script src="http://www.oakwood.com/js/prettyPhoto/jquery.prettyPhoto-compressed.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript"  src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.3"> </script>		



<div class="propertyDetailsWrapper">


	<div id="MainContent" class="propertyDetailsHeader">
	<form id="bookRequestForm" name="bookRequestForm" action="/action/oakwood/lead/bookRequest" method="get">
		<input type="hidden" name="propertyId"/>
		<input type="hidden" name="requestType" value="1280"/>
		<input type="hidden" name="numOfBedrooms" value="1"/>
		<input type="hidden" name="numOfApartments" value="1"/>
		<input type="hidden" name="furnishType" value="Furnished"/>
		<input type="hidden" name="startDateString" value="02/19/2014"/>
		<input type="hidden" name="endDateString" value="03/20/2014"/>
		<input type="hidden" name="altLocationIndex" value="-1"/>
		<input type="hidden" name="groupForm" value="false"/>			
	</form>

	<script type="text/javascript">	 
		function bookRequest(propId, nbrRooms) {
	 		$("#bookRequestForm [name=propertyId]").val(propId);
	 		$("#bookRequestForm [name=numOfBedrooms]").val(nbrRooms);
	 		$("#bookRequestForm").submit();
		}	
	</script>	
		  		<div style="margin-bottom:10px;">
				 &nbsp;&nbsp;	  		

			   </div>



  			<h1 style="margin-bottom: 5px;"><%=propertyName%></h1>

   		    <div class="propertyDetailsAddressSpacing"><%=address.toString()%></div>
	</div>


	<div class="propertyDetailsContainer">
		<div class="leftNav">
  <div class="leftnav_wrapper">

    <div class="leftnav_container">

	  <div class="leftnav_section">
			<div class="leftnav_section_title_active">		
			  <div class="expander">
			    <img src="http://www.oakwood.com/images/spacer.gif">			    
		      </div>
		      <div class="header">
			    <a style="color: #FFF" href="http://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191.html?quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q="><b>Overview</b></a>
		      </div>
		    </div>
	  </div>
			<div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
				  <img src="http://www.oakwood.com/images/spacer.gif">
		 	    </div>
			    <div class="header">
				      <span class="galleryLinkC leftNavSpan" ><b>Pictures</b></span>
		 	    </div>
	          </div>
	 	    </div>
		  		    <div class="leftnav_section">		  		    

	    			  <div class="leftnav_section_title">							
					       <div class="expander">
					        	   <img id="furnishingsLink" onclick="javascript:toggleLeftNavigation('furnishingsLink', 'furnishingstable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png"/>					         	
					       </div>
					       <div class="header">
							  <a  href="javascript:toggleLeftNavigation('furnishingsLink', 'furnishingstable');"><b>Furnishings</b></a>	
					 	   </div>				 	    
					  </div>				
					  <div id="furnishingstable" class="leftnav_section_subsection" style='display:none'>
											<div class="article_title_container">	
												<span id="0" class="furnishingsLinkC leftNavSpan">Oakwood Signature Apartment</span>
											</div>
											<div class="article_title_container">	
												<span id="1" class="furnishingsLinkC leftNavSpan">Standard Furnishings and Accessories</span>
											</div>
											<div class="article_title_container">	
												<span id="2" class="furnishingsLinkC leftNavSpan">Utilities and Conveniences</span>
											</div>
											<div class="article_title_container">	
												<span id="3" class="furnishingsLinkC leftNavSpan">Housekeeping Service</span>
											</div>
											<div class="article_title_container">	
												<span id="4" class="furnishingsLinkC leftNavSpan">Asian Kitchen Package</span>
											</div>
											<div class="article_title_container">	
												<span id="5" class="furnishingsLinkC leftNavSpan">Additional Items</span>
											</div>
					  </div>					  
			  	    </div>		
	    <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
			      <img src="http://www.oakwood.com/images/spacer.gif">
		 		</div>
		  	    <div class="header">
		  	    	<span class="amenitiesLinkC leftNavSpan" ><b>Amenities</b></span>	
		 	    </div>
	  		</div>
	 	</div>
	    <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">



					        	   <img id="schoolLink" onclick="javascript:toggleLeftNavigation('schoolLink', 'schooltable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png"/>					         	


		 		</div>
		 		<div class="header">
							 <a  href="javascript:toggleLeftNavigation('schoolLink', 'schooltable')"><b>School Info</b></a>				 	   
				</div>	
			</div> 
		  	    <div id="schooltable" class="leftnav_section_subsection" style='display:none'>
							<div class="article_title_container">	
								<span id="2" class="schoolsLinkC leftNavSpan">All Schools</span>							
							</div>
							<div class="article_title_container">	
								<span id="14" class="schoolsLinkC leftNavSpan">Elementary Schools</span>							
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="15" class="schoolsLinkC leftNavSpan">Middle Schools</span>							
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="16" class="schoolsLinkC leftNavSpan">High Schools</span>							
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="17" class="schoolsLinkC leftNavSpan">Colleges & Universities</span>							
							</div>
						
										
					
					  		
					
		 	    </div>
	  		   
	 	</div>
		
	    <div class="leftnav_section">	
	    
	    			<div class="leftnav_section_title">		
					       <div class="expander">
					           
					         	  
					         	  
					        	   <img id="placesLink" onclick="javascript:toggleLeftNavigation('placesLink', 'placestable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png"/>					         	
					         	  
					            
					       </div>
					       <div class="header">
							 <a  href="javascript:toggleLeftNavigation('placesLink', 'placestable')"><b>Neighborhood Info</b></a>				 	   
						   </div>				 	    
					</div>	    

				    					 
				    <div id="placestable" class="leftnav_section_subsection" style='display:none'>
										
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="12" class="poiLinkC leftNavSpan">Local Attractions</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="1" class="poiLinkC leftNavSpan">Restaurants</span>						
							</div>
						
										
					
					  		
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="3" class="poiLinkC leftNavSpan">Shopping Centers</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="4" class="poiLinkC leftNavSpan">Grocery Stores</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="5" class="poiLinkC leftNavSpan">Pet Care Centers</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="6" class="poiLinkC leftNavSpan">Hospitals</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="7" class="poiLinkC leftNavSpan">Theaters</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="8" class="poiLinkC leftNavSpan">Health Clubs</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="9" class="poiLinkC leftNavSpan">Government Offices</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="10" class="poiLinkC leftNavSpan">Business Services</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="11" class="poiLinkC leftNavSpan">Nightlife Attractions</span>						
							</div>
						
										
					
					  		
					
					  						
						
						
						
							<div class="article_title_container">	
								<span id="13" class="poiLinkC leftNavSpan">Other Attractions</span>						
							</div>
						
										
					
					  		
					
					  		
					
					  		
					
					  		
					
					  		
					
					
					</div>
					


		</div>


	  

	  

	  

	  
	  <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
			      <img src="http://www.oakwood.com/images/spacer.gif">
		 		</div>
		  	    <div class="header">
					<span class="policiesLinkC leftNavSpan" ><b>Rental Guidelines</b></span>
			    </div>
	  		  </div>
	  </div>		

	  
	  <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
			      <img src="http://www.oakwood.com/images/spacer.gif">
		 		</div>
		  	    <div class="header">
		     		<span class="petsInfoLinkC leftNavSpan" ><b>Pet Policy</b></span>
			    </div>
	  		  </div>
	  </div>
	  

    </div>
    
  </div>
  
  <script type="text/javascript">
 
  	function loadPOILink(poiId, currentPlaceName) {
		var currentPlaceType='currentPlaceType='+poiId;
		var poiL='/furnished-apartments/furnished/US/WA/Seattle/prop191/goToPOI' + '.html?' + currentPlaceType + '&poiSearch=false&poiTypeString=&currentPlaceTypeName=' + escape(currentPlaceName) + '&quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
		document.location.href=poiL;	
  	}
  	
  	function addTailingUrl(){
  		return '.html?quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
  	}
  	
	$(document).ready(function(){

		//deter crawlers
		$(".furnishingsLinkC").click(function() {			
			var packageIndex='packageIndex='+$(this).attr("id");
			var furnishingsL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptFurnishings' + '.html?' + packageIndex + '&quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
			document.location.href=furnishingsL;
		});
		
		$(".amenitiesLinkC").click(function() {			
			var amenitiesL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptAmenities' + addTailingUrl();
			document.location.href=amenitiesL;
		});
		
		$(".galleryLinkC").click(function() {			
			var galleryL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showGallery' + addTailingUrl();
			document.location.href=galleryL;
		});
			
		$(".virtualToursLinkC").click(function() {			
			var vtL='/furnished-apartments/furnished/US/$propertysubnationalRegionabbreviation}/Seattle/prop191/showVTours' + addTailingUrl();
			document.location.href=vtL;
		});		
		
		$(".siteMapLinkC").click(function() {			
			var siteMapL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptSiteMap' + addTailingUrl();
			document.location.href=siteMapL;
		});		
				
		$(".floorPlansLinkC").click(function() {			
			var floorPlanL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptFloorPlans' + addTailingUrl();
			document.location.href=floorPlanL;
		});				
		
		
		$(".policiesLinkC").click(function() {			
			var policiesL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptPolicies' + addTailingUrl();
			document.location.href=policiesL;
		});		
		
		
		$(".petsInfoLinkC").click(function() {			
			var galleryL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showPetPolicies' + addTailingUrl();
			document.location.href=galleryL;
		});
		
		$(".schoolsLinkC").click(function() {	
			loadPOILink($(this).attr("id"), $(this).text());
		});
		
		$(".poiLinkC").click(function() {			
			loadPOILink($(this).attr("id"), $(this).text());
		});
		
		$(".poiLinkLearnMore").click(function() {			
			loadPOILink($(this).attr("id"), 'Local Attractions');
		});
		
		
	});
	
</script>	
	

		</div>
		<div id="MainContent" class="rightContent">		
			<div id="tabs">

			<ul>
					<li id="leftli"><a href="#tabs-1"  style="text-decoration: none" id="leftTab">Overview</a></li>

					<li id="rightli"><a  href="#tabs-2" style="text-decoration: none" id="rightTab" ><span>Map & Directions</span></a></li>

				</ul>
				
				
					
<script type="text/javascript">
$(document).ready(function(){

	$("#rightTab").click(function(){
  		$("#tabs-1").hide();
        $("#tabs-2").show();
		$("#rightli").addClass("ui-state-active ui-tabs-active");
		    if($("#leftli").hasClass("ui-state-active ui-tabs-active")){
		    	 $("#leftli").removeClass("ui-state-active ui-tabs-active");
		    }
		});

   $("#leftTab").click(function(){
  		$("#tabs-2").hide();
        $("#tabs-1").show();
		$("#leftli").addClass("ui-state-active ui-tabs-active");
		     if($("#rightli").hasClass("ui-state-active ui-tabs-active")){
				$("#rightli").removeClass("ui-state-active ui-tabs-active");
			}
		});
});
</script>	
				
				
				<div id="tabs-1">
				<div class="iconRight">
						  	<img src="http://www.oakwood.com/images/propertyDetails/get_more_info.gif" alt="Request Group Reservation" border="0" />							
						  	<a class="PDGroupReservation" href="http://www.oakwood.com/reserve/furnished/groupreserve?propertyId=191&groupForm=true">
						  	Request Group Reservation	
							</a>			  
				  <span style="margin-left: 15px"> 
				  <img src="http://www.oakwood.com/images/propertyDetails/email.gif" alt="Email This Page" border="0" />
				  </span>
				  <a class="PDEmailThisPage" href="http://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191/emailThisPage.html?iframe=true&width=600&height=550&quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower" rel="prettyPhoto">
						Email This Page		</a>	

				  
				  <span style="margin-left: 15px"> 
					<img src="http://www.oakwood.com/images/propertyDetails/pdf.jpg" alt="Save as PDF" border="0" />
				  </span>
				  <span id="PDFGenerator" class="PDPdf manualLink">
					Save as PDF	 
				  </span>

				</div>


				<div class="propertySummary">


				  <div class="propertySummaryContainer">


					<div class="photoGalleryContainer">



						<script type="text/javascript" charset="utf-8">
	 					 var maxImage=<%=photosList.size()%>;	
				  		 var photoGalleryArray='<%=photosList%>';
						</script>
                        <%for(int count=0; count<photosList.size(); count++){%>
							<a href="<%=photosList.get(count)%>" rel="prettyPhoto[pictures]" id="photo<%=count%>"></a>
                        <%}%>						
						<div class="whiteCanvas">
                            <%if(photosList.size() > 0){%>
                                <div id="photoGallery">
                                    <img src="<%=photosList.get(0)%>" width="300" height="230" border="0" id="mainPhoto" style="cursor: pointer" onclick="javascript:showLarge();"/>				
                                </div>
                            <%}%>
							<div class="navigationContainer">
								 <table width="100%">
								 <tr>					
									<td align="left">
										<div id="previousImageActive">
										<a href="javascript:previousPropertyImage()">
											<img src="http://www.oakwood.com/images/propertyDetails/left_arrow.gif" alt="" border="0"/>
										</a>
										</div>
										<div id="previousImageInactive">
											<img src="http://www.oakwood.com/images/propertyDetails/left_arrow_grey.gif" alt="" border="0"/>
										</div>
									</td>
				  					<td align="center">
										<span class="viewgallerytext" onClick="javascript:showLarge();" style="cursor: pointer">View Photo Gallery	</span>
							 		</td>
						   	 		<td align="right"> 
										<div id="nextImageActive">
											<a href="javascript:nextPropertyImage()">
												<img src="http://www.oakwood.com/images/propertyDetails/right_arrow.gif" alt="" border="0"/>
											</a>
										</div>
										<div id="nextImageInactive">
											<img src="http://www.oakwood.com/images/propertyDetails/right_arrow_grey.gif" alt="" border="0"/>
										</div>
							 		</td>
							 	 </tr>
							  	 </table>
							</div>
						</div>
					</div>
					<div class="summaryContainer">

						<div class="propertyName">
						  <font class="propertyNameLarge"><%=propertyName%></font>			
						</div>
                        <p><%if(propertyOverview.length()>150){%>
							<%=propertyOverview.substring(0,150)%>....
                            <%}else{%>
                            	<%=propertyOverview%>
                            <%}%>
                            <a href="http://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191.html?quantity=1&bedrooms=1&startDateString=02/19/2014&endDateString=03/20/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetail"><span class="disptextredunderline">More			</span></a>	
						</p>
			  		      <div><strong>APARTMENT AMENITIES	</strong></div>
						  <div class="amenitiesContainer">
							<div class="amenitiesSection">
								<ul class="amenitiesList">
                                    <%
        								int counter = 0;
        								if(propertyApartmentAmenities!=null){
        									counter = propertyApartmentAmenities.length;
                                            if(propertyApartmentAmenities.length>4){
                                                counter = 4;
                                            }
                                            for(int count=0; count<counter; count++){%>
                                                <li style="margin-bottom: 5px;"><%=propertyApartmentAmenities[count].getString()%></li>
                                    <%}}%>
								</ul>						    								
                             </div>
                             <div class="amenitiesSection">
                             	<ul class="amenitiesList">
                                    <%if(propertyApartmentAmenities.length>4 && propertyApartmentAmenities!=null){
										counter = propertyApartmentAmenities.length;

            						for(int count=4; count<propertyApartmentAmenities.length; count++){%>
										<li style="margin-bottom: 5px;"><%=propertyApartmentAmenities[count].getString()%></li>		
                                    <%}}%>
								</ul>						    								
							</div>
						  </div>
						  <div style="text-align: right">
						  	<span class="amenitiesLinkC manualLink">More</span>	
						  </div>
					</div>
				 </div>
				 <div class="bookNowContainer">
				  		<div class="pricesPanel">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td colspan="4">
				<span><strong>DAILY RATES</strong></span>
		</td>
	</tr>
	<tr>
		<td colspan="4">
		<hr class="hr" />
		</td>
	</tr>
    <%
        if(propertyRoomType!=null){
		counter = propertyRoomType.length;
        for(int count=0; count<counter; count++){%>
            <tr>
                <!-- room type -->
                <td><SPAN><%=propertyRoomType[count].getString()%></SPAN></td>
                <td><SPAN>Call for pricing</SPAN></td>
                <td><SPAN>Not Available</SPAN></td>
                <td align="right"><a href="javascript:bookRequest('191', '0');" >Request</a></td>
            </tr>
            <tr>
                <td colspan="4"><hr class="hr"></td>
            </tr>
    <%}}%>
</table>
						</div>
						<div class="buttonsPanel">
							<div>
										<a href="javascript:bookRequest('191', '1');">
											<img src="http://images.oakwood.com/oakwood2/images/new/RequestNow.png" border="0" alt="Request Now">
									  	</a>
							</div>
						</div>
				 </div>	
				 <div style="margin-top: 10px">	
						<SPAN>
						</SPAN>
				</div>
			</div>	
  <!-- BEGIN FOR CREATING PDF -->  
<FORM METHOD="POST" NAME="myForm" action="/action/oakwood/property/pdf">
	<INPUT TYPE="HIDDEN" NAME="photo" VALUE="https://portal.oakwood.com/profiles/images/0914/946/Photos/914g431a.jpg" />		
	<INPUT TYPE="HIDDEN" NAME="propertyId" VALUE="191">
	<INPUT TYPE="HIDDEN" NAME="phone" value="877.902.0832"/>
</FORM> 
<!-- END FOR CREATING PDF -->
  <script type="text/javascript">
	$(document).ready(function(){
		//deter crawlers
		$("#PDFGenerator").click(function() {			
			document.myForm.submit();
			return false;
		});
	});
  </script>
					<div> 
						<a name="propDetailLower"></a>
						<div class="profileOverviewSection">
								<span class="subtitle">COMMUNITY AMENITIES</span>	
									<div class="subtitleAlign">
										<div class="amenitiesContainer">
										    <div class="left">
												<ul class="amenitiesList">
                                                    <%	if(propertyCommunityAmenities!=null){
                                                        counter = propertyCommunityAmenities.length;
                                                        if(propertyCommunityAmenities.length>2){
                                                            counter = 2;
                                                        }
                                                        for(int count=0; count<counter; count++){%>
                                                            <li style="margin-bottom: 5px;"><%=propertyCommunityAmenities[count].getString()%></li>
                                                        <%}%>																									
												</ul>
											</div>
											<div class="middle">												
												<ul class="amenitiesList">
													<%
                                                        if(propertyCommunityAmenities.length>2 && propertyCommunityAmenities!=null){
                                                            counter = propertyCommunityAmenities.length;

                                                        for(int count=2; count<counter; count++){%>
                                                            <li style="margin-bottom: 5px;"><%=propertyCommunityAmenities[count].getString()%></li>
                                                    <%}}}%>
												</ul>
											</div>
											<div class="right">																											
												<span class="amenitiesLinkC" style="cursor: pointer">
													<img src="http://images.oakwood.com/oakwood2/images/new/ViewAllAmenities.png" border="0"/>
												</span>				
											</div>
									    </div>
									</div>
						</div>			
			<div class="profileOverviewSection">
				<span class="subtitle">LOCAL SCENE					</span>				
				<div class="subtitleAlign">
					<div class="localSceneContainer">
							<div class="left">					
								<DIV>
<UL>
<LI>Walking distance to the waterfront, downtown shopping, entertainment, and cultural events</LI>
<LI>Across from Seattle Art Museum</LI>
<LI>Walk to new Symphony Hall</LI>
<LI>Easy access to major freeways</LI>
<LI>Close to Seattle Center, Pike Place Market, and Westlake Center</LI>
<LI>Walk to Sports centers Safeco Field, Qwest Field, and Key Arena</LI></UL></DIV>						
							</div>
						<div class="right">
								<div class="poi">								
										<img src="http://www.oakwood.com/images/propertyDetails/restuarants.gif"/>&nbsp;	
										<span id="1" class="poiLinkC manualLink">Restaurants</span>														
								</div>													
								<div class="poi">
										<img src="http://www.oakwood.com/images/propertyDetails/shopping.gif"/>&nbsp;
										<span id="3" class="poiLinkC manualLink">Shopping</span>																								
								</div>	
								<div class="poi">							
										<img src="http://www.oakwood.com/images/propertyDetails/grocery_stores.gif"/>&nbsp;
										<span id="4" class="poiLinkC manualLink">Grocery Stores</span>	
								</div>	
								<div class="poi">
										<img src="http://www.oakwood.com/images/propertyDetails/business.gif"/>&nbsp;							
										<span id="10" class="poiLinkC manualLink">Business Services</span>	
								</div>		
								<div style="overflow: hidden">								
								    	<span id="12" class="poiLinkLearnMore manualLink"><img src="http://images.oakwood.com/oakwood2/images/new/LearnMore.png" border="0"/></span>	
								</div>															
						</div>
					</div>
				</div>					
			</div>
			<div class="profileOverviewSection">
				<span class="subtitle">PROPERTY DETAILS	</span>		
				<div class="subtitleAlign" style="color: #666666;">

							<a name="propDetail"></a>
							<div>
                                <DIV><%=propertyOverview%></DIV>
							</div>	
							<br/>
				</div>
			</div>
			<div class="moreInfoText"
<DIV style="TEXT-ALIGN: center">Request more information on this or any of Oakwood's more than 23,000 residences.<BR></DIV>
						  	<a href="javascript:bookRequest('191', '1');">
						  		<img src="http://images.oakwood.com/oakwood2/images/new/more_information.png" style="margin-top: 10px" border="0" alt="More Information">
						  	</a>		

			</div>
					</div>	




<div id="tabs-2">



				  <div class="propertySummaryContainer" style="width:758px; height:897px;">


					<div class="photoGalleryContainer">
                    <img src="/etc/designs/oakwood/images/defaultImg.jpg" border="0" style="width:720px; height:477px;"/>
                      </div>                      </div>
				</div>





				</div>





			</div>		
        </div>	
	</div>

</div>


   </div>
</div>
</div>
<div class="footerContainer">
<div class="footerWrapper mainPageWidth">
<div class="footertext">
<div>
<a href="http://www.oakwood.com/cms/about-oakwood-1.html">About Oakwood</a> |  
  		<a href="http://www.oakwood.com/cms/site-map-1.html">Site Map</a> |
  		<a href="http://www.oakwood.com/cms/privacy-policy.html">Privacy Policy</a>  | 
  		<a href="http://www.oakwood.com/cms/terms-of-use.html">Terms of Use</a>  |
		<a href="http://www.surveymonkey.com/s/updateourwebsite">Feedback</a>
</div>
<div>
          &copy; 2004 - 2014 Oakwood Worldwide / The most trusted name in temporary housing. <SMALL><SUP>SM</SUP></SMALL>
</div>
<div style="padding-top: 5px; padding-bottom: 5px">
<img style="position: relative; top: 3px" src="http://images.oakwood.com/images/frontPage/icon-eho_logo.gif" height="15" border="0" alt="Equal Housing Opportunity"> Equal Housing Opportunity
	  </div>
</div>
</div>
</div>
<script type="text/javascript">
		$(document).ready(function() {
			showBookAptSearch();
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
</body>
</html>
<script type="text/javascript" src="/etc/designs/oakwood/resources/js/property_details.js"></script>
<script type="text/javascript">
	$(function() {
		$("#tabs").tabs({
			  cache: true,
		      spinner: 'Loading...'
		    });
	});
	</script>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-921744-14']);
  _gaq.push(['_trackPageview']);
		 $(".PDGroupReservation").click(function() {
			 _gaq.push(['_trackEvent', 'Property Profile Page', 'Group Reservation']);
		 });
		 $(".PDEmailThisPage").click(function() {
			 _gaq.push(['_trackEvent', 'Property Profile Page', 'Email this Page']);
		 });
		 $(".PDPdf").click(function() {
			 _gaq.push(['_trackEvent', 'Property Profile Page', 'Download PDF']);
		 });
 $("#clientLogin").click(function() {
	 _gaq.push(['_trackPageview', '/clientlogin/']);
 });

 $("#residentLogin").click(function() {
	 _gaq.push(['_trackPageview', '/residentlogin/']);
 });


 (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();
</script>

<!-- Google Tag Manager --> 
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-X798"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-X798');</script>
<!-- End Google Tag Manager -->
<!-- begin Marin Software Tracking Script -->
<script type='text/javascript'>
var _marinClientId = "7875pi14075";
var _marinProto = (("https:" == document.location.protocol) ? "https://" : "http://");
document.write(unescape("%3Cscript src='" + _marinProto + "tracker.marinsm.com/tracker/" +
_marinClientId + ".js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type='text/javascript'>
try {
_marinTrack.trackPage();
} catch(err) {}
</script>
<noscript>
<img src="https://tracker.marinsm.com/tp?act=1&cid=7875pi14075&script=no" >
</noscript>
<!-- end Copyright Marin Software -->
<script type="text/javascript"> 
var axel = Math.random() + "";
var a = axel * 10000000000000;
document.write('<iframe src="https://fls.doubleclick.net/activityi;src=3447646;type=count746;cat=globa822;u10=1;u1=US;u2=Washington;u3=Seattle;u4=;u5=true;u6=false;u7=02|19|2014;u8=03|20|2014;u9=1;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
</script>
<noscript>
<iframe src="https://fls.doubleclick.net/activityi;src=3447646;type=count746;cat=globa822;u10=1;u1=US;u2=Washington;u3=Seattle;u4=;u5=true;u6=false;u7=02|19|2014;u8=03|20|2014;u9=1;ord=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>
</noscript>



<%
	} 
        }else{
			out.println("Sorry, Information not available. Please use the name of the property as a selector in the URL");
        }
      }catch(Exception e){
	out.println(e.getMessage());
}
%>