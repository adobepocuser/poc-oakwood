<%--

  Search result component.

--%><%
%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
%>

<%@page import="com.oakwood.searchpage.controller.OakwoodSearchController"%>
<%@page import="com.oakwood.searchpage.entity.SearchEntityBean"%>
<%@page import="java.util.*"%>

<jsp:useBean id="oakwoodSearchController" class="com.oakwood.searchpage.controller.OakwoodSearchController">
    <jsp:setProperty name="oakwoodSearchController" property="request" value="<%= request %>" />
	<jsp:setProperty name="oakwoodSearchController" property="page" value="<%= currentPage %>" />
</jsp:useBean>
<%
	List<SearchEntityBean> resultList = oakwoodSearchController.getSearchData();
	String jsonStr = oakwoodSearchController.getJsonData(resultList);
%>
<c:set var="searchResult" value="<%= resultList %>"/>



<script type="text/javascript">
 
function makeProForPopup(id,title,url,img,discriptionTitle) {
    var resultStr = "<div class='ero-shadow'><div class='ero-body'><div class='ero-actionsBackground'><div class='ero-previewArea'><div class='firstChild'><p></p><div class='VE_Pushpin_Popup_Title'><div class='mapInfo' style='font-weight: bolder'><h2>"+id+". "+title+"</h2></div></div><div class='VE_Pushpin_Popup_Body'><div class='mapInfo'><a href='"+url+"'><img src='"+img+"'class='propImage'></a><br>"+discriptionTitle+"<br><div class='moreInfoLinks'><a href='"+url+"'>MoreInfo</a> | <a href='"+url+"'>MorePhotos</a> | <a href='"+url+"'>Amenities</a></div></div></div><p></p></div></div><div class='ero-actions'><ul></ul></div><div class='ero-paddingHack'></div></div></div></div>";
        return resultStr;
}

 //         Oakwood Upper West Side New York
  
var PostCodeid = "#Postcode";
var longval = "#hidLong";
var latval = "#hidLat";
var geocoder;
var map;
var marker;
var beaches = [];
 
function initialize() {
    //MAP
    var initialLat = $(latval).val();
    var initialLong = $(longval).val();
    if (initialLat == '' || initialLat == null || initialLong == '' || initialLong == null) {
        initialLat = "40.711614";
        initialLong = "-74.009457";
    }
    var latlng = new google.maps.LatLng(initialLat, initialLong);
    var options = {
        zoom: 12,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("geomap"), options);

    geocoder = new google.maps.Geocoder();    

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: latlng
    });

    google.maps.event.addListener(marker, "dragend", function (event) {
        var point = marker.getPosition();
        map.panTo(point);
    });
    
    
    getListData();
    setMarkers(map, beaches);
};
        

function setMarkers(map, locations) {
  var image = new google.maps.MarkerImage('/etc/designs/oakwood/resources/images.oakwood.com/oakwood2/images/virtualEarth/pin_green.gif',
      new google.maps.Size(30, 32),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 32));
  var shadow = new google.maps.MarkerImage('/etc/designs/oakwood/resources/images.oakwood.com/oakwood2/images/virtualEarth/pin_gray.gif',
      new google.maps.Size(30, 32),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 32));
  var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
  
  var marker = [];
  infowindow = new google.maps.InfoWindow({
            });

  for (var i = 0; i < locations.length; i++) {
    var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
    var setImg = locations[i][3]=='true'?shadow:image;
    marker[i] = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shadow: shadow,
        icon: setImg,
        shape: shape,
        title: locations[i][5],
        zIndex: locations[i][4]
    });

    google.maps.event.addListener(marker[i], 'mouseover', (function(marker, i) {
        return function(){
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);

        }
    })(marker[i], i));
    
    google.maps.event.addListener(marker[i], 'mouseout', function() {
        setTimeout(function () { infowindow.close(map, marker[i]) }, 8000);
    }); 
  }
}
        
