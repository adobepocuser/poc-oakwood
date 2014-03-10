/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * @class CQ.html5.form.SmartImage
 * @extends CQ.html5.form.SmartFile
 * <p>The SmartImage is an intelligent image uploader. It provides tools to process an
 * uploaded image, for example a tool to define image maps and an image cropper.</p>
 * <p>Note that the component is mainly designed for use on a separate dialog tab. You may
 * use the component inside a {@link CQ.Ext.layout.FormLayout} optionally if you provide
 * a suitable {@link #height} setting.</p>
 * @since 5.5, replaces {@link CQ.form.SmartImage}
 * @constructor
 * Creates a new SmartImage.
 * @param {Object} config The config object
 */
CQ.html5.form.SmartImage4Multifield = CQ.Ext.extend(CQ.html5.form.SmartImage, {
      
      
          // overriding CQ.html5.form.SmartImage#initComponent
    initComponent: function() {

        CQ.html5.form.SmartImage.superclass.initComponent.call(this);

        this.workingAreaContainer = new CQ.Ext.Panel({
            "itemId": "workingArea",
            "border": false,
            "layout": "border"
        });
        this.processingPanel.add(this.workingAreaContainer);

        // Image display/processing area
        this.workingArea = new CQ.Ext.Panel({
            // "itemId": "workingArea",
            "border": false,
            "layout": "card",
            "region": "center",
            "activeItem": 0,
            "listeners": {
                "beforeadd": function(container, component) {
                    if (container._width && container._height && component.notifyResize) {
                        component.notifyResize.call(component, this._width, this._height);
                    }
                },
                "bodyresize": function(panel, width, height) {
                    if (typeof width == "object") {
                        height = width.height;
                        width = width.width;
                    }
                    if (width && height) {
                        panel._width = width;
                        panel._height = height;
                        var itemCnt = panel.items.getCount();
                        for (var itemIndex = 0; itemIndex < itemCnt; itemIndex++) {
                            var itemToProcess = panel.items.get(itemIndex);
                            if (itemToProcess.notifyResize) {
                                itemToProcess.notifyResize.call(
                                        itemToProcess, width, height);
                            }
                        }
                    }
                }
            },
            "afterRender": function() {
                CQ.Ext.Panel.prototype.afterRender.call(this);
                this.el.setVisibilityMode(CQ.Ext.Element.DISPLAY);
            }
        });
        this.workingAreaContainer.add(this.workingArea);

        //custom , Using SmartImage4Multifield.ImagePanel to replace Image Panel
        this.imagePanel = new CQ.html5.form.SmartImage4Multifield.ImagePanel({
            "itemId": "imageview",
            "listeners": {
                "smartimage.zoomchange": {
                    fn: function(zoom) {
                        if (this.zoomSlider) {
                            this.suspendEvents();
                            this.zoomSlider.setValue(zoom * 10);
                            this.resumeEvents();
                        }
                    },
                    scope: this
                },
                "smartimage.defaultview": {
                    fn: this.disableTools,
                    scope: this
                }
            }
        });
        this.workingArea.add(this.imagePanel);

        // insert customized panels
        if (this.topPanel) {
            this.topPanel.region = "north";
            this.workingAreaContainer.add(this.topPanel);
        }

        // Tool's initComponent
        var toolCnt = this.imageToolDefs.length;
        for (var toolIndex = 0; toolIndex < toolCnt; toolIndex++) {
            this.imageToolDefs[toolIndex].initComponent(this);
        }
        for (var toolIndex = 0; toolIndex < toolCnt; toolIndex++) {
          //  this.imageToolDefs[toolIndex].initComponent(this);
        }
        this.on("loadimage", this.adjustUI, this);
        this.on("enable",this.enableOutPutFields,this);
        this.on("disable",this.disableOutPutFields,this);
    }, 
       
     enableOutPutFields : function(comp){
        if(comp.outPutFields){
            for(var i=0; i<comp.outPutFields.length;i++){
               var f = comp.outPutFields[i];
               if(f.setDisabled){
                f.setDisabled(false);
                }
            }
        }
     },
       
     disableOutPutFields : function (comp) {
        if(comp.outPutFields){
            for(var i=0; i<comp.outPutFields.length;i++){
               var f = comp.outPutFields[i];
               if(f.setDisabled){
                    f.setDisabled(true);
                }
            }
        }
     },
       
     dialogSubmitHandler : function(){
          this.syncFormElements();
          return this.onBeforeSubmit();
     },
     
     
      /**
     * <p>Synchronizes form elements with the current UI state.</p>
     * <p>All form fields are adjusted accordingly.</p>
     * @private
     */
    syncFormElements: function() {
        if(typeof(this.disabled)!='undefined' && this.disabled){
            return ;
        }
        CQ.html5.form.SmartImage.superclass.syncFormElements.call(this);
        // sync tools
        var toolCnt = this.imageToolDefs.length;
        for (var toolIndex = 0; toolIndex < toolCnt; toolIndex++) {
            var toolToProcess = this.imageToolDefs[toolIndex];
            toolToProcess.transferToField();
        }
    },

     
    
    // overriding CQ.form.CompositeField#processRecord
    processRecord: function(record, path) {
        if (this.fireEvent('beforeloadcontent', this, record, path) !== false) {
            this.dataPath = path;
            this.isUploaded = false;
            this.fileInfo = null;
            this.referencedFileInfo = null;
            var fileName;
            if (this.fileNameParameter) {
                fileName = record.get(this.fileNameParameter);
            }
            if (this.fileReferenceParameter) {
                var fileRef = record.get(this.fileReferenceParameter);
                if (fileRef) {
                    this.referencedFileInfo = this.resolveReference(fileRef, path);
                    if (fileName) {
                        this.referencedFileInfo.fileName = fileName;
                    }
                    this.referencedFileInfo.url = this.createRefUrl(
                            this.referencedFileInfo);
                    this.referencedFileInfo.fallbackUrl = this.createFallbackRefUrl(
                            this.referencedFileInfo);
                }
            }
            var value = record.get(this.name);
            if (value) {
                if (value["jcr:content"]) {
                    value = CQ.Sling.processBinaryData(value["jcr:content"]);
                } else {
                    value = CQ.Sling.processBinaryData(value);
                }
                if (value) {
                    var relName = this.rawFieldName? this.rawFieldName : this.name;
                    var dataPath = CQ.Sling.getContentPath(relName, path);
                    this.fileInfo = {
                        "fileName": fileName,
                        "dataPath": dataPath,
                        "mimeType": value.type,
                        "size": value.size,
                        "url": CQ.HTTP.externalize(dataPath, true)
                    };
                    this.serverFileInstance = this.fileInfo;
                }
            }
            this.postProcessRecord(record, path);
            this.validateOnStateChange();
            this.syncFormElements();
            this.updateView();

            // add marker field for undoing binary changes
            if (CQ.undo.UndoManager.isEnabled()) {
                var topLevel = this.getToplevel();
                CQ.undo.util.UndoUtils.addBlobMarkerField(this.getToplevel(), {
                    "type": "update",
                    "path": path,
                    "field": this.getName()
                });
                // workaround for bug #38022
                // TODO to be removed
                var form = (topLevel.getXType() == "dialog" ? topLevel.form :
                        (topLevel.getXType() == "form" ? topLevel.getForm() : null));
                if (form) {
                    if (this.fileNameField) {
                        form.add(this.fileNameField)
                    }
                    // TODO more required?
                }
            }

            this.fireEvent('loadcontent', this, record, path);
        }
     },
    
      
      // overriding CQ.html5.form.SmartImage#updateView
     /**
     * <p>Updates the UI to the current state of the component.</p>
     * <p>The correct basic panel (upload/referencing vs. editing) is chosen. All editing
     * stuff is reset to a default state. The editing area is notified about the image to
     * display, if applicable.</p>
     * @private
     */
    updateView: function() {

        if (this.editLock) {
            this.containerPanel.getLayout().setActiveItem("lock");
            if (!this.isLockPanelCreated) {
                this.createLockPanel();
            }
        } else {

            var hasAnyImage = this.originalImage || this.originalRefImage
                                      || this.processedImage || this.processedRefImage;
            this.updateViewBasics(hasAnyImage);
            if (hasAnyImage) {
            
            //customize in the multifield. the Layout would be a string install of an object.
                if(this.workingArea.getLayout().setActiveItem){
                    this.workingArea.getLayout().setActiveItem("imageview");

                }
                this.resetTools();
                this.resetZoomSlider();
            }
            this.updateImageInfoState();
        }

        this.doLayout();

        if (this.processedRefImage) {
            this.imagePanel.updateImage(this.processedRefImage);
        } else if (this.originalRefImage) {
            this.imagePanel.updateImage(this.originalRefImage);
        } else if (this.processedImage) {
            this.imagePanel.updateImage(this.processedImage);
        } else if (this.originalImage) {
            this.imagePanel.updateImage(this.originalImage);
        }
    },
     
    // overriding CQ.form.SmartFile#onRender
    /**
      * Just call CQ.Ext.Panel#onRender and Ignore the CQ.html5.form.SmartFile#OnRender because the SmartFile register anonymous functon,which could not be removed .
      * Replacing the anonymouse function to a function called dialogSubmitHandler(); 
     **/
    onRender: function(ct, pos) {
        
        //Using CQ.html5.form.SmartFile instead of CQ.html5.form.SmartImage !
        CQ.html5.form.SmartFile.superclass.onRender.call(this, ct, pos);
        var outPutFields= [];
        if(this.filedNameField){
        outPutFields.push(this.filedNameField);
        }
        if(this.fileReferenceField){
         outPutFields.push(this.fileReferenceField);
        }
        if (this.lastModifiedParameter){
            outPutFields.push(this.lastModifiedParameter);
        }
        if(this.lastModifiedByParameter){
            outPutFields.push(this.lastModifiedByParameter);
        }
        var multifieldItem = this.findParentByType('imagemultifielditem');    
        if(multifieldItem.fields){
            var hiddenImageSlingResourceField =  multifieldItem.fields.find(function(f){
                 if(f.rawFieldName==='image/sling:resourceType'){
                     return f;
                 }
             });
            if(hiddenImageSlingResourceField){
                outPutFields.push(hiddenImageSlingResourceField);
            }
        }
        for (var i=0;i< this.imageToolDefs.length;i++){
            var field =  this.imageToolDefs[i];
            if(field.transferField){
                 outPutFields.push(field.transferField);
            }
        }
        this.outPutFields = outPutFields;
        this.el.setVisibilityMode(CQ.Ext.Element.DISPLAY);
        this.body.setVisibilityMode(CQ.Ext.Element.DISPLAY);
        var dialog = this.getToplevel();
        if (dialog) {
            /* replace 
             * <code>
                  dialog.on("beforesubmit", function() {
                        this.syncFormElements();
                    return this.onBeforeSubmit();
                    }, this);
               <code>
              */
            dialog.on("beforesubmit", this.dialogSubmitHandler, this);
            this.on('removed',function(comp,owner){
                if(dialog){
                    dialog.un("beforesubmit", comp.dialogSubmitHandler,comp);
                }
                
            },this);            
            /** Code copied from   CQ.html5.form.SmartImage#onRender */
             dialog.on("hide", function() {
                this.hideTools();
                this.imagePanel.ignoreRotation = false;
                this.toolSelector.disable();
                this.imagePanel.disablePanelTemporaryily();
            }, this);
            dialog.on("editlocked", function(dlg, isInitialState) {
                // only save drop targets the first time
                if (this.savedDropTargets == null) {
                    this.savedDropTargets = this.dropTargets;
                }
                this.dropTargets = null;
            }, this);
            dialog.on("editunlocked", function(dlg, isInitialState) {
                // only restore if there are saved drop targets available (they will not if
                // the initial state of the component is unlocked)
                if (this.savedDropTargets != null) {
                    this.dropTargets = this.savedDropTargets;
                }
            }, this);
            
            
        } else {
            var form = this.findParentByType(CQ.Ext.form.FormPanel);
            if (form) {
                var frm = form.getForm();
                frm.on("beforeaction", function() {
                    this.syncFormElements();
                    return this.onBeforeSubmit();
                }, this);
            }
        }
    }
    
});

// register xtype
CQ.Ext.reg('html5smartimage4Multifield', CQ.html5.form.SmartImage4Multifield);

CQ.html5.form.SmartImage4Multifield.ImagePanel = CQ.Ext.extend(CQ.form.SmartImage.ImagePanel, {

    //override CQ.form.SmartImage.ImagePanel#addCanvasClass
    addCanvasClass: function(classToAdd) {
        if(CQ.Ext.get(this.imageCanvas)){
                    CQ.Ext.get(this.imageCanvas).addClass(classToAdd);

        }
    },

    //override CQ.form.SmartImage.ImagePanel#removeCanvasClass
    removeCanvasClass: function(classToRemove) {
            if(CQ.Ext.get(this.imageCanvas)){

                CQ.Ext.get(this.imageCanvas).removeClass(classToRemove);
                }
    }
});