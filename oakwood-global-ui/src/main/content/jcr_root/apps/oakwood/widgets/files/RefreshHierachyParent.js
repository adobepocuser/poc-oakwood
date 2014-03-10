var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

PDC.widgets.refreshHierarchyParent = function(editor,level){
	var refreshLevel = 2;
	if(level && typeof level ==='number'){
		refreshLevel = level;
	}
	parentPath = editor.path;
	var config = {path:parentPath};
	var parent = undefined ;
    try {
    	for(var i=0; i<refreshLevel; i++){
    		 parent = editor.getParent(config);
    		 if(!parent){
    			 if (parentPath.lastIndexOf("/") != -1) {
    		            parentPath = parentPath.substring(0, parentPath.lastIndexOf("/"));
    		            config.path = parentPath;
    			 }
			 }else{
				break;
    		 }
    	}

    	if (parent) {
            parent.refresh();
            return;
        }
    	
    } catch (e) {
    }
	CQ.wcm.EditBase.refreshPage();
}

PDC.widgets.refreshSelfmovedAndParent = function(editor,path,level){
	if(editor){
		editor.refreshSelfMoved(path);
	}
	PDC.widgets.refreshHierarchyParent(editor,level)
}





PDC.widgets.refreshCreatedAndParent = function(editor,path,definition,level){
	if(editor){
		editor.refreshCreated(path,definition);
	}
	PDC.widgets.refreshHierarchyParent(editor,level)
}








