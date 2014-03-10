
	//intialize navigation bar plugins	
	jQuery(function() {
		$("ul.sf-menu").supersubs({
			minWidth : 15, // minimum width of sub-menus in em units 
			maxWidth : 20, // maximum width of sub-menus in em units 
			extraWidth : 1
		}).superfish({
			speed : 'fast',
			delay : 200,
			disableHI : true,
			pathClass:  'current',
			animation : {
				opacity : 'show',
				height : 'show'
			}

		}); 
	});

	var showBookAptPanel = false;

	$("#bookAptNavButton").mouseover(function() {
		if (!showBookAptPanel) {
			showBookAptSearchPanel();
		}
	});

	$("#bookAptNavButton").click(function() {
		if (showBookAptPanel)
			hideBookAptSearchPanel();
		else
			showBookAptSearchPanel();
	});

	function showBookAptSearchPanel() {
		$("#bookAptSearchPanel").show();
		showBookAptPanel = true;
	}

	function hideBookAptSearchPanel() {
		$("#bookAptSearchPanel").hide();
		showBookAptPanel = false;
	}

	//hide book apartment search button and panel
	function hideBookAptSearch() {
		$("#bookAptSearch").hide();
	}
	
	function showBookAptSearch() {
		$("#bookAptSearch").show();
	}

	function showBookAptTitle() {
		$("#bookAptTitle").show();
	}	
	
	