
		$(document).ready(function(){
			$("a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed: 'fast', /* fast/slow/normal */
				padding: 40, /* padding for each side of the picture */
				opacity: 0.5, /* Value betwee 0 and 1 */
				showTitle: true, /* true/false */
				allowresize: true, /* true/false */
				counter_separator_label: ' of ', /* The separator for the gallery counter 1 "of" 2 */
				theme: 'light_rounded', /* light_rounded / dark_rounded / light_square / dark_square */
				callback: function(){}
			});
		});
				

	oak_setDisplay("previousImageActive", false);
	oak_setDisplay("nextImageInactive", false);

	var imageIndex=0;


	function nextPropertyImage() {	

		oak_setDisplay("previousImageInactive", false);
		oak_setDisplay("previousImageActive", true);
		imageIndex++;
		if (imageIndex < maxImage) {		
			if (imageIndex >= (maxImage-1)) {
				oak_setDisplay("nextImageActive", false);				
				oak_setDisplay("nextImageInactive", true);
			}

            var i=0;
            var path="";

            while(photoGalleryArray[i]!=null){
                path = path + photoGalleryArray[i];
                i++;
            }

            var imgArr = photoGalleryArray.replace('[','');
             imgArr =  imgArr.replace("]","");
             imgArr =  imgArr.split(",");

			document.getElementById("mainPhoto").src=imgArr[imageIndex];

			
			} 
	}
	
	function previousPropertyImage() {
		oak_setDisplay("nextImageInactive", false);
		oak_setDisplay("nextImageActive", true);
		imageIndex--;
		if (imageIndex>=0) {
			if (imageIndex<=0) {
				oak_setDisplay("previousImageActive", false);
				oak_setDisplay("previousImageInactive", true);
			}

			var i=imageIndex;
            var path="";

            while(i>=0){
                path = path + photoGalleryArray[i];
                i--;
            }

            var imgArr = photoGalleryArray.replace('[','');
             imgArr =  imgArr.replace("]","");
             imgArr =  imgArr.split(",");

			document.getElementById("mainPhoto").src=imgArr[imageIndex];



			//document.getElementById("mainPhoto").src=photoGalleryArray[imageIndex];
		}
	}
	
	function showLarge() {
			jQuery('#photo'+imageIndex).click();		
	}
	function showVirtualTours() {
			jQuery('#VTour0').click();
	}
	
	
	function navigate(detailType)
	{
		document.forms.propertyProfileForm.event.value=detailType;
		document.forms.propertyProfileForm.submit();
	}
	function goToPlace(placeType, placeName)
	{
		document.forms.propertyProfileForm.event.value="goToPlace";
		document.forms.propertyProfileForm.currentPlaceType.value=placeType;
		document.forms.propertyProfileForm.currentPlaceTypeName.value=placeName;
		document.forms.propertyProfileForm.submit();
	}
	function goToPackage(index)
	{
		document.forms.propertyProfileForm.packageIndex.value=index;
		document.forms.propertyProfileForm.event.value="showPackage";
		document.forms.propertyProfileForm.submit();
	}

	
	function toggleLeftNavigation(expanderId, submenuId) {	 
		var subsection=document.getElementById(submenuId);
	 	var icon=document.getElementById(expanderId);

	 	if (subsection.style.display!="none") {
	    	 subsection.style.display="none";
	    	 if (icon!=null)
		  	   icon.src="http://images.oakwood.com/oakwood2/images/new/rightarrowTeal.png";
	 	} else {
		     subsection.style.display="block";
			 if (icon!=null)
		       icon.src="http://images.oakwood.com/oakwood2/images/new/downarrowTeal.png";	
		}
		  
	}
	
	
	function goToEmail()
	{	
		document.forms.propertyProfileForm.event.value="goToEmail";
		document.forms.propertyProfileForm.submit();
	}

