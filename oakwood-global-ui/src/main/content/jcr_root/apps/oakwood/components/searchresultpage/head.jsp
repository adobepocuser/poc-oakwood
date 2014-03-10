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

  Default head script.

  Draws the HTML head with some default content:
  - initialization of the WCM
  - includes the current design CSS
  - sets the HTML title

  ==============================================================================

--%><%@page session="false" pageEncoding="ISO-8859-1" %><%
%><%@include file="/libs/wcm/global.jsp" %><%
%><head>
    <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
    <meta http-equiv="keywords" content="<%= WCMUtils.getKeywords(currentPage) %>">
    
    <cq:include script="/libs/wcm/core/components/init/init.jsp"/>
    
    <cq:includeClientLib categories="apps.geometrixx-main"/>
    <%
    currentDesign.writeCssIncludes(pageContext); 
    %>
    
    <title><%= currentPage.getTitle() == null ? currentPage.getName() : currentPage.getTitle() %></title>
    
    


<meta name="description" content="Oakwood is the most trusted name in temporary housing, furnished apartments, corporate apartments, executive apartments, luxury apartments, temporary apartments and serviced apartments. Whether you are looking for short term housing or extended stay, for vacation or business travel, Oakwood has the housing solution you are looking for.">

<meta content="0y-8Rjl6OhbDEPHH-GJyduucYDRGTlfHj71I69p6Yjw" name="google-site-verification">
<meta content="256EEBD629C23DDD0C09BB0A6987974E" name="msvalidate.01">
<link type="text/css" href="<%= designer.getDesignPath(currentPage) %>/resources/css/style-sheet.css" rel="Stylesheet">
<link media="screen" href="<%= designer.getDesignPath(currentPage) %>/resources/css/superfish/superfish_custom.css" type="text/css" rel="stylesheet">
<LINK MEDIA="screen" HREF="<%= designer.getDesignPath(currentPage) %>/resources/css/property-details.css" TYPE="text/css" REL="StyleSheet">
<LINK MEDIA="screen" HREF="<%= designer.getDesignPath(currentPage) %>/resources/images.oakwood.com/scripts/jquery/css/smoothness/jquery-ui-1.10.0.custom.min.css" TYPE="text/css" REL="StyleSheet">
<script src="<%= designer.getDesignPath(currentPage) %>/resources/js/jquery.blockUI.js" type="text/javascript"></script>
<script src="<%= designer.getDesignPath(currentPage) %>/resources/images.oakwood.com/scripts/jquery/css/smoothness/jquery-ui-1.10.0.custom.min.css" type="text/javascript"></script>
<script src="<%= designer.getDesignPath(currentPage) %>/resources/js/dhtml.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/common.js" type="text/javascript"></script>
<script src="<%= designer.getDesignPath(currentPage) %>/resources/js/flashDetection.js" type="text/javascript"></script>
 
 <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script> 
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>  
<script type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places">
    </script>
<!--[if IE 7]><link rel="stylesheet" href="<%= designer.getDesignPath(currentPage) %>/resources/css/style-sheet-ie7.css" type="text/css" /><![endif]-->
<script src="<%= designer.getDesignPath(currentPage) %>/resources/ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/jquery.blockUI.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/images.oakwood.com/scripts/jquery/js/jquery-ui-1.10.0.custom.min.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/dhtml.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/common.js" type="text/javascript"></script><script src="<%= designer.getDesignPath(currentPage) %>/resources/js/flashDetection.js" type="text/javascript"></script>

</head>
