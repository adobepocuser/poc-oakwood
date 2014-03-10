var PDC = PDC || {};

PDC.widgets = PDC.widgets || {}; 

PDC.widgets = PDC.widgets|| {};

PDC.widgets.manageTabs = function(tabPanel, tab1, tab2, tab3, tab4, tab5) {
    var tabs=['selection','buttonpanel','buttonpanelimage','onecolumnpanel','onecolumnpanelimage','twocolumnpanel','twocolumnpanelimage1','twocolumnpanelimage2','expandabledescription','expandableimage'];
    var index1 = tab1 ? tabs.indexOf(tab1) : -1;
    var index2 = tab2 ? tabs.indexOf(tab2) : -1;
    var index3 = tab3 ? tabs.indexOf(tab3) : -1;
    var index4 = tab4 ? tabs.indexOf(tab4) : -1;
    var index5 = tab5 ? tabs.indexOf(tab5) : -1;
//    if (index == -1) return;
    for (var i = 1; i != tabs.length; i++) {
        if (index1 == i||index2==i||index3==i||index4==i||index5==i) {
            tabPanel.unhideTabStripItem(i);
        }
        else {
            tabPanel.hideTabStripItem(i);
        }
    }
    tabPanel.doLayout();
};

PDC.widgets.hideTab = function(tab) {
    var tabPanel = tab.findParentByType('tabpanel');
    var index = tabPanel.items.indexOf(tab);
    tabPanel.hideTabStripItem(index);
};

PDC.widgets.showTab = function(field) {
    if(field.getValue()=="buttonpanel")
    {
        PDC.widgets.manageTabs(field.findParentByType('tabpanel'), "buttonpanel","buttonpanelimage");
    }else if(field.getValue()=="onecolumnpanel")
    {
        PDC.widgets.manageTabs(field.findParentByType('tabpanel'), "onecolumnpanel","onecolumnpanelimage","expandabledescription","expandableimage");
    }else if(field.getValue()=="twocolumnpanel")
    {
        PDC.widgets.manageTabs(field.findParentByType('tabpanel'), "twocolumnpanel","twocolumnpanelimage1","twocolumnpanelimage2","expandabledescription","expandableimage");
    }
};
PDC.widgets.showField = function(field,side) {
    if(field.getValue()=="text")
    {
		field.findParentByType('panel').find('name','./'+side+'Price')[0].hide();
        field.findParentByType('panel').find('name','./'+side+'Discounts')[0].hide();
        field.findParentByType('panel').find('name','./'+side+'Title')[0].show();
    }else if(field.getValue()=="price")
    {
		field.findParentByType('panel').find('name','./'+side+'Price')[0].show();
        field.findParentByType('panel').find('name','./'+side+'Discounts')[0].show();
        field.findParentByType('panel').find('name','./'+side+'Title')[0].hide();
    }
};