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

--%>


<%@page session="false" pageEncoding="ISO-8859-1" contentType="text/html; charset=ISO-8859-1" %><%
%><%@page import="com.day.cq.wcm.api.WCMMode,org.apache.sling.api.request.RequestPathInfo,javax.jcr.*,java.util.*" %><%
%><%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %><%
%><cq:defineObjects/>
<%
%><%@include file="/libs/wcm/global.jsp"%><%
%><body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" class="home">
    <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>

<script type="text/javascript">
			var WRInitTime=(new Date()).getTime();
		</script>
<style>

    .footerContainer{
            background-color : #75a1aa;
    }

   .localSceneContainer ul li,.propertyDetailContainer ul li{background:none !important;
        list-style-image:none !important;
    }
</style>















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

<div>
<cq:include script="header.jsp"/>
</div>


<div class="middleContentContainer">
<div class="middleContentWrapper mainPageWidth">
<div id="messageBox"></div>
<div class="bodyNoNav">         	 
	

<link rel="stylesheet" href="http://www.oakwood.com/css/prettyPhoto/prettyPhoto-compressed.css" type="text/css" media="screen" charset="utf-8">
<script src="http://www.oakwood.com/js/prettyPhoto/jquery.prettyPhoto-compressed.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.3"> </script>		
<div class="propertyDetailsWrapper">
	<div id="MainContent" class="propertyDetailsHeader">
	<form id="bookRequestForm" name="bookRequestForm" action="/action/oakwood/lead/bookRequest" method="get">
		<input type="hidden" name="propertyId">
		<input type="hidden" name="requestType" value="1280">
		<input type="hidden" name="numOfBedrooms" value="1">
		<input type="hidden" name="numOfApartments" value="1">
		<input type="hidden" name="furnishType" value="Furnished">
		<input type="hidden" name="startDateString" value="02/22/2014">
		<input type="hidden" name="endDateString" value="03/23/2014">
		<input type="hidden" name="altLocationIndex" value="-1">
		<input type="hidden" name="groupForm" value="false">			
	</form>
	
	<script type="text/javascript">	 
		function bookRequest(propId, nbrRooms) {
	 		$("#bookRequestForm [name=propertyId]").val(propId);
	 		$("#bookRequestForm [name=numOfBedrooms]").val(nbrRooms);
	 		$("#bookRequestForm").submit();
		}	
	</script>	



    		<%
      String pName =  currentPage.getProperties().get("propertyName","");
	  String pAddr =  currentPage.getProperties().get("propertyAddress","");
      String pContact =  currentPage.getProperties().get("propertyNumber","");


      %>

  			<h1 style="margin-bottom: 5px;"><%=pName%></h1>

   		    <div class="propertyDetailsAddressSpacing">
				<%=pName%>&nbsp;|&nbsp;<%=pAddr%>&nbsp;|&nbsp;<%=pContact%>
			</div>
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
			    <a style="color: #FFF" href="https://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191.html?quantity=1&amp;bedrooms=1&amp;startDateString=02/22/2014&amp;endDateString=03/23/2014&amp;resultsPerPage=20&amp;miles=true&amp;poiSearch=false&amp;q="><b>Overview</b></a>
		      </div>
		    </div>
	  </div>
			<div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
				  <img src="http://www.oakwood.com/images/spacer.gif">
		 	    </div>
			    <div class="header">
				      <span class="galleryLinkC leftNavSpan"><b>Pictures</b></span>
		 	    </div>
	          </div>
	 	    </div>
		  		    <div class="leftnav_section">		  		    
	    			  <div class="leftnav_section_title">							
					       <div class="expander">
					        	   <img id="furnishingsLink" onclick="javascript:toggleLeftNavigation('furnishingsLink', 'furnishingstable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png">					        
					       </div>
					       <div class="header">
							  <a href="javascript:toggleLeftNavigation('furnishingsLink', 'furnishingstable');"><b>Furnishings</b></a>	
					 	   </div>				 	    
					  </div>
					  <div id="furnishingstable" class="leftnav_section_subsection" style="display:none">
								
								
									
									


										  
										  
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
		  	    	<span class="amenitiesLinkC leftNavSpan"><b>Amenities</b></span>	
		 	    </div>
	  		</div>
	 	</div>
	    <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
					<img id="schoolLink" onclick="javascript:toggleLeftNavigation('schoolLink', 'schooltable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png">					         	         
		 		</div>
		 		<div class="header">
							 <a href="javascript:toggleLeftNavigation('schoolLink', 'schooltable')"><b>School Info</b></a>				 	   
				</div>	
			</div> 
		  	    <div id="schooltable" class="leftnav_section_subsection" style="display:none">
					 
													
					
					  		
					






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
								<span id="17" class="schoolsLinkC leftNavSpan">Colleges &amp; Universities</span>							
							</div>





		 	    </div>

	 	</div>

	    <div class="leftnav_section">	

	    			<div class="leftnav_section_title">		
					       <div class="expander">



					        	   <img id="placesLink" onclick="javascript:toggleLeftNavigation('placesLink', 'placestable')" src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png">					         	


					       </div>
					       <div class="header">
							 <a href="javascript:toggleLeftNavigation('placesLink', 'placestable')"><b>Neighborhood Info</b></a>				 	   
						   </div>				 	    
					</div>	    


				    <div id="placestable" class="leftnav_section_subsection" style="display:none">



						
						
						
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
					<span class="policiesLinkC leftNavSpan"><b>Rental Guidelines</b></span>
			    </div>
	  		  </div>
	  </div>		

	  
	  <div class="leftnav_section">
			<div class="leftnav_section_title">		
		 	    <div class="expander">
			      <img src="http://www.oakwood.com/images/spacer.gif">
		 		</div>
		  	    <div class="header">
		     		<span class="petsInfoLinkC leftNavSpan"><b>Pet Policy</b></span>
			    </div>
	  		  </div>
	  </div>
	  

    </div>
    
  </div>
  
  <script type="text/javascript">
 
  	function loadPOILink(poiId, currentPlaceName) {
		var currentPlaceType='currentPlaceType='+poiId;
		var poiL='/furnished-apartments/furnished/US/WA/Seattle/prop191/goToPOI' + '.html?' + currentPlaceType + '&poiSearch=false&poiTypeString=&currentPlaceTypeName=' + escape(currentPlaceName) + '&quantity=1&bedrooms=1&startDateString=02/22/2014&endDateString=03/23/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
		document.location.href=poiL;	
  	}
  	
  	function addTailingUrl(){
  		return '.html?quantity=1&bedrooms=1&startDateString=02/22/2014&endDateString=03/23/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
  	}
  	
	$(document).ready(function(){

		//deter crawlers
		$(".furnishingsLinkC").click(function() {			
			var packageIndex='packageIndex='+$(this).attr("id");
			var furnishingsL='/furnished-apartments/furnished/US/WA/Seattle/prop191/showAptFurnishings' + '.html?' + packageIndex + '&quantity=1&bedrooms=1&startDateString=02/22/2014&endDateString=03/23/2014&resultsPerPage=20&miles=true&poiSearch=false&q=#propDetailLower';
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
			<div id="tabs" class="ui-tabs ui-widget ui-widget-content ui-corner-all">
				<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
					<li id="leftli" class="ui-state-default ui-corner-top ui-state-active ui-tabs-active" role="tab" tabindex="0" aria-controls="tabs-1" aria-labelledby="ui-id-2" aria-selected="true"><a href="#tabs-1" style="text-decoration: none" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="leftTab">Overview</a></li>

					<li id="rightli" class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="ui-tabs-1" aria-labelledby="ui-id-3" aria-selected="false"><a href="#tabs-2" style="text-decoration: none" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="rightTab"><span>Map &amp; Directions</span> </a></li>
 
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
				<div id="tabs-1" aria-labelledby="ui-id-2" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" aria-expanded="true" aria-hidden="false">
					 
				 















				
				<div class="iconRight">
					
			  	  
						
						  	<img src="https://www.oakwood.com/images/propertyDetails/get_more_info.gif" alt="Request Group Reservation" border="0">							
						  	<a class="PDGroupReservation" href="https://www.oakwood.com/reserve/furnished/groupreserve?propertyId=191&amp;groupForm=true">
						  	Request Group Reservation	
							</a>
						
				  
								  
				  <span style="margin-left: 15px"> 
				  <img src="https://www.oakwood.com/images/propertyDetails/email.gif" alt="Email This Page" border="0">
				  </span>
				  <a class="PDEmailThisPage" href="https://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191/emailThisPage.html?iframe=true&amp;width=600&amp;height=550&amp;quantity=1&amp;bedrooms=1&amp;startDateString=02/22/2014&amp;endDateString=03/23/2014&amp;resultsPerPage=20&amp;miles=true&amp;poiSearch=false&amp;q=#propDetailLower" rel="prettyPhoto">
						Email This Page		</a>	

				  
				  <span style="margin-left: 15px"> 
					<img src="https://www.oakwood.com/images/propertyDetails/pdf.jpg" alt="Save as PDF" border="0">
				  </span>
				  <span id="PDFGenerator" class="PDPdf manualLink">
					Save as PDF	 
				  </span>
												
				</div>
				
				
				<div class="propertySummary">
				

				  <div class="propertySummaryContainer">
					
					
                      <cq:include path="photoContainer" resourceType="oakwood/components/imageComponent"/>
					
					
					
					<div class="summaryContainer">
		
						<div class="propertyName">
						  <font class="propertyNameLarge">						
						  
								<%=pName%>
							 
						  </font>			
						</div>
						
						
						<p>


								  
								    
								  									  
											

<cq:include path="propertyBriefIntro" resourceType="foundation/components/parsys"/>
																			
										
									
								  
								  

						
						<a href="https://www.oakwood.com/furnished-apartments/furnished/US/WA/Seattle/prop191.html?quantity=1&amp;bedrooms=1&amp;startDateString=02/22/2014&amp;endDateString=03/23/2014&amp;resultsPerPage=20&amp;miles=true&amp;poiSearch=false&amp;q=#propDetail"><span class="disptextredunderline">More			</span></a>	
						</p>
					
						
						
						

			  		    
			  		      <div><strong>APARTMENT AMENITIES	</strong></div>
                        	<cq:include path="apartmentAmenitiesParsys" resourceType="foundation/components/parsys"/>
						  <div style="text-align: right">
						  	<span class="amenitiesLinkC manualLink">More</span>	
						  </div>
					</div>
				 </div>
				 <div class="bookNowContainer">
				  		<div class="pricesPanel">
<table border="0" cellpadding="0" cellspacing="0" width="100%">

	<tbody><tr>
		<td colspan="4">


				<span><strong>DAILY RATES</strong></span>



		</td>
	</tr>
	<tr>
		<td colspan="4">
		<hr class="hr">
		</td>
	</tr>







			<tr>
				<!-- room type -->
				<td><span>Studio</span></td>


						<td>




								<span>


									
										Call for pricing
									
								 
								</span>
							

							
						
						</td>

						<td>
						
							<span>
							
								
								
									Not Available
								
							
							</span>
						
						</td>

						<td align="right">
			   			  						
						  
						
						  
						
						  
							<a href="javascript:bookRequest('191', '0');">				
								Request
							</a>
						  
						
						  
						
						</td>


			</tr>
			<tr>
				<td colspan="4">
				<hr class="hr">
				</td>
			</tr>
			
		
			
			<tr>
				<!-- room type -->
				<td><span>1 Bedroom</span></td>


						<td>
						
						
							
							
								<span>
								 
									
									
										Call for pricing
									
								 
								</span>
							

							
						
						</td>

						<td>
						
							<span>
							
								
								
									Not Available
								
							
							</span>
						
						</td>

						<td align="right">
			   			  						
						  
						
						  
						
						  
							<a href="javascript:bookRequest('191', '1');">				
								Request
							</a>
						  
						
						  
						
						</td>


			</tr>
			<tr>
				<td colspan="4">
				<hr class="hr">
				</td>
			</tr>
			
		
			
			<tr>
				<!-- room type -->
				<td><span>2 Bedroom</span></td>
				<td><span>Call for pricing</span></td>
				<td><span>Not Available</span></td>
				<td align="right"><a href="javascript:bookRequest('191', '2');">Request</a></td>
			</tr>
			<tr>
				<td colspan="4">
				<hr class="hr">
				</td>
			</tr>
</tbody></table>
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
				 	<span></span>
				</div>
			</div>	

  <!-- BEGIN FOR CREATING PDF -->  
<form method="POST" name="myForm" action="/action/oakwood/property/pdf">

	<input type="HIDDEN" name="photo" value="https://portal.oakwood.com/profiles/images/0914/946/Photos/914g431a.jpg">		
	<input type="HIDDEN" name="propertyId" value="191">
	<input type="HIDDEN" name="phone" value="877.902.0832">
</form> 
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
                            <cq:include path="communityAmenitiesContainer" resourceType="foundation/components/parsys" />
						</div>				
			<div class="profileOverviewSection">
				<span class="subtitle">LOCAL SCENE</span>				
				<div class="subtitleAlign">
					<div class="localSceneContainer">
							<div class="left">					
								<div>

                                    <cq:include path="localSceneContainer" resourceType="foundation/components/parsys"/>
								</div>						
							</div>
						<div class="right">
			
								<div class="poi">								
										<img src="https://www.oakwood.com/images/propertyDetails/restuarants.gif">&nbsp;	
										<span id="1" class="poiLinkC manualLink">Restaurants</span>														
								</div>													
								<div class="poi">
										<img src="https://www.oakwood.com/images/propertyDetails/shopping.gif">&nbsp;
										<span id="3" class="poiLinkC manualLink">Shopping</span>																								
								</div>	
								<div class="poi">							
										<img src="https://www.oakwood.com/images/propertyDetails/grocery_stores.gif">&nbsp;
										<span id="4" class="poiLinkC manualLink">Grocery Stores</span>	
								</div>	
								<div class="poi">
										<img src="https://www.oakwood.com/images/propertyDetails/business.gif">&nbsp;							
										<span id="10" class="poiLinkC manualLink">Business Services</span>	
								</div>		
								
								<div style="overflow: hidden">								
								    	<span id="12" class="poiLinkLearnMore manualLink"><img src="http://images.oakwood.com/oakwood2/images/new/LearnMore.png" border="0"></span>	
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
								<div>
									<cq:include path="propertyDetailContainer" resourceType="foundation/components/parsys"/>
								</div>
							</div>	
							<br>
				</div>
			</div>
			<div class="moreInfoText">
<div style="TEXT-ALIGN: center">Request more information on this or any of Oakwood's more than 23,000 residences.<br></div>
										  
						  	<a href="javascript:bookRequest('191', '1');">
						  		<img src="http://images.oakwood.com/oakwood2/images/new/more_information.png" style="margin-top: 10px" border="0" alt="More Information">
						  	</a>		
										
			</div>


						 
					</div>				
				</div><div id="ui-tabs-1" class="ui-tabs-panel ui-widget-content ui-corner-bottom" aria-live="polite" aria-labelledby="ui-id-3" role="tabpanel" aria-expanded="false" aria-hidden="true" style="display: none;">Hello</div>

                <div id="tabs-2" style="display:none;">
                    <br/>
                    <div align="center"><image src="/etc/designs/oakwood/images/map.png"/></div>
                    <br/>
                    <div style="padding-left:15px;">Property Address : <%=pAddr%></div>
                    <br/>
				</div>	
			</div>		
        </div>	
	</div>
</div>
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