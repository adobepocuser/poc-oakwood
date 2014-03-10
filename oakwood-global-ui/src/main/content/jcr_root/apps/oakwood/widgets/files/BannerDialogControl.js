var PDC = PDC || {};

PDC.widgets = PDC.widgets || {}; 

/**
 * Manages the tabs of the specified tab panel. The tab with
 * the specified ID will be shown, the others are hidden.
 * @param {CQ.Ext.TabPanel} tabPanel The tab panel
 * @param {String} tab the ID of the tab to show
 */
PDC.widgets.bannerDialogControl = function(field,rec,path) {
    if (path) {
    	var pagePath = path.substring(0,path.indexOf("/jcr:content") + 12);
        var pageInfo = CQ.HTTP.eval(pagePath + ".1.json");
        var slingresourceType=pageInfo["sling:resourceType"];
        var tabPanel=field.findParentByType('tabpanel');
        if(slingresourceType=="pdc/components/page/hubPage"||slingresourceType=="/apps/pdc/components/page/hubPage"||slingresourceType=="pdc/components/page/generalPage"||slingresourceType=="/apps/pdc/components/page/generalPage"||slingresourceType=="pdc/components/page/articlePage"||slingresourceType=="/apps/pdc/components/page/articlePage")
        {
        	tabPanel.unhideTabStripItem(0);
        }
        else
        {
            field.setValue("");
            tabPanel.setActiveTab(1)
        }
    }
};
