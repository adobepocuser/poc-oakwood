<%--

  Oakwood Search component.

--%>

<%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %>
<%
		
			String requestHidLat = request.getParameter("hidLat");
			String requestHidLong = request.getParameter("hidLong");
			String locationSuggestion = request.getParameter("locationSuggestion"); 
			locationSuggestion = locationSuggestion == null ? "" : locationSuggestion;
			String furnished = request.getParameter("furnished");
			String amenities = request.getParameter("amenities");
			amenities = amenities == null ? "" : amenities;
			String furnished1 = "";
			String furnished2 = "";
			if (("false").equals(furnished)) {
				furnished2 = "checked=\"checked\"";
			} else {
				furnished1 = "checked=\"checked\"";
			}
			String[] furnishedCheck = new String[] { furnished1, furnished2 };
			String bedrooms = request.getParameter("roomType");
			String bedroomType1 = "";
			String bedroomType2 = "";
			String bedroomType3 = "";
			if (("studio").equals(bedrooms)) {
				bedroomType1 = "selected=\"selected\"";
			} else if (("onebedroom").equals(bedrooms)) {
				bedroomType2 = "selected=\"selected\"";
			} else if (("twobedroom").equals(bedrooms)) {
				bedroomType3 = "selected=\"selected\"";
			}else{
				bedroomType1 = "selected=\"selected\"";
			}
			String[] bedroomSelect = new String[] { bedroomType1, bedroomType2,bedroomType3 };
%>


        <div id="bookAptSearch">
			<span id="bookAptNavButton"><img title="Click to Open/Close Apartment Search" src="<%=designer.getDesignPath(currentPage)%>/resources/images.oakwood.com/images/frontPage/btn_apartmentSearch.png"></span>
		    <div id="bookAptSearchPanel">
				
			<div id="advancedSearchPanel">

		<form id="propertySearchForm" action="/content/oakwood/en/searchResults.html" method="get">

    			<input id="hidLat" name="hidLat" type="hidden" value="<%=requestHidLat%>">
		        <input id="hidLong" name="hidLong" type="hidden" value="<%=requestHidLong%>"> 

				<div class="searchboxWrapper">
	
					<div class="tb"><div class="bb"><div class="lb"><div class="rb">
					<div class="rbl"><div class="rbr"><div class="rtl"><div class="rtr">  

	<div id="MainContent" class="searchbox" style="font-size: 12px">   			   			 			
		  	 
	  	  <div id="searchFields">	
			  
			  
			  <div id="locationInput" class="row" style="margin-bottom: 10px">
			  		<span style="color:red">*</span>											
					<input id="Postcode" name="locationSuggestion" class="inputfield" style="width:200px;" type="text" value="<%=locationSuggestion%>"/>						
			  </div>
				

			  		  						
			<span style="color:red;float:left">*</span>
			<div id="furnishedBox" class="row" style="margin-bottom: 10px">
					<input id="furnishedTrue" name="furnished" type="radio" value="true" <%=furnishedCheck[0]%>/>			
					<span><label for="furnishedTrue">Furnished</label></span>
					<input id="furnishedFalse" name="furnished" type="radio" value="false" <%=furnishedCheck[1]%>/>
					<span><label for="furnishedFalse">Unfurnished</label></span>
			</div>

			  
			  
			 	
			  
			    <div class="row">
			  
			  	  <div><b>Search Within:</b></div>
				
			      <div>
			  	    <select id="radius"  class="inputfield" style="width: 60px;">
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
	   			    
	   			    <input id="distanceMiles" type="radio" value="1" checked="checked"/>
	   			    <span><label for="distanceMiles">Miles</label></span>
	   			    
	   			    <input id="distanceKilometers" type="radio" value="2"/>
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
						<input id="startDatePicker" class="inputfield" style="width:90px;" onchange="setDefaultEndDate();" readonly="readonly" type="text" value="02/15/2014"/>
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
						<input id="endDatePicker" class="inputfield" style="width:90px;" readonly="readonly" type="text" value="03/16/2014"/>
					</div>
				</div>
				
				
			 </div>			
			 
			 
			
			
			  <div class="row">
			 	<div><b>Room Type:</b></div>
				  	<div>
				  		<span style="color:red">*</span>
						<select id="bedrooms" name="roomType"
							class="inputfield" style="width: 100px">&gt;
							<option value="studio"
								<%=bedroomSelect[0]%>>Studio</option>
							<option value="onebedroom"
								<%=bedroomSelect[1]%>>1 Bedroom</option>
							<option value="twobedroom"
								<%=bedroomSelect[2]%>>2 Bedroom</option>
						</select>
					</div>
			  </div>
			  <div class="row">
			    <div style="float:left;width:110px;">
					<div><b>Number of Apts:</b></div>
							
					<input id="quantity" class="inputfield" style="width: 30px;" type="text" value="1" maxlength="2"/>
				 
				</div>
		   	   											
			  	<div style="margin-bottom:5px">
			    	<div><b>Pet Friendly:</b>	</div>
					<div><input id="petFriendly1" type="checkbox" value="true"/><input type="hidden" value="on"/></div>				
			  	</div>
			  </div>	
			   
			  <div class="row" >
				<b>Amenities:</b>
				<div>
					<span style="color:red">*</span>
					<input id="promoCode" name="amenities" class="inputfield" style="width: 100px;" type="text" value="<%=amenities%>" maxlength="30"/>
				</div>
			  </div>		  
			
			
			<div class="row" style="margin-top: 5px; overflow: hidden;">
				<input id="searchButton" type="image" src="<%=designer.getDesignPath(currentPage)%>/resources/images.oakwood.com/images/frontPage/SearchNow_btn.png" alt="Search">
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
	
	
	var inputSuggestion='Please enter a city or zip';
		
	var currentLocationSuggestion= $.trim($("#locationSuggestion").val());

	if (currentLocationSuggestion=='') {
		$("#locationSuggestion").val(inputSuggestion);
	}

	$("#locationSuggestion").click(function() {
		currentLocationSuggestion= $.trim($("#locationSuggestion").val());
		if (currentLocationSuggestion==inputSuggestion) {
			$("#locationSuggestion").val('');
		}
});


	
</script>

  
<script type="text/javascript" src="<%=designer.getDesignPath(currentPage)%>/resources/js/searchScript.js"></script>


	
				
 
</div>
	
			</div>
</div>  