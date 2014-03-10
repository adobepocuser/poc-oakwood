<%--

  Oakwood Amenities Component.

  

--%><%
%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
%><%
	// TODO add you code here
%><div class="amenitiesContainer"><%
	Value[] amenities = null;
	Value[] listFrom = null;
	int count = 0;
	if(currentNode.hasProperty("listFrom")){
        if(currentNode.getProperty("listFrom").isMultiple()){
			listFrom = currentNode.getProperty("listFrom").getValues();
        }else{
			listFrom = new Value[1];
            listFrom[0] = currentNode.getProperty("listFrom").getValue();
        }
	}
	if(listFrom!=null && listFrom[0].getString().equals("children") && currentNode.hasProperty("amenities")){
        if(currentNode.getProperty("amenities").isMultiple()){
            amenities = currentNode.getProperty("amenities").getValues();
        }else{
            amenities = new Value[1];
            amenities[0] = currentNode.getProperty("amenities").getValue();
        }
        if(amenities.length > 4){
			count = 4;
        }else{
			count = amenities.length;
        }
%>
	<div class="amenitiesSection">
		<ul class="amenitiesList">
<%
		for(int i=0; i<count; i++){
%>
	<li style="margin-bottom: 5px;"><%=amenities[i].getString()%></li>
	<%}%>
        </ul>						    								
    </div>
    <%if(amenities.length > 4){
		count = amenities.length;
    %>
	<div class="amenitiesSection">
		<ul class="amenitiesList">
    <%
    for(int i=4; i<count; i++){
    %>
		<li style="margin-bottom: 5px;"><%=amenities[i].getString()%></li>
            <%}%>        
    	</ul>						    								
	</div>

<%}}else if(listFrom!=null && listFrom[0].getString().equals("descendants") && (currentNode.hasProperty("amenitiesLeft") || currentNode.hasProperty("amenitiesRight"))){
	%>
	<div class="subtitleAlign">
        <div class="amenitiesContainer">
            <div class="left">
                <ul class="amenitiesList">
                    <%	Value[] amenitiesLeft = null;
        				Value[] amenitiesRight = null;
                        if(currentNode.hasProperty("amenitiesLeft")){
                            if(currentNode.getProperty("amenitiesLeft").isMultiple()){
								amenitiesLeft = currentNode.getProperty("amenitiesLeft").getValues();
                            }else{
								amenitiesLeft = new Value[1];
                                amenitiesLeft[0] = currentNode.getProperty("amenitiesLeft").getValue();
                            }
                        }
        				if(currentNode.hasProperty("amenitiesRight")){
                            if(currentNode.getProperty("amenitiesRight").isMultiple()){
								amenitiesRight = currentNode.getProperty("amenitiesRight").getValues();
                            }else{
								amenitiesRight = new Value[1];
                                amenitiesRight[0] = currentNode.getProperty("amenitiesRight").getValue();
                            }
                        }
        				if(amenitiesLeft != null){
                            for(int i=0; i<amenitiesLeft.length; i++){%>
                    		<li style="margin-bottom: 5px;"><%=amenitiesLeft[i].getString()%></li>																										
                    	<%}}%>																																
                </ul>
            </div>
            <div class="middle">												
                <ul class="amenitiesList">
                    <%if(amenitiesRight != null){
                            for(int i=0; i<amenitiesRight.length; i++){%>
                    <li style="margin-bottom: 5px;"><%=amenitiesRight[i].getString()%></li>													
                    <%}}%>													
                </ul>
            </div>
            <div class="right">																											
                <span class="amenitiesLinkC" style="cursor: pointer">
                    <img src="http://images.oakwood.com/oakwood2/images/new/ViewAllAmenities.png" border="0">
                </span>				
            </div>
        </div>
	</div>
	<%
    }else{%>
		Please enter details for Amenities
	<%}%></div>
