/*
 * Copyright 1997-2010 Day Management AG

 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * @class CQ.form.MtMultiCompositeField
 * @extends CQ.form.CompositeField
 * The MtMultiCompositeField is an editable list of a set of form fields for editing
 * a list of nodes with their properties. Unlike the {@link CQ.form.MultiField},
 * which works on an array of values (multi-value property in JCR), this widget works
 * on a list of named objects, each containing the same set of properties (nodes with
 * properties in JCR).
 *
 * <p>The naming scheme for the nodes will use a baseName + an automatically incremented
 * number, eg. "node_1" where the baseName is "node_". For better readability, the number
 * can be replaced by using the value of one of the fields (using {@link #nameField},
 * optionally regexp-based using {@link #nameFieldRegex}), eg. "node_valueA", "node_valueB".
 * Note that if ordering is desired (via {@link #orderable}), it will be managed
 * independently from the numbering, only the used node type must support it.
 * Additionally, a prefix can be given for the final field names (just for the submit
 * field names, eg. to support the often required "./" prefix for the Sling POST).
 *
 * @constructor
 * Creates a new MtMultiCompositeField.
 * @param {Object} config The config object
 */
    var originalAddItemFunction = CQ.form.MultiField.prototype.addItem,
        originalValidateFunction = CQ.form.MtMultiCompositeField.prototype.validate;
CQ.form.ImageMultiField = CQ.Ext.extend(CQ.form.MtMultiCompositeField, {

   

    /**
     * Adds a new field with the specified value to the list.
     * @param {String} name name of the object to add
     * @param {Object} o The object to add
     */
    getActualItemCount: function() {
        return this.items.getCount() - 1;
    },

    addItem: function(name, o,record) {
        if (this.maxItems && (this.maxItems == this.getActualItemCount())) {
            CQ.Ext.Msg.show({
                title: 'Maximum Items reached',
                msg: 'You are only allowed to add ' + this.maxItems + ' items to this field',
                icon: CQ.Ext.MessageBox.WARNING,
                buttons: CQ.Ext.Msg.OK
            });
            return;
        }
        if (!name) {
            // new item to add
            name = this.createName();
        }
        
        // what to do with values that couldn't be found? we delete the nodes normally...
        var item = this.insert(this.items.getCount() - 1, {
            xtype: "imagemultifielditem",
            name: name,
            prefix: this.fieldNamePrefix,
            orderable: this.orderable,
            readOnly: this.readOnly,
            fieldConfigs: this.fieldConfigs,
            panelConfig: this.itemPanelConfig
        });
        // TODO: add all fields - or maybe not, seems they get automagically added
        //this.findParentByType("form").getForm().add(item.field);
        this.doLayout();
        item.processPath(this.path);
        item.processRecord(record,this.path);
        if (o) {
            item.setValue(o);
        }
/*
        if (this.fieldWidth < 0) {
            // fieldWidth is < 0 when e.g. the MtMultiCompositeField is on a hidden tab page;
            // do not set width but wait for resize event triggered when the tab page is shown
            return;
        }
        if (!this.fieldWidth) {
            this.calculateFieldWidth(item);
        }*/
        try {
            // TODO: field width
            //console.log("setPanelWidth", this.fieldWidth);
            //item.setPanelWidth(this.fieldWidth);
        }
        catch (e) {
            CQ.Log.debug("CQ.form.MtMultiCompositeField#addItem: " + e.message);
        }
    },
        validate: function() {
            if (this.minItems) {
                if (this.getActualItemCount() < this.minItems) {
                    if (this.allowEmpty && (this.getActualItemCount() == 0)) {
						return true;
                    } else {
                        CQ.Ext.Msg.show({
                            title: 'Minimum Items required',
                            msg: 'You must add at least ' + this.minItems + ' items to this field',
                            icon: CQ.Ext.MessageBox.WARNING,
                            buttons: CQ.Ext.Msg.OK
                        });
	                    this.markInvalid("You must add at least " + this.minItems + " items to this field");
    	                return false;
                    }
                }
            }
            
            return originalValidateFunction.apply(this);
        },
        markInvalid : function(msg){
            //don't set the error icon if we're not rendered or marking is prevented
            if (this.rendered && !this.preventMark) {
                this.body.addClass(this.invalidClass);
            }
            
            this.fireEvent('invalid', this, msg);
        },
        clearInvalid : function(){
            //don't remove the error icon if we're not rendered or marking is prevented
            if (this.rendered && !this.isDestroyed && !this.preventMark) {
                this.body.removeClass(this.invalidClass);
            }
            
            this.fireEvent('valid', this);
        },
    

    // private, loads a single object
    processItem: function(name, o,record) {
        if (typeof o !== "object") {
            return;
        }
        
        if (this.baseName && this.matchBaseName !== false) {
            // check if o.name starts with the baseName
            if (name.indexOf(this.baseName) !== 0) {
                return;
            }
        }
        //console.log("addItem", name);
        this.addItem(name, o , record);
    },
    
    // overriding CQ.form.CompositeField#processRecord
    processRecord: function(record, path) {
        
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            
            // remove all existing fields
            this.items.each(function(item/*, index, length*/) {
                if (item instanceof CQ.form.MtMultiCompositeField.Item) {
                    item.removeForContainer();
                    this.remove(item, true);

                    item =null;
                    // TODO: remove all fields from form
                    //this.findParentByType("form").getForm().remove(item);
                }
            }, this);
            
            if (this.name) {
                var c = record.get(this.name);
                for (var n in c) {
                    var v = record.get(this.getName());
                    this.processItem(n, c[n],record);
                }
            } else {
                record.fields.each(function(field) {
                    this.processItem(field.name, record.get(field.name),record);
                }, this);
            }
            
            this.fireEvent('loadcontent', this, record, path);
            
            /// ---------------------
            // 
            // var v = record.get(this.getName());
            // if (v == undefined && this.defaultValue != null) {
            //     if (this.isApplyDefault(record, path)) {
            //        this.setValue(this.defaultValue);
            //     }
            // }
            // else {
            //     this.setValue(v);
            // }
            // this.fireEvent('loadcontent', this, record, path);
        }
    }

  
});