$(document).ready(function () {
   
       initialize();
   
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

function getListData() {
     var jsonData = <%=jsonStr%>;
     if(jsonData.length!=0){
	     var dataobj = eval(jsonData);
	        $.each(dataobj, function (i, item) {
				var eachArr = [];
	            eachArr.push(makeProForPopup(i+1,item.title,item.url,item.img,item.discriptionTitle), item.latitude, item.longitude, item.book,i+1,item.title);
	            beaches.push(eachArr);
	        });
	}
}
</script>



<div class="right">      
 	 	
 
				 
<!--[if IE 7]>
<style type="text/css">
/** fix IE 7 apartment search gap **/
.searchboxWrapper {
	position: relative;
	top: -23px;
}
</style>
<![endif]-->

<style type="text/css">
/** overrided for search results page **/
#messageBox {
	width: 100%;
}
</style>


	 

	    
	<form id="bookRequestForm" name="bookRequestForm" action="/action/oakwood/lead/bookRequest" method="get">
		<input type="hidden" name="propertyId">
		<input type="hidden" name="numOfBedrooms" value="1">
		<input type="hidden" name="numOfApartments" value="1">
		<input type="hidden" name="furnishType" value="Furnished">
		<input type="hidden" name="altLocationIndex" value="-1">
	</form>
	
	<script type="text/javascript">	 
		function bookRequest(propId, nbrRooms) {
	 		$("#bookRequestForm [name=propertyId]").val(propId);
	 		$("#bookRequestForm [name=numOfBedrooms]").val(nbrRooms);
	 		$("#bookRequestForm").submit();
		}	
	</script>	
	

	<div id="MainContent">
				  	
		<div>
		
			<div class="searchArea">
				<h1 class="h1"><strong>Oakwood Upper West Side New York Demo</strong></h1>
					
			</div>
		  
		  	<div class="searchAreaPaddingTop">
		  					  	     
				Oakwood in 
				<b>
					Oakwood Upper West Side New York,
				</b>
			  	offering furnished and serviced apartments for corporate housing and extended stay rentals.
				
	     	</div>
			
			<div class="dispDisclaimerLeft">  	
		  		 <br>		
	 		</div>				  	

	  	</div>	
	  	
		<!-- Map -->
		<div id="geomap" style="position: relative; margin-top: 10px; width: 99.8%; height: 330px; border: 1px solid rgb(222, 215, 194); z-index: 0; overflow: hidden; background-image: none; background-color: rgb(233, 231, 212); cursor: move;" class="MSVE_MapContainer">
	           <p>Loading Please Wait...</p>
	    </div>
			<div style="margin: 5px 0px 20px 0px; width: 100%">
				<img src="http://images.oakwood.com/oakwood2/images/virtualEarth/pin_green.gif" height="15px">&nbsp;Ready for Immediate Booking&nbsp;&nbsp;
				<img src="http://images.oakwood.com/oakwood2/images/virtualEarth/pin_gray.gif" height="15px">&nbsp;Other Matching Properties&nbsp;
			</div>
	  		 
								
			<div class="searchResultSortContainer">				
				<span style="float: left">		  	
							
										
						 				<span style="font-weight: bold">
						 					Sort by				  	
								  		</span>
								  		<span>
								  		<select id="sort" name="sort" class="inputfield" onchange="javascript:sortSel(this.value)">
																					
												<option value="avl" selected="selected">Default</option>
																					
												<option value="plh">Lowest Price</option>
																					
												<option value="phl">Highest Price</option>
																					
												<option value="dcf">Closest</option>
																					
												<option value="dfc">Furthest</option>
											
										</select>
							          	</span>
							
				</span>
				<span class="paging">		
								
						<span>
							<b>Results Per Page </b>
							<select id="resultsPerPage" name="resultsPerPage" class="inputfield" onchange="javascript:resultsPerPageSel(this.value)">						
								<option value="3">3</option>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="20" selected="selected">20</option>
							</select>							
						</span>

								
						<span style="margin-left: 20px">
								
													  
							
							
							<b>Page</b>&nbsp;
			
							<select id="currentPage" name="currentPage" class="inputfield" onchange="javascript:currentPageSel(this.value)">	
																		
										<option value="1" selected="selected">1</option>
																		
										<option value="2">2</option>
																		
										<option value="3">3</option>
																		
										<option value="4">4</option>
								
							</select>
							
							&nbsp;<b>of 4</b>
			
							
								&nbsp;|		
								<a href="/furnished-apartments/US/WA/Seattle2.html?resultsPerPage=20&amp;sort=avl&amp;radius=25&amp;furnished=true&amp;bedrooms=1&amp;petFriendly=false&amp;startDateString=02/18/2014&amp;endDateString=03/19/2014&amp;quantity=1&amp;distanceType=1&amp;altLocationIndex=-1">
									<img src="http://images.oakwood.com/oakwood2/images/new/right-arrow_teal.png" alt="" width="11" height="10" border="0">
				  				</a>		  				
							
						    
												
					  	</span>
					  	
					  	
				</span>
			</div>
		
		

	
			
				 
				 
								
				
		<c:forEach var="productList" items="${searchResult}" varStatus="indexLoop">
	 		<div class="searchResultMarginBottom">
					
	   		<div class="searchResultPropertyContainer" style="border: 1px solid #b8a4a4"> 
			  	  
			  	  
			  	  <div class="propertyTitleHeaderContainer <c:choose><c:when test="${productList.book == 'true'}">grayBox</c:when><c:otherwise>greenBox</c:otherwise></c:choose>">			  	
					<div class="propertyTitleHeaderLeft">									
							${indexLoop.index+1}.&nbsp;
							<span id="propertyHeader191" class="searchResultPropertyHeaderLink" onclick="javascript: window.location.href='${productList.productUrl}';">
							${productList.title}</span>					    	
					    	<span>				    				    		
						  	  		&nbsp;:&nbsp;&nbsp;${indexLoop.index+4}.76&nbsp;
						  	  				Miles
						  	</span>								  	    					    	
					</div>				    
					  <div class="propertyTitleHeaderRight">				
					  			<span class="searchResultPropertyHeaderLink" onclick="javascript: window.location.href='${productList.productUrl}';">				  	
										<c:choose>
											<c:when test="${productList.book == 'true'}">Call for pricing and availability</c:when>
											<c:otherwise>One bedroom starting at $${productList.price} Per Day</c:otherwise>
										</c:choose> 	
								</span>							
			  	  	  	</div>		
			   		 </div>
		    
		    
				    <div class="searchResultPropertyInfoContainer" style="background: url(http://images.oakwood.com/oakwood2/images/new/border-pixel-gray.gif) repeat-y 76% 0px;">
				  
				  		<div class="searchResultPropertyInfoContainerFloatLeft">
				  				<a href="javascript: window.location.href='${productList.productUrl}';">		
									  		<img src="${productList.img}?width=165&amp;height=124" width="165px" height="124px" alt="1221 First Avenue" border="0">
								</a>
				  		</div>		  		
					  	<div class="searchResultPropertyInfoContainerFloatMiddle">		  			
									<div class="propertyDescription" style="font-weight: bolder">
										${productList.title}							
										<br>${productList.state},
												${productList.city}
										&nbsp;
										${productList.postcode}
										
										<div>
													${productList.phoneNum}
																</div>								
									</div>	
									<div  style="font-weight: bolder;float:left">Price: &nbsp;</div>
                            		<div style="font-weight: bolder; color:#0099FF;margin-left">${productList.price}</div>						
									<div class="propertyDescription" style="margin-top: 10px">
									${productList.discription}
									</div>														
									<div style="margin-top: 10px;">							
						    			<a class="SRMoreInfo" href="javascript: window.location.href='${productList.productUrl}';">
						    			More Info</a>						    						 		 	
							 		 	<img src="http://images.oakwood.com/oakwood2/images/new/rightArrow.png" border="0" alt="More Info" style="margin-right: 5px">					 		 	
							 		 		<span id="${productList.productUrl}" class="propertyLinkC SRMorePhotos manualLink">More Photos</span>																		 		 	
							 		 	<img src="http://images.oakwood.com/oakwood2/images/new/rightArrow.png" border="0" alt="More Photos" style="margin-right: 5px">
							 		 		<span id="${productList.productUrl}" class="propertyLinkC SRAmenities manualLink">Amenities</span>
								 		 	<img src="http://images.oakwood.com/oakwood2/images/new/rightArrow.png" border="0" alt="Amenities">
								  	</div>
				  		</div>		  				
						<div class="searchResultPropertyInfoContainerButtom">					  			
												<div>
													<span onclick="javascript:bookRequest('191', '1');" style="padding-left:3px; padding-right:0px; cursor: pointer">
														<img src="http://images.oakwood.com/oakwood2/images/new/RequestNow.png" border="0" alt="Request Now">
													</span>
												</div>																
									<br>
									<span id="pricesImage191" onclick="javascript:showPrices('191', '/furnished-apartments/furnished/US/WA/Seattle/prop191/prices.html');" class="searchResultPricesButton">
										<img src="http://images.oakwood.com/oakwood2/images/new/Prices.png" border="0" alt="prices" title="click to show/close prices panel">
									</span>				  		
				  		</div>
				  		
				    </div>

	  </div>
	  
	 
	  <div id="pricesPanel191" class="searchResultPricePanel" style="border: 1px solid #b8a4a4; 	border-top: none;">
	        <div style="float: right; clear: both; padding: 5px">	        
	  		  	<a href="javascript:closePrices('191')"><img src="http://images.oakwood.com/oakwood2/images/new/close.gif" border="0" alt="close"></a>
			</div>
			<div id="pricesPanelLoad191" style="margin-left: 15px"></div>			
	  </div>	 
	    
	</div>
	</c:forEach>
	
		
				
			
	 
	
	

	
							
			<div class="searchResultSortContainer">				
				<span style="float: left">		  	
							
										
						 				<span style="font-weight: bold">
						 					Sort by				  	
								  		</span>
								  		<span>
								  		<select id="sort" name="sort" class="inputfield" onchange="javascript:sortSel(this.value)">
																					
												<option value="avl" selected="selected">Default</option>
																					
												<option value="plh">Lowest Price</option>
																					
												<option value="phl">Highest Price</option>
																					
												<option value="dcf">Closest</option>
																					
												<option value="dfc">Furthest</option>
											
										</select>
							          	</span>
							
				</span>
				<span class="paging">		
								
						<span>
							<b>Results Per Page </b>
							<select id="resultsPerPage" name="resultsPerPage" class="inputfield" onchange="javascript:resultsPerPageSel(this.value)">						
								<option value="3">3</option>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="20" selected="selected">20</option>
							</select>							
						</span>

								
						<span style="margin-left: 20px">
								
													  
							
							
							<b>Page</b>&nbsp;
			
							<select id="currentPage" name="currentPage" class="inputfield" onchange="javascript:currentPageSel(this.value)">	
																		
										<option value="1" selected="selected">1</option>
																		
										<option value="2">2</option>
																		
										<option value="3">3</option>
																		
										<option value="4">4</option>
								
							</select>
							
							&nbsp;<b>of 4</b>
			
							
								&nbsp;|		
								<a href="/furnished-apartments/US/WA/Seattle2.html?resultsPerPage=20&amp;sort=avl&amp;radius=25&amp;furnished=true&amp;bedrooms=1&amp;petFriendly=false&amp;startDateString=02/18/2014&amp;endDateString=03/19/2014&amp;quantity=1&amp;distanceType=1&amp;altLocationIndex=-1">
									<img src="http://images.oakwood.com/oakwood2/images/new/right-arrow_teal.png" alt="" width="11" height="10" border="0">
				  				</a>		  				
							
						    
												
					  	</span>
					  	
					  	
				</span>
			</div>
	
		
		<div class="searchResultBottom">
			&nbsp;* Prices are subject to change based on dates and availability.<br>
			** Prices are based on length of stay.&nbsp;&nbsp;Check property details for specifics.
		</div>
		
	</div>
	
	
	

	<script type="text/javascript">	 

					
	function currentPageSel(page) {
		paginate("avl","20", page);
	}
	function sortSel(sort) {
		paginate(sort,"20", 1);
	}
	function resultsPerPageSel(rpp) {
		paginate("avl",rpp, "1");
	}
	function paginate(sort, resultsPerPage, page) {
		
		var paginatePage="/furnished-apartments/US/WA/Seattle";
									  
		window.location.href=paginatePage + page + ".html?resultsPerPage="+resultsPerPage+"&sort="+sort+"&radius=25&furnished=true&bedrooms=1&petFriendly=false&startDateString=02/18/2014&endDateString=03/19/2014&quantity=1&distanceType=1&altLocationIndex=-1";		
		
	}
	function showPrices(propId,url) {	
		if ($('#pricesPanel'+propId).css('display')=='none') {
	 		$('#pricesImage'+propId).css('cursor','wait');
	 		
			 url=url+ '?furnished=true&startDateString=02/18/2014&endDateString=03/19/2014&bedrooms=1&quantity=1&random=1392619512594';
	 		$('#pricesPanelLoad'+propId).load(url, function() {
	 			$('#pricesPanel'+propId).slideDown(100, function(){});	
			 	$('#pricesImage'+propId).css('cursor','pointer');
	 		});
		} else {
			closePrices(propId);
		}
	}

	function closePrices(propId) {
	 	$('#pricesPanel'+propId).slideUp(100, function() {});
	}	
  	
	function addTailingUrl(){
  		return '.html?resultsPerPage=20&sort=avl&radius=25&furnished=true&bedrooms=1&petFriendly=false&startDateString=02/18/2014&endDateString=03/19/2014&quantity=1&distanceType=1&altLocationIndex=-1#propDetailLower';
  	}

	$(document).ready(function(){
		$(".propertyLinkC").click(function() {			
			var propUrl=$(this).attr("id")+addTailingUrl();
			document.location.href=propUrl;
		});	
	});
	</script>	
	


 	 </div>