/**
 * 
 */
package com.oakwood.searchpage.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.jcr.Node;
import javax.jcr.Session;

import net.sf.json.JSONArray;

import org.apache.sling.api.resource.NonExistingResource;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.oakwood.common.GenericConfiguration;
import com.oakwood.searchpage.entity.SearchEntityBean;


public class OakwoodSearchController extends GenericConfiguration {
	
	private static final Logger LOGGER = LoggerFactory
			.getLogger(OakwoodSearchController.class);
	
	private String imgPathLoop = "";
	
	public List<SearchEntityBean> getSearchData(){
		LOGGER.info("Inside getSearchData");
		String path = "/etc/commerce/products/oakwood";
		String detailPagePath = "/content/oakwood/en/property1";
		String roomType = request.getParameter("roomType");
		String furnishedFlag = request.getParameter("furnished");
		String amenities = request.getParameter("amenities");
//		String searchPlace = request.getParameter("Postcode");
		
		List<SearchEntityBean> resultList = new ArrayList<SearchEntityBean>();
		Session session = null;
		try{
			session = request.getResourceResolver().adaptTo(Session.class);
			LOGGER.info("User ID  : " + session.getUserID());
			Node userNode = session.getNode("/home/users/u");
			
			String personalization = "";
			if(userNode != null && userNode.hasNode(session.getUserID()) && userNode.getNode(session.getUserID()).hasNode("profile")){
				Node profileNode = userNode.getNode(session.getUserID()).getNode("profile");
				LOGGER.info("User Path : " + profileNode.getPath());
				if(profileNode.hasProperty("personalization")){
					LOGGER.info("property for the user: " + profileNode.getProperty("personalization").getString());
					personalization = profileNode.getProperty("personalization").getString();
				}
			}else{
				LOGGER.info("User is null");
			}
			LOGGER.info("Personalization : " + personalization);
			Resource pageResource = page.getContentResource();
			Resource searchResource = pageResource.getChild("searchResultList");
			if(searchResource != null
					&& !(searchResource instanceof NonExistingResource)){
				ValueMap searchMap = searchResource.adaptTo(ValueMap.class);
				path = ("").equals(searchMap.get("rootpath", "")) ? path : searchMap.get("rootpath", "");
			}
			ResourceResolver resolver = request.getResourceResolver();
			Resource rootResource = resolver.getResource(path);
			if(rootResource == null || rootResource instanceof NonExistingResource) return resultList;
			
			Iterator<Resource> childResource = rootResource.listChildren();
			while(childResource.hasNext()){
				SearchEntityBean searchBean = new SearchEntityBean();
				Resource currentChild = childResource.next();
				ValueMap childValueMap = currentChild.adaptTo(ValueMap.class);
				if(childValueMap == null) continue;
				//filter
				String[] hotelRoomType = (String[])childValueMap.get("room_type", String[].class);
				String[] aAValue = (String[])childValueMap.get("apartment_amenities", String[].class);
				String[] cAValue = (String[])childValueMap.get("community_amenities", String[].class);
				String[] tags = (String[])childValueMap.get("cq:tags", String[].class);
				String hotelFurnishedFlag = childValueMap.get("furnished", "");
				if(("").equals(hotelFurnishedFlag)) hotelFurnishedFlag = "false";
				List<String> rt = (hotelRoomType == null || hotelRoomType.length == 0) ? (new ArrayList()) : Arrays.asList(hotelRoomType);
				if(!rt.contains(roomType)) continue;
				List<String> apartmentAmenitiesValue = (aAValue == null || aAValue.length == 0) ? (new ArrayList()) : Arrays.asList(aAValue);
				List<String> communityAmenitiesValue = (cAValue == null || cAValue.length == 0) ? (new ArrayList()) : Arrays.asList(cAValue);
				List<String> personalisationValue = (tags == null || tags.length == 0) ? (new ArrayList()) : Arrays.asList(tags);
				
				
				if(!("").equals(amenities.trim())){
					if(!apartmentAmenitiesValue.contains(amenities.trim()) && 
							!communityAmenitiesValue.contains(amenities.trim())) continue;
				}
				if(!("").equals(personalization.trim())){
					if(!personalisationValue.contains(personalization.trim())) continue;
				}
				if(!hotelFurnishedFlag.equals(furnishedFlag)) continue;
				
				setImgPathLoop("");
				getFirstImga(currentChild);
				searchBean.setImg(getImgPathLoop());
				searchBean.setTitle(childValueMap.get("name", ""));
				String cutOverview = childValueMap.get("overview", "");
				cutOverview = cutOverview.length()>110 ? cutOverview.substring(0,110) + "..." : cutOverview;
				searchBean.setDiscription(cutOverview);
				searchBean.setLatitude(Double.valueOf(childValueMap.get("latitude", 0.0)));
				searchBean.setLongitude(Double.valueOf(childValueMap.get("longitude", 0.0)));
				searchBean.setDiscriptionTitle(childValueMap.get("name", "") + "<br>" + childValueMap.get("state", "") + "," + childValueMap.get("city", "") + " " + childValueMap.get("postcode", ""));
				searchBean.setProductUrl(detailPagePath + "." + currentChild.getName() + ".html");
				searchBean.setBook(childValueMap.get("booked", ""));
				searchBean.setPrice(childValueMap.get("price", ""));
				searchBean.setPhoneNum(childValueMap.get("phonenum", ""));
				searchBean.setState(childValueMap.get("state", ""));
				searchBean.setCity(childValueMap.get("city", ""));
				searchBean.setPostcode(childValueMap.get("postcode", ""));
				resultList.add(searchBean);
			}
			
		}catch (Exception e) {
			LOGGER.error("Exception :  " + e.getMessage());
			e.printStackTrace();
		}
		return resultList;
	}
	
	public String getJsonData(List<SearchEntityBean> param){
		return JSONArray.fromObject(param).toString();
	}
	
	private void getFirstImga(Resource resource) {
		if (("").equals(imgPathLoop)) {
			if (resource != null && !(resource instanceof NonExistingResource)) {
				Iterator<Resource> childResource = resource.listChildren();
				while (childResource.hasNext()) {
					Resource currentChild = childResource.next();
					if (currentChild == null || currentChild instanceof NonExistingResource)
						continue;
					ValueMap childValueMap = currentChild.adaptTo(ValueMap.class);
					if (childValueMap == null)
						continue;
					String childImgPath = childValueMap.get("fileReference", "");
					if (("").equals(childImgPath)) {
						getFirstImga(currentChild);
					} else {
						imgPathLoop = childImgPath;
						break;
					}
				}
			}
		}
	}
	
	public String getImgPathLoop() {
		return imgPathLoop;
	}
	public void setImgPathLoop(String imgPathLoop) {
		this.imgPathLoop = imgPathLoop;
	}
}
