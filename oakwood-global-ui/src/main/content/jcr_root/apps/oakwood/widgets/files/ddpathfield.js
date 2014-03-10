/**
 * @class CQ.form.DDPathField
 * @extends CQ.form.PathField The DDPathField allows user drag and drop asset to
 *          the pathfield
 * @constructor Creates a new CQ.form.DDPathField.
 * @param {Object}
 *            config The config object
 */
CQ.form.DDPathField = CQ.Ext.extend(CQ.form.PathField, {
    constructor : function(config) {
        config = config || {};
        var defaults = {
            "parBrowse" : false,
            "anchor" : CQ.themes.Dialog.ANCHOR,
            "ddGroups" : [ CQ.wcm.EditBase.DD_GROUP_PAGE, CQ.wcm.EditBase.DD_GROUP_ASSET ],
            "fieldDescription" : CQ.I18n.getMessage("Drop files or pages from the Content Finder"),
            "listeners" : {
                "dialogselect" : {
                    "fn" : this.selectAnchor,
                    "scope" : this
                },
                "render" : this.initHrefDragAndDrop,
                "beforedestroy" : this.beforeDestroy
            },
            "validationEvent" : "keyup",
            "escapeAmp" : true
        };
        CQ.Util.applyDefaults(config, defaults);
        CQ.form.DDPathField.superclass.constructor.call(this, config);
    },
    initComponent : function() {
        CQ.form.DDPathField.superclass.initComponent.call(this);
    },

    selectAnchor : function(pathfield, path, anchor) {
        path = CQ.HTTP.encodePath(path);
        path = path.replace(/&/g, "%26");
        if (anchor && (anchor.length > 0)) {
            path += ".html#" + anchor;
        }
        pathfield.setValue(path);
    },
    beforeDestroy : function() {
        CQ.WCM.unregisterDropTargetComponent(this);
    },

    initHrefDragAndDrop : function() {
        if (this.ddGroups) {
            if (typeof (this.ddGroups) == "string") {
                this.ddGroups = [ this.ddGroups ];
            }
            var field = this;
            var target = new CQ.wcm.EditBase.DropTarget(this.el, {
                "notifyDrop" : function(dragObject, evt, data) {
                    if (dragObject && dragObject.clearAnimations) {
                        dragObject.clearAnimations(this);
                    }
                    if (dragObject.isDropAllowed(this)) {
                        if (data.records && data.single) {
                            var record = data.records[0];
                            var path = record.get("path");
                            //path = CQ.HTTP.encodePath(path);
                            //path = path.replace(/&/g, "%26");
                            try {
                                field.setValue(path);
                                field.fireEvent('afterDrop');
                            } catch (e) {
                                alert(e);
                            }
                            evt.stopEvent();
                            return true;
                        }
                        return false;
                    }
                }
            });

            // add highlight when ddpathfield is rendered
            var dialog = this.findParentByType(CQ.Dialog);
            if (dialog && dialog.el && target.highlight) {
                var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);
                if (!isNaN(dialogZIndex)) {
                    target.highlight.zIndex = dialogZIndex + 1;
                }
            }
            CQ.WCM.registerDropTargetComponent(field);
            // dialog.on("show", function() {
            // alert("show register");
            // CQ.WCM.unregisterDropTargetComponent(field);
            // CQ.WCM.registerDropTargetComponent(field);
            // }, target);
            // dialog.on("hide", function() {
            // alert("hide unregister");
            // CQ.WCM.unregisterDropTargetComponent(field);
            // }, target);

            for ( var i = 0; i < this.ddGroups.length; i++) {
                target.addToGroup(this.ddGroups[i]);
            }
            target.removeFromGroup(CQ.wcm.EditBase.DD_GROUP_DEFAULT);
            this.dropTargets = [ target ];
        }
    }
});

CQ.Ext.reg("ddpathfield", CQ.form.DDPathField);
