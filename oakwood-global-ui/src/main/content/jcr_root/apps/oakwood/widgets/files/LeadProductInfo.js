var PDC = PDC || {};

PDC.widgets = PDC.widgets || {};

/**
 * Manages the tabs of the specified tab panel. The tab with
 * the specified ID will be shown, the others are hidden.
 * @param {CQ.Ext.TabPanel} tabPanel The tab panel
 * @param {String} tab the ID of the tab to show
 */
PDC.widgets.manageTabs = function(tabPanel, tab) {
    var tabs=['selection','image','video'];
    var index = tab ? tabs.indexOf(tab) : -1;

    tabPanel.unhideTabStripItem(index);
    if(index == 1 ){
		tabPanel.hideTabStripItem(2);
    }else if(index == 2){
		tabPanel.unhideTabStripItem(1);
    }
    tabPanel.doLayout();
};

/**
 * Hides the specified tab.
 * @param {CQ.Ext.Panel} tab The panel
 */
PDC.widgets.hideTab = function(tab) {
    var tabPanel = tab.findParentByType('tabpanel');
    var index = tabPanel.items.indexOf(tab);
    tabPanel.hideTabStripItem(index);
};

/**
 * Shows the tab which ID matches the value of the specified field.
 * @param {CQ.Ext.form.Field} field The field
 */
PDC.widgets.showTab = function(field) {
    PDC.widgets.manageTabs(field.findParentByType('tabpanel'), field.getValue());
};

/**
 * Toggles the field set on the same tab as the check box.
 * @param {CQ.Ext.form.Checkbox} box The check box
 */
PDC.widgets.toggleFieldSet = function(box) {
    var tabPanel = box.findParentByType('tabpanel');
    var panel = box.findParentByType('panel');

    var lightboxsel = panel.findByType('selection')[1];
    var disableLightBox = box.getValue()[0];
    if (disableLightBox) {

        lightboxsel.hide();
        lightboxsel.setValue('image');

        tabPanel.unhideTabStripItem(1);
		//disable the video
        tabPanel.hideTabStripItem(2);
		panel.doLayout();

    } else {

        lightboxsel.show();

        var lightboxValue =lightboxsel.getValue();

        if(lightboxValue == 'image'){
			tabPanel.unhideTabStripItem(1);
        }else if(lightboxValue == 'video'){
            tabPanel.unhideTabStripItem(1);
        	tabPanel.unhideTabStripItem(2);
        }

        panel.doLayout();
    }
};