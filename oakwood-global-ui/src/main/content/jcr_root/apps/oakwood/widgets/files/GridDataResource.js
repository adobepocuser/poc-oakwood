var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

PDC.widgets.gridDataChange = function(selection,value){
	var item = selection.findParentByType('mtmulticompositefielditem');
	var titleField = _.find(item.findByType('textfield'),function(item){
		return item.rawFieldName==='title';
	})
	if(typeof (value) ==='string'){
        var title = "";
		if( value.toLowerCase() !='manually'){
			var title = selection.findByType('combo')[0].getValue();
		}
		if(titleField ){
			titleField.setValue(title);
		}
	}
}
