

CQ.ipe.TextImageEditor = CQ.Ext.extend(CQ.ipe.TextEditor, {



    // overrides CQ.ipe.InplaceEditor#finish
    finish: function() {
        var editedContent = this.editorKernel.getProcessedHtml();
        this.resetInplaceEditing();
        this.editComponent.updateParagraph(this.textPropertyName, editedContent, {
            "./textIsRich": true,
            "./sling:resourceType": "/apps/pdc/components/functional/textimage"
        });
        this.addUndoStep(editedContent);
    }

});

CQ.ipe.InplaceEditing.register("textimage", CQ.ipe.TextImageEditor);