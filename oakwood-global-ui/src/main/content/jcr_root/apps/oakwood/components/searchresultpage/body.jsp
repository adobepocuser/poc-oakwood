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
%><%@include file="/apps/oakwood/components/content/global/global.jsp" %><%
%><body marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" class="home">
    <cq:include path="clientcontext" resourceType="cq/personalization/components/clientcontext"/>

<script type="text/javascript">
			var WRInitTime=(new Date()).getTime();
		</script>

<style>

    #bookAptSearch{
        left:15%;
        top:110px;
    }
    .searchResultWrapper .right{
                padding-left:250px;
            }

</style>


<cq:include script="header.jsp"/>


<div class="middleContentContainer">
<div class="middleContentWrapper mainPageWidth">

<div class="searchResultWrapper">
<div class="left">


 
<% 
	IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);
%>				 
<cq:include path="search" resourceType="oakwood/components/oakwoodSearch"/>


     </div>
<% 
	IncludeOptions.getOptions(request, true).setDecorationTagName(StringUtils.EMPTY);
%>
<cq:include path="searchResultList" resourceType="oakwood/components/searchresult"/>
</div>


        </div></div>

<cq:include script="footer.jsp"/>














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