var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

PDC.widgets.moveTo = function(btn,order){
	var rollover = btn.scope;
	if (rollover.xtype == 'editrollover') {
		var editbar = rollover.getParent();
		if (editbar.xtype == 'editbar') {
			var path = rollover.path;
			 $CQ.post(path, 
					 { '_charset_' : 'utf-8',
					 	':order' : order},
			 		function(){
			 			editbar.refreshSelf();
			 		}
	 		);
		}
	}
};

PDC.widgets.moveToTop = function(btn,event){
	if (PDC.widgets.getPosition(btn)>0) {
		PDC.widgets.moveTo(btn,'first');
	} else {
		CQ.Ext.Msg.show({
            title: 'Error',
            msg: 'Media tile already at the top.',
            icon: CQ.Ext.MessageBox.WARNING,
            buttons: CQ.Ext.Msg.OK
        });	
	}
};

PDC.widgets.moveToBottom = function(btn,event){
	if (PDC.widgets.isLast(btn) == false) {
		PDC.widgets.moveTo(btn,'last');
	} else {
		CQ.Ext.Msg.show({
            title: 'Error',
            msg: 'Media tile already at the bottom.',
            icon: CQ.Ext.MessageBox.WARNING,
            buttons: CQ.Ext.Msg.OK
        });	
	}
};

PDC.widgets.isLast = function(btn){
	var rollover = btn.scope;
	if (rollover.xtype == 'editrollover') {
		var editbar = rollover.getParent();
		if (editbar.xtype == 'editbar') {
			var itemName = rollover.path.replace(/.*\//,''),
				carousel = $(editbar.element.dom),
				allItems = carousel.find('.mediaItem'),
				curItem = carousel.find('.'+itemName)[0];
			
			if (allItems[allItems.size()-1] == curItem)
				return true;
			else
				return false;
		}
	}
};

PDC.widgets.getPosition = function(btn){
	var rollover = btn.scope;
	if (rollover.xtype == 'editrollover') {
		var editbar = rollover.getParent();
		if (editbar.xtype == 'editbar') {
			var itemName = rollover.path.replace(/.*\//,''),
				carousel = $(editbar.element.dom),
				allItems = carousel.find('.mediaItem'),
				curItem = carousel.find('.'+itemName)[0];

			for (i=0;i<allItems.size();i++) {
				if (allItems[i] == curItem) {
					return i;
				}
			}
		}
	}
	return -1;
};

PDC.widgets.moveUp = function(btn,event){
	var position = PDC.widgets.getPosition(btn);
	if (position>0) {
		PDC.widgets.moveTo(btn,position-1);
	} else {
		CQ.Ext.Msg.show({
            title: 'Error',
            msg: 'Media tile already at the top.',
            icon: CQ.Ext.MessageBox.WARNING,
            buttons: CQ.Ext.Msg.OK
        });	
	}
};

PDC.widgets.moveDown = function(btn,event){
	var position = PDC.widgets.getPosition(btn);
	if (PDC.widgets.isLast(btn) == false) {
		PDC.widgets.moveTo(btn,position+1);
	} else {
		CQ.Ext.Msg.show({
            title: 'Error',
            msg: 'Media tile already at the bottom.',
            icon: CQ.Ext.MessageBox.WARNING,
            buttons: CQ.Ext.Msg.OK
        });	
	}
};

PDC.widgets.addFirstHandler = function(btn,event){
	var childConfig = btn.initialConfig['childConfig'];
	if (childConfig && childConfig['name'] && childConfig['sling:resourceType']){
		var name = childConfig['name'] ;
		var resourceType = childConfig['sling:resourceType'];
		var toolbar = btn.findParentByType('toolbar')
		if(toolbar && toolbar.ownerCt){
			var editBar = toolbar.ownerCt;
			
			var data = createData(childConfig);
			if(editBar.xtype == 'editbar'){
				var path = editBar.path+"/";
				 $CQ.post(path, 
						 data,
				 		function(){
				 			editBar.refreshSelf();
				 		}
		 		);
			}
			
		}
       
		
	}
	
	function createData (configChild){
		var resultData = { '_charset_' : 'utf-8' ,
							':order' : 'first'};	
		if(configChild['name']){
			resultData[':nameHint']=configChild['name'];
		}
		configChild['name'] == '';
		var create = function(path,object, result){
			for( var k in object){
				tempPath = path + '/'+k;
				if(typeof object[k] ==='object' ){
					
					create (tempPath, object[k],result)
				}else{
						result[tempPath] = object[k];
				}
				
			}
		}
		create('.',configChild,resultData);
		return resultData;
		
	}
	
};

