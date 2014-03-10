<%--

  Oakwood Image Component.



--%><%
%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
%><%@page import="com.day.cq.wcm.api.WCMMode,org.apache.sling.api.request.RequestPathInfo,javax.jcr.*,java.util.*" %><%
	// TODO add you code here
%><%
Value[] propertyImages = null;
List photosList = new ArrayList();
if(currentNode.hasProperty("propertyImages")){
    if(currentNode.getProperty("propertyImages").isMultiple()){
		propertyImages = currentNode.getProperty("propertyImages").getValues();
    }else{
		propertyImages = new Value[1];
        propertyImages[0] = currentNode.getProperty("propertyImages").getValue();
    }
    for(int i=0; i<propertyImages.length; i++){
		photosList.add(propertyImages[i].getString());
    }
}
%><div class="photoGalleryContainer">
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
            <tbody><tr>					
                <td align="left">
                    <div id="previousImageActive" style="display: none;">
                        <a href="javascript:previousPropertyImage()">
                            <img src="https://www.oakwood.com/images/propertyDetails/left_arrow.gif" alt="" border="0">
                        </a>
                    </div>
                    <div id="previousImageInactive">
                        <img src="https://www.oakwood.com/images/propertyDetails/left_arrow_grey.gif" alt="" border="0">
                    </div>
                </td>
                <td align="center">
                    <span class="viewgallerytext" onclick="javascript:showLarge();" style="cursor: pointer">View Photo Gallery</span>
                </td>
                <td align="right"> 
                    <div id="nextImageActive">
                        <a href="javascript:nextPropertyImage()">
                            <img src="https://www.oakwood.com/images/propertyDetails/right_arrow.gif" alt="" border="0">
                        </a>
                    </div>
                    <div id="nextImageInactive" style="display: none;">
                        <img src="https://www.oakwood.com/images/propertyDetails/right_arrow_grey.gif" alt="" border="0">
                    </div>
                </td>
                </tr>
            </tbody></table>
    	</div>
	</div>
</div>