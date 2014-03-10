var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

PDC.widgets.addHandler = function(btn,event){
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
		var resultData = { '_charset_' : 'utf-8'};	
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
	
}