CQ.Ext.reg("imagemultifield", CQ.form.ImageMultiField);

/**
 * @private
 * @class CQ.form.MtMultiCompositeField.Item
 * @extends CQ.Ext.Panel
 * The MtMultiCompositeField.Item is an item in the {@link CQ.form.MtMultiCompositeField}.
 * This class is not intended for direct use.
 * @constructor
 * Creates a new MtMultiCompositeField.Item.
 * @param {Object} config The config object
 */
CQ.form.ImageMultiField.Item = CQ.Ext.extend(CQ.form.MtMultiCompositeField.Item, {

      constructor: function(config) {
        var item = this;
        var prefix = config.prefix;
        if(prefix.indexOf('././')==0){
            prefix = prefix.substring(2);
        }
        var fields = CQ.Util.copyObject(config.fieldConfigs);
        for (var i = 0; i < fields.length; i++) {
            var f = fields[i];
            f.rawFieldName = f.name;
            f.name = config.prefix + config.name + "/" + f.rawFieldName;
            // custom ,replace the config starts with './' to f.name + config;
            for (var key in f){
                var configItem = f[key];
                if(key!='name' && typeof configItem ==='string' && configItem.charAt(0)==='.' && configItem.charAt(1)==='/'){
                    f[key]=prefix + config.name +f[key].substring(1);
                }
            }
            f.readOnly = config.readOnly;

        }

        config.panelConfig = CQ.Util.copyObject(config.panelConfig);
        config.panelConfig.items = fields;
        config.panelConfig.cellCls = "cq-multifield-itemct";
        
        var items = new Array();
        items.push(config.panelConfig);
/*
        items.push({
            xtype: "panel",
            border: false,
            cellCls: "cq-multifield-itemct",
//            width: 100,
            items: config.panelConfig
        });
*/

        if(!config.readOnly) {
            //SAMMIT MODIFY
            // TODO: enable ordering again when functionality is implemented (see reorder())
          
            if (config.orderable) {
                items.push({
                    xtype: "panel",
                    border: false,
                    items: {
                        xtype: "button",
                        text: CQ.I18n.getMessage("Up", null, "Ordering upwards in MultiField"),
                        handler: function(){
                            var parent = item.ownerCt;
                            var index = parent.items.indexOf(item);

                            if (index > 0) {
                                item.reorder(parent.items.itemAt(index - 1));
                            }
                        }
                    }
                });
                items.push({
                    xtype: "panel",
                    border: false,
                    items: {
                        xtype: "spacer",
                        width: 5

                    }
                });
                items.push({
                    xtype: "panel",
                    border: false,
                    items: {
                        xtype: "button",
                        text: CQ.I18n.getMessage("Down", null, "Ordering downwards in MultiField"),
                        handler: function(){
                            var parent = item.ownerCt;
                            var index = parent.items.indexOf(item);
                            
                            // note: there is one last item for the add button, must be ignored
                            if (index < parent.items.getCount() - 2) {
                                parent.items.itemAt(index + 1).reorder(item);
                            }
                        }
                    }
                });
            }
//SAMMIT MODIFY
            items.push({
                    xtype: "panel",
                    border: false,
                    items: {
                        xtype: "spacer",
                        width: 5

                    }
                });
            items.push({
                xtype: "panel",
                border: false,
                items: {
                    xtype: "button",
                    cls: "cq-multifield-btn",
                    text: "-",
                    handler: function() {
                        // TODO: remove from owner form !???
                        item.ownerCt.remove(item);
                    }
                }
            });
        }

        config = CQ.Util.applyDefaults(config, {
            layout: "table",
            anchor: "100%",
            bodyCssClass: "cq-multifield-item",
            border: false,
            layoutConfig: {
                columns: 6
            },
            defaults: {
                bodyStyle: "padding:0px"
            },
           
            items: items
        });
        CQ.form.MtMultiCompositeField.Item.superclass.constructor.call(this, config);
        
        this.fields = new CQ.Ext.util.MixedCollection(false, function(field) {
            return field.rawFieldName;
        });
        this.getFieldPanel().items.each(function(item) {
            if (item.rawFieldName) {
                this.fields.add(item.rawFieldName, item);
            }
        }, this);

        if (config.value) {
            this.setValue(config.value);
        }
    },

     //override @CQ.form.MtMultiCompositeField.Item#processRecord
    processRecord: function(record,path) {
        var subNode = this.prefix.substring(1)+this.name;
        this.fields.each(function(f) {
            if (f.processRecord && f.xtype && f.xtype != 'hidden' ) {
            
                //generate empty record
                if(!record){
                  var EmptyRecordCreator = CQ.data.SlingRecord.create({});
                  record = new EmptyRecordCreator({},{});
                }
                
                f.processRecord(record,path+subNode);
            }
        });
    },
    
    
    // if the field is image ,remove the listener of beforesubmit
    removeForContainer: function(){
        this.fields.each(function (f){
            if(f.getToplevel && typeof f.getToplevel ==='function'&&f.dialogSubmitHandler && typeof f.dialogSubmitHandler ==='function'){
               var dialog = f.getToplevel();
                if(dialog){
               //     dialog.un('beforesubmit', f.dialogSubmitHandler);
                }
            }
        });
    }


});

CQ.Ext.reg("imagemultifielditem", CQ.form.ImageMultiField.Item);
