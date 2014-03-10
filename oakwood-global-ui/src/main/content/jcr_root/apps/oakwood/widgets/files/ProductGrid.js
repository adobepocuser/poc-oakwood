var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

PDC.widgets.productGrid = PDC.widgets.productGrid || {};



PDC.widgets.setTabInfo = function(dialog){
    var multiField = dialog.findByType("mtmulticompositefield")[0];

    var findField = function(fields, str ){
        for(var i=0; i<fields.length; i++){
            var field = fields[i]
            if(field.getName().indexOf(str)!=-1){
                return field;
            }
        }

    }
    
    var add2Item = function(field,item){
        if(item && field){
            item.add(field);
            item.doLayout();
        }
    }
    
    multiField.items.each(function(item, index) {
    	
        if (item instanceof CQ.form.MtMultiCompositeField.Item) {
            var value = item.getValue();
            if(!value.tabPosition && value.title){
                var reg = / /g;
                value.tabPosition = value.title.replace(reg, "");
                
                // set sling:resourceType
                var resTypeField = findField(item.findByType('hidden'),'tab_position/sling:resourceType');
                if(resTypeField!=null){
                    var fakename = resTypeField.getName().replace('tab_position',value.tabPosition);
                    var fakevalue = resTypeField.getValue();
                    add2Item(new CQ.Ext.form.Hidden({'name':fakename,'value':resTypeField.getValue()}), item);
                }
                
                item.setValue(value);
            }
            
            var toCopyData = ['datasource','items','type'];
            
            for(var i =  0; i < toCopyData.length; i++){
            	var name = toCopyData[i];
            	  var rowField = findField(item.findByType('hidden') ,'tab_position/'+name);
                  if(value[name] && rowField){  
                      var rowName = rowField.getName().replace('tab_position',value.tabPosition);
                      add2Item(new CQ.Ext.form.Hidden({'name':rowName,'value':value[name]}), item);
                  }
            }

        }
    }, multiField);
}


PDC.widgets.productGrid.rootPath = "/apps/pdc/components/page/common/search_promote/productgrid"


PDC.widgets.productGrid.datasourceChangeHanlder = function(selection,value){
	var rootPath = PDC.widgets.productGrid.rootPath
	var item = selection.findParentByType('mtmulticompositefielditem');
	var titleField = _.find(item.findByType('textfield'),function(item){
		return item.rawFieldName==='title';
	});
	
	var typeField = _.find(item.findByType('selection'),function(item){
		return item.rawFieldName==='type';
	})
	if(typeof (value) ==='string'){
        var title = "";
        
        //setOption empty firstly
        typeField.setOptions([]);
		if( value.toLowerCase() !='manually'){
			//set title
			if(titleField){
				title = selection.findByType('combo')[0].getValue();
			}
			//set type option
			if(typeField){
				var url = rootPath + "/"+value.toLowerCase() + ".json";
				var json = PDC.widgets.loadJson(url)
				if(json){
					typeField.setOptions(json);
				}
				typeField.validate();
			}
		
		}
		if(titleField ){
			titleField.setValue(title);
		}
		typeField.setValue("");
		typeField.doLayout();
	}
}

PDC.widgets.productGrid.beforeLoadHandler = function (field,record){
	
	var rootPath = PDC.widgets.productGrid.rootPath
	var item = field.findParentByType('mtmulticompositefielditem');
	var datasourceField = _.find(item.findByType('selection'),function(item){
		return item.rawFieldName==='datasource';
	})
	if(datasourceField && record){
		var fieldName = datasourceField.getName();
		fieldName = fieldName.substring(fieldName.indexOf('./')+2,fieldName.length);
		var datasource = record.get(fieldName);
		if(typeof (datasource) === 'string' && datasource.toLowerCase()!="manually"){
			var url = rootPath + "/"+datasource.toLowerCase() + ".json";
			var json = PDC.widgets.loadJson(url)
			if(json){
				field.setOptions(json);
			}
		}
	}
}

PDC.widgets.loadJson = function (url){
	try{
		if(url){
			var response = CQ.HTTP.get(url);
			if(CQ.HTTP.isOk(response)){
				return CQ.Util.eval(response);
			}else{
				CQ.Log.debug("CQ.tagging.TagInputField#loadTags: no response for {0}, empty data}", url);
                return null;
			}
		}
	}catch (e) {
        CQ.Log.warn("LoadJson failed {0}", e.message);
        return null;
    }
}
