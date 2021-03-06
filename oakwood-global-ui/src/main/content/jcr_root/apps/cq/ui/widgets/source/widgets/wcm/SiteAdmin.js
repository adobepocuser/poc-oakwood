/*
 * Copyright 1997-2008 Day Management AG
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
 * @class CQ.wcm.SiteAdmin
 * @extends CQ.Ext.Viewport
 * The SiteAdmin is a console providing WCM administration functions.
 * @constructor
 * Creates a new SiteAdmin.
 * @param {Object} config The config object
 */
CQ.wcm.SiteAdmin = CQ.Ext.extend(CQ.Ext.Viewport, {

    /**
     * Internal clipboard for copy operations.
     * @private
     */
    copyClipboard: null,
    
    /**
     * Internal use for file upload operations.
     * @private
     */
    createVersion: false,

    /**
     * @cfg {Object} search
     * The config options of the search field in the grid. Must be a valid
     * {@link CQ.form.SearchField} configuration.
     * Defaults to {"width":200}.
     */

    /**
     * @cfg {Boolean} noSearch
     * <code>true</code> to not render the search field in the grid.
     * @since 5.5
     */

    /**
     * @cfg {Object} searchPanel
     * The config for the search panel. If defined, the console will be wrapped
     * by a tab panel.
     * @since 5.5
     */

    /**
     * @cfg {String} tabTitle
     * If defined the console will be wrapped by a tab panel.
     */

    /**
     * @cfg {Object} treeLoader
     * The config options of the tree loader. Must be a valid
     * {@link CQ.Ext.tree.TreeLoader} configuration.
     */

    /**
     * @cfg {Object} treeRoot
     * The config options of the tree root. Must be a valid
     * {@link CQ.Ext.tree.TreeNode} configuration.
     */

    /**
     * @cfg {Object} actions
     * Object containing the config options for actions and menu items.
     * Must be valid {@link CQ.Ext.Action} configurations.
     */

    /**
     * @cfg {Object} grid
     * An object containing the grid configurations for different paths.
     * <ul>
     * <li>&lt;Config name&gt;<ul>
     * <li>pageSize: Maximum number of items per page (defaults to {@link CQ.themes.wcm.SiteAdmin#GRID_PAGE_SIZE})</li>
     * <li>pageText: Text to display in paging toolbar (defaults to {@link CQ.themes.wcm.SiteAdmin#GRID_PAGE_TEXT})</li>
     * <li>pathRegex: Regular expression for the path (defaults to "(/.*)?")</li>
     * <li>storeProxyPrefix: The prefix for the URL used by the store (defaults to "")</li>
     * <li>storeProxySuffix: The suffix for the URL used by the store (defaults to ".pages.json")</li>
     * <li>storePredicate: The predicate used to retrieve the list of pages (defaults to "siteadmin")</li>
     * <li>storeReaderTotalProperty: The property containing the number of pages returned (see {@link CQ.Ext.data.JsonReader}), defaults to "results"</li>
     * <li>storeReaderRoot: The root property to start reading at (see {@link CQ.Ext.data.JsonReader}), defaults to "pages"</li>
     * <li>storeReaderId: The property containing the ID (see {@link CQ.Ext.data.JsonReader}), defaults to "path"</li>
     * <li>storeReaderFields: The fields to read (see {@link CQ.Ext.data.JsonReader}).</li>
     * <li>columns: The column configurations (see {@link CQ.Ext.grid.GridPanel#columns})</li>
     * <li>defaultSortable: True if the grid should be sortable by default (defaults to true)</li>
     * </ul></li></ul>
     */

    /**
     * @cfg {Number} treeAutoExpandMax
     * The maximum number of allowed child nodes for automatic
     * (slingeclick) expansion (defaults to {@link CQ#CQ.TREE_AUTOEXPAND_MAX CQ.TREE_AUTOEXPAND_MAX})
     */

    /**
     * @cfg {Object} attribFilter
     * An attribute based node filter.
     * @private
     */

    /**
     * @cfg {Boolean} considerSubNodes
     * True if subnodes should be calculated to ensure correct display of
     * filtered subnodes (defaults to true).
     * @private
     */

    /**
     * {Boolean}
     * Signals if the current selected items can be published to Scene7
     */
    canPublishToScene7: false,

    constructor: function(config) {
        var admin = this;
        this.title = config.title;
        config = CQ.Util.applyDefaults(config, {
            "id": "cq-siteadmin",
            "search": {
                "width": 145,
                "listWidth": 260,
                "listAlign": "tr-br",
                "minChars": 3,
                "queryDelay": 500
            },
            "grid": {
                "pages": {
                    "pathRegex":"(/.*)?",
                    "storeProxyPrefix":"",
                    "storeProxySuffix": ".pages.json",
                    "storePredicate":"siteadmin",
                    "storeReaderTotalProperty": "results",
                    "storeReaderRoot": "pages",
                    "storeReaderId": "path",
                    "storeReaderFields": [
                        "index",
                        "title",
                        CQ.shared.XSS.getXSSPropertyName("title"),
                        "label",
                        "type",
                        "dialogPath",
                        "lastModifiedBy",
                        CQ.shared.XSS.getXSSPropertyName("lastModifiedBy"),
                        "lastModified",
                        "templateTitle",
                        "templateShortTitle",
                        "templatePath",
                        "replication",
                        { "name":"inWorkflow", "type":"bool" },
                        "workflows",
                        "scene7Status",
                        "lockedBy",
                        "monthlyHits",
                        "timeUntilValid",
                        "onTime",
                        "offTime",
                        "scheduledTasks",
                        CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP,
                        CQ.wcm.msm.MSM.PARAM_IS_IN_BLUEPRINT,
                        CQ.wcm.msm.MSM.PARAM_IS_SOURCE
                    ],
                    "columns": [
                        CQ.wcm.SiteAdmin.COLUMNS["numberer"],
                        CQ.wcm.SiteAdmin.COLUMNS["thumbnail"],
                        CQ.wcm.SiteAdmin.COLUMNS["title"],
                        CQ.wcm.SiteAdmin.COLUMNS["name"],
                        CQ.wcm.SiteAdmin.COLUMNS["published"],
                        CQ.wcm.SiteAdmin.COLUMNS["modified"],
                        CQ.wcm.SiteAdmin.COLUMNS["scene7Status"],
                        CQ.wcm.SiteAdmin.COLUMNS["status"],
                        CQ.wcm.SiteAdmin.COLUMNS["impressions"],
                        CQ.wcm.SiteAdmin.COLUMNS["template"],
                        CQ.wcm.SiteAdmin.COLUMNS["workflow"],
                        CQ.wcm.SiteAdmin.COLUMNS["locked"],
                        CQ.wcm.SiteAdmin.COLUMNS["liveCopyStatus"]
                   ],
                  "defaultSortable": true
                }
            }
        });

        // set up grid configs
        this.lastClickedRow = -1;
        var gridCfgs = {};
        for (var name in config.grid) {
            if (!config.grid[name].pathRegex) {
                // reject grid configs without pathRegex
                // to avoid overriding default config
                continue;
            }
            gridCfgs[name] = config.grid[name];
            if (name != "pages") {
                // fill missing options with defaults
                gridCfgs[name] = CQ.Ext.applyIf(gridCfgs[name], config.grid["pages"]);
            }
            if (gridCfgs[name].pageSize == undefined) {
                gridCfgs[name].pageSize = CQ.themes.wcm.SiteAdmin.GRID_PAGE_SIZE;
            }
            if (gridCfgs[name].pageText == undefined) {
                gridCfgs[name].pageText = CQ.themes.wcm.SiteAdmin.GRID_PAGE_TEXT;
            }
            gridCfgs[name].storeConfig = CQ.Util.applyDefaults(config.store, {
                "autoLoad":false,
                "remoteSort":true,
                "listeners":gridCfgs[name].storeListeners,
                "proxy": new CQ.Ext.data.HttpProxy({
                    "api": {
                        "read": {
                            "url":gridCfgs[name].storeProxyPrefix,
                            "method":"GET"
                        }
                    }
                }),
                "reader": new CQ.Ext.data.JsonReader({
                    "totalProperty": gridCfgs[name].storeReaderTotalProperty,
                    "root": gridCfgs[name].storeReaderRoot,
                    "id": gridCfgs[name].storeReaderId,
                    "fields": gridCfgs[name].storeReaderFields
                }),
                "baseParams": {
                    "start":0,
                    "limit":gridCfgs[name].pageSize,
                    "predicate":gridCfgs[name].storePredicate
                }
            });
            gridCfgs[name].colModelColumns = new Array();
            for (var i = 0; i < gridCfgs[name].columns.length; i++) {
                var c = gridCfgs[name].columns[i];
                var pref = null;
                if (typeof c == "string") {
                    pref = c;
                } else if (typeof c == "object") {
                    if (c.usePredefined) {
                        pref = c.usePredefined;
                    }
                    if (c.editor) {
                        if (typeof c.editor == "string") {
                            try {
                                eval("c.editor = " + c.editor + ";");
                            } catch (e) { }
                        }
                        try {
                            c.editor = c.editor.cloneConfig();
                        } catch (e) { }
                    }

                    // #33555 - Site Admin: vulnerable to XSS
                    CQ.shared.XSS.updatePropertyName(c, "dataIndex");
                }

                if (pref && CQ.wcm.SiteAdmin.COLUMNS[pref]) {
                    var prefCfg = CQ.Util.copyObject(CQ.wcm.SiteAdmin.COLUMNS[pref]);
                    // overlay config options
                    for (var prop in c) {
                        if (prop == "usePredefined") continue;
                        prefCfg[prop] = c[prop];
                    }
                    gridCfgs[name].colModelColumns.push(prefCfg);
                } else {
                    gridCfgs[name].colModelColumns.push(c);
                }
            }
        }

        this.debug = config.debug;
        var id = config.id;

        var body = CQ.Ext.getBody();
        body.setStyle("margin", "0");
        if (CQ.Ext.isIE) {
            body.dom.scroll = "no";
        }
        else {
            body.setStyle("overflow", "hidden");
        }

        // actions
        this.actions = [];
        this.checkedActions = [];
        var gridContextActions = [];

        // add global actions
        this.actions.push({
            "id":id + "-grid-refresh",
            "iconCls":"cq-siteadmin-refresh",
            "handler": this.reloadPages,
            "scope":this,
            "tooltip": {
                "title": id == "cq-damadmin" ? CQ.I18n.getMessage("Refresh Asset List") : CQ.I18n.getMessage("Refresh Page List"),
                "text": id == "cq-damadmin" ? CQ.I18n.getMessage("Refreshs the list of assets") : CQ.I18n.getMessage("Refreshs the list of pages"),
                "autoHide":true
            }
        });

        // add custom actions
        this.actions.push("-");
        this.actions = this.actions.concat(
                this.formatActions(config.actions, gridContextActions));

        this.actions.push("->");

        // add search
        if (!config.noSearch) {
            config.search = CQ.Util.applyDefaults(config.search, {
                "id": id + "-search",
                "triggerClass" :"x-form-search-trigger " + id + "-search-trigger",
                "listeners": {
                    "select": function(combo, record, index) {
                        var parent = record.id.substring(0, record.id.lastIndexOf("/"));
                        admin.loadPath(parent, record.id);
                    }
                }
            });
            if (typeof config.search.listeners.select != "function") {
                config.search.listeners.select = eval(config.search.listeners.select);
            }
            var search = new CQ.form.SearchField(config.search);
            this.actions.push(search);
        }

        // #20668 - add help
        var helpConfig = CQ.wcm.HelpBrowser.createHelpButton();
        helpConfig.id = id + "-help"
        this.actions.push(helpConfig);

        var autoExpandMax = config.treeAutoExpandMax || CQ.TREE_AUTOEXPAND_MAX;

        // tree config
        var treeLdrCfg = CQ.Util.applyDefaults(config.treeLoader, {
            "requestMethod":"GET",
            "dataUrl":"/bin/wcm/siteadmin/tree.json",
            "baseParams": {
                "ncc":autoExpandMax,
                "_charset_": "utf-8"
            },
            "baseAttrs": {
                "autoExpandMax":autoExpandMax,
                "singleClickExpand":true
                //"draggable":false,
                //"allowDrop":false,
//                "iconCls":"folder"
            },
            "listeners": {
                "beforeload": function(loader, node) {
                    this.baseParams.path = node.getPath();
                }
            },
            createNode : function(attr) {
                if (this.baseAttrs) {
                    CQ.Ext.applyIf(attr, this.baseAttrs);
                }

                if (attr.type == "cq:Page") {
                    attr.iconCls = "page";

                    if( attr.isLiveCopy) {
                        attr.iconCls = "livecopypage";
                    }
                }
                else if (/.*[fF]older/.test(attr.type)) {
                    // all types ending with "folder", e.g. "sling:Folder", "nt:folder"
                    attr.iconCls = "folder";
                }
                else if (attr.cls) {
                    attr.iconCls = attr.cls;
                }

                if (this.applyLoader !== false) {
                    attr.loader = this;
                }
                if (typeof attr.uiProvider == 'string') {
                    attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
                }

                // ATM we only allow DD for pages
                if (attr.type && attr.type == "cq:Page") {
                    //attr.draggable = true;
                    //attr.allowDrop = true;

                    // HACK (part 1): this hack is necessary to allow
                    // dropping pages on other leaf pages
                    if (attr.leaf) {
                        delete attr.leaf;
                        attr.children = [];
                        attr.expanded = true;
                    }
                }
                var node;
                if (attr.leaf) {
                    node = new CQ.Ext.tree.TreeNode(attr);
                } else {
                    node = new CQ.Ext.tree.AsyncTreeNode(attr);

                    // HACK (part 2): need to removed fake child attributes to get
                    // child node updates upon refresh after a node was moved to a leaf
                    node.on("move", function(tree, node, oldParent, newParent, index) {
                        if (newParent.attributes.children &&
                            (newParent.attributes.children.length == 0)) {
                            delete newParent.attributes.children;
                        }
                    });
                }
                node.on("dblclick", function(node, evt) {
                    CQ.wcm.SiteAdmin.openPage.call(admin, node.getPath(), node.attributes.type, evt.shiftKey);
                    evt.stopEvent();
                });
                return node;
            }
        });
        this.treeRootCfg = CQ.Util.applyDefaults(config.treeRoot, {
            "name":"content",
            "text":CQ.I18n.getMessage("Websites"),
            "draggable":false,
            //"allowDrop":false,
            "expanded":true,
            "iconCls":"file"
        });

        // look for anchor and clear existing tree state if present
        var anchor = CQ.HTTP.getAnchor(document.location.href);
        if (anchor) {
            var state = CQ.Ext.state.Manager.get(id + "-tree");
            if (state) {
                CQ.Ext.state.Manager.set(id + "-tree", state.width ?
                        { width:state.width } : {});
            }
        }

        this.pagingToolbar = new CQ.Ext.PagingToolbar({
            pageSize: CQ.themes.wcm.SiteAdmin.GRID_PAGE_SIZE,
            store: null,
            displayInfo: true,
            displayMsg: "",
            emptyMsg: "",
            beforePageText : CQ.I18n.getMessage("Page"),
            afterPageText : CQ.I18n.getMessage("of {0}"),
            firstText : CQ.I18n.getMessage("First Page"),
            prevText : CQ.I18n.getMessage("Previous Page"),
            nextText : CQ.I18n.getMessage("Next Page"),
            lastText : CQ.I18n.getMessage("Last Page"),
            refreshText : CQ.I18n.getMessage("Refresh")
        });

        // the panel holding the tree and the grid
        var consolePanel = {
            "id":id + "-wrapper",
            "cls":"cq-siteadmin-wrapper",
            "xtype":"panel",
            "layout":"border",
            "border":false,
            "items": [
                {
                    "xtype":"treepanel",
                    "id":id + "-tree",
                    "cls":"cq-siteadmin-tree",
                    "region":"west",
                    "margins":"5 0 5 5",
                    "width": CQ.themes.wcm.SiteAdmin.TREE_WIDTH,
                    "autoScroll":true,
                    "containerScroll":true,
                    "collapsible":true,
                    "collapseMode":"mini",
                    "hideCollapseTool": true,
                    "animate":true,
                    "split":true,
                    "stateful":true,
                    "enableDD":true,
                    "ddScroll":false,
                    "ddGroup":CQ.wcm.SiteAdmin.DD_GROUP_TREE,
                    "loader": new CQ.Ext.tree.TreeLoader(treeLdrCfg),
                    "root": new CQ.Ext.tree.AsyncTreeNode(this.treeRootCfg),
                    "tbar": [
                        {
                            "id":id + "-tree-refresh",
                            "iconCls":"cq-siteadmin-refresh",
                            "handler":function() {
                                admin.mask();
                                CQ.Ext.getCmp(id + "-tree").getRootNode().reload();
                                admin.loadPath();
                            },
                            "tooltip": {
                                "title":CQ.I18n.getMessage("Refresh Page Tree"),
                                "text":CQ.I18n.getMessage("Refreshs the page tree"),
                                "autoHide":true
                            }
                        }
                    ],
                    "listeners": {
                        "beforemovenode": function(tree, node, oldParent, newParent, index) {
                            if (admin.liveCopyNode) {
                                return admin.performLiveCopy(tree, node, oldParent, newParent, index);
                            } else {
                                if (admin.copyNode) {
                                    return admin.performCopy(tree, node, oldParent, newParent, index);
                                } else {
                                    if (admin.performMoveOrReorder(tree, node, oldParent, newParent, index)) {
                                        // move without heavy move dialog
                                        admin.performAfterMoveOrReorder(tree, node, oldParent, newParent, index);
                                    }
                                    return false;
                                }
                            }
                        },
                        "movenode": function(tree, node, oldParent, newParent, index) {
                            if (admin.copyNode || admin.liveCopyNode) {
                                admin.performAfterCopy(tree, node, oldParent, newParent, index);
                            }
                        },
                        "beforenodedrop": function(dropEvent) {
                            var isCtrl = dropEvent.rawEvent.browserEvent.ctrlKey;
                            var isShift = dropEvent.rawEvent.browserEvent.shiftKey;
                            // Restrict live copy to pages
                            // If key combination should provide a live copy, but the node to copy is not a cq:Page,
                            // a normal copy will be performed (it does not make sense to make a live copy for an asset)
                            var isPage = false;
                            try {
                                isPage = CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-tree").getSelectionModel().getSelectedNode().attributes.type == "cq:Page";
                            } catch (e) {}
                            admin.copyNode = isCtrl && (!isShift || !isPage);
                            admin.liveCopyNode = isCtrl && isShift && isPage;
                        }
                        // todo: select root node if no selection via anchor or cookie
                    }
                },{
                    "xtype": "siteadmingrid",
                    "id":id + "-grid",
                    "region":"center",
                    "enableDragDrop":true,
                    "ddGroup":CQ.wcm.SiteAdmin.DD_GROUP_GRID,
                    "ddText": CQ.I18n.getMessage("Reordering..."),
                    "tbar":this.actions,
                    "bbar":this.pagingToolbar,
                    "contextActions": gridContextActions,
                    "admin": this,
                    "listeners":{
                    	"render": function(grid) {
                            admin.hidePagingToolbar();
                            grid.getSelectionModel().on("selectionchange",
                                function(sm) {
                                    // enable/disable toolbar items
                                    var sel = sm.getSelections();
                                    for (var i = 0; i < sel.length; i++) {
                                        admin.typeCache[sel[i].id] = sel[i].get("type");
                                    }

                                    // check if selection can be published to Scene7
                                    admin.updateS7PublishCapability(sel);

                                    //slightly defer because it will send a request that might take some time
                                    //and this time seems to break the event handling (click) which comes after
                                    admin.checkActions.defer(200, admin);
                                }
                            );

                            ////////////////////////////////////////////////////
                            // html5 drag drop from filesystem demohack

                            var grd = document.getElementById(grid.id);
                            var addEvent = grd.addEventListener;
                            if (!addEvent) {
                                addEvent = grd.attachEvent;
                            }
                            if (grd.addEventListener) {
                                try {
                                    grd.addEventListener("dragover", function(e) {
                                        // todo: filter out non dam files
                                        grid.isDragOver = true;
                                        if (!grid.hasDragMask) {
                                            if (CQ.User.getCurrentUser().hasPermissionOn("create", admin.getCurrentPath())) {
                                                grid.el.mask(CQ.I18n.getMessage("Drop file(s) to create assets"), "x-mask-loading cq-mask-drop-ok");
                                                grid.dropDenied = false;
                                            }
                                            else {
                                                grid.el.mask(CQ.I18n.getMessage("No permissions to create assets"), "x-mask-loading cq-mask-drop-no");
                                                grid.dropDenied = true;
                                            }
                                            grid.hasDragMask = true; // required to avoid flickering in Safari
                                        }
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();
                                        return false;
                                    }, false);

                                    grd.addEventListener("dragleave", function(e) {
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();

                                        grid.isDragOver = false;
                                        window.setTimeout(function() {
                                            // timeout is required - otherwise drop event is not triggered
                                            if (!grid.isDragOver) {
                                                grid.el.unmask();
                                                grid.hasDragMask = false;
                                            }
                                        }, 1);
                                        return false;
                                    }, false);

                                    grd.addEventListener("drop", function(e) {
                                        if (e.stopPropagation) e.stopPropagation();
                                        if (e.preventDefault) e.preventDefault();

                                        // required in Safari to unmask (FF does it in the timeout in dragleave)
                                        grid.el.unmask();
                                        grid.hasDragMask = false;

                                        if (grid.dropDenied) return false;

                                        var dt = e.dataTransfer;
                                        if (dt) {
                                            var files = dt.files;
                                            try {
                                                admin.html5UploadFiles(files);
                                            } catch (f) {
                                                //console.log(f);
                                            }
                                        }
                                        return false;
                                    }, false);
                                } catch(e){
                                    if (console) console.log(e);
                                }
                            }
                            ////////////////////////////////////////////////////

                            // bottom margin to allow reordering at the end of the list
                            grid.getView().mainBody.setStyle("padding-bottom","22px");

                            try {
                                var ddrow = new CQ.Ext.dd.DropZone(grid.getView().mainBody, {
                                    ddGroup : CQ.wcm.SiteAdmin.DD_GROUP_GRID,
                                    copy:false,
                                    notifyDrop : function(dd, e, data) {
                                        var sm = grid.getSelectionModel();
                                        var rows = sm.getSelections();
                                        var cindex = dd.getDragData(e).rowIndex;
                                        var ds = grid.store;
                                        if (!this.isDropAllowed(e)) {
                                            return false;
                                        }
                                        var toReorder = [];
                                        for (i = 0; i < rows.length; i++) {
                                            toReorder.push(rows[i].id);
                                        }
                                        var message;
                                        var targetId;
                                        if (cindex != undefined) {
                                            var targetRow = ds.getAt(cindex);
                                            var name = targetRow.id.substring(targetRow.id.lastIndexOf("/") + 1);
                                            try {
                                                var cm = grid.getColumnModel();
                                                if (!cm.isHidden(cm.getIndexById("title"))) {
                                                    // use title if title column is displayed, otherwise name
                                                    if (targetRow.data.type == "cq:Page") {
                                                        name = targetRow.data.title ? targetRow.data.title : name;
                                                    }
                                                }
                                            }
                                            catch (e) {}
                                            message = CQ.I18n.getMessage("Are you sure you want to place the selected item(s) before {0}?", "\"" + CQ.shared.XSS.getXSSValue(name) + "\"");
                                            targetId = targetRow.id;
                                        } else {
                                            message = CQ.I18n.getMessage("Are you sure you want to place the selected item(s) at the bottom?");
                                            targetId = "";
                                        }
                                        CQ.Ext.Msg.confirm(
                                            CQ.I18n.getMessage("Reorder items"),
                                            message,
                                            function(btn) {
                                                if (btn == 'yes') {
                                                    admin.mask();
                                                    for (var i = 0; i< toReorder.length; i++) {
                                                        admin.performReorder(toReorder[i], targetId);
                                                    }
                                                    grid.getStore().reload({
                                                        "callback": function() {
                                                            admin.unmask();
                                                        }
                                                    });
                                                    sm.selectRecords(rows);
                                                }
                                                else {
                                                    sm.selectRecords(rows);
                                                }
                                            }
                                        );
                                        return true;
                                    },
                                    notifyOver : function(dd, e, data) {
                                        return this.isDropAllowed(e) ? this.dropAllowed : this.dropNotAllowed;
                                    },
                                    isDropAllowed: function(e) {
                                        var t = CQ.Ext.lib.Event.getTarget(e);
                                        var rowIndex = grid.getView().findRowIndex(t);
                                        return grid.selectedIndices.indexOf(rowIndex) == -1;
                                    }
                                });
                            } catch(e) {
                                // ignore. just catch in order to make sure that
                                // the admin does not break at all
                            	if(console) console.log(e)
                            }
                            if (grid.getView().dragZone) {
                                grid.getView().dragZone.onBeforeDrag = function(e) {
                                    var sortState = grid.getStore().getSortState();
                                    if (!sortState || (sortState.field == "index" && sortState.direction == "ASC")) {
                                        var sels = grid.getSelectionModel().getSelections();
                                        grid.selectedIndices = [];
                                        for (var i = 0; i < sels.length; i++) {
                                            grid.selectedIndices.push(grid.getStore().indexOf(sels[i]));
                                        }
                                        return true;
                                    } else {
                                        return false;
                                    }
                                };
                            }
                        }
                    }
                }
            ]
        };

        var centerPanel;

        if (config.tabTitle || config.tabs) {
            consolePanel.title = config.tabTitle ? CQ.I18n.getVarMessage(config.tabTitle) : CQ.I18n.getMessage("Console");

            var items = [consolePanel];

            if(config.tabs) {
	            for(var i=0; i<config.tabs.length; i++) {
	            	items.push(CQ.Util.applyDefaults(config.tabs[i], {"admin": this}));
	            }
            }

            centerPanel = {
                "activeTab": 0,
                "region": "center",
                "id": id + "-tabpanel",
                "xtype": "tabpanel",
                "cls": "cq-siteadmin-tabpanel",
                "border": false,
                "enableTabScroll": true,
                "items": items,
                "listeners": {
                    "tabchange": function(panel, tab) {
                        if (tab.path) {
                            // asset tab
                            admin.tabPath = tab.path;
                            admin.setDocumentTitle(tab.path.substring(tab.path.lastIndexOf("/") + 1));
                            CQ.Ext.History.add(tab.path, true);
                        }
                        else if (tab.treePath) {
                        	// admin tab
                            admin.tabPath = "";
                            var title = admin.treePath ? admin.treePath.substring(admin.treePath.lastIndexOf("/") + 1) : "";
                            admin.setDocumentTitle(title);
                            if (admin.treePath) {
                                // avoid history entry on initial tabchange where treePath is undefined
                                CQ.Ext.History.add(admin.treePath, true);
                            }
                        }
                        else if(tab.performSearch) {
                            //search tab
                        	tab.reloadPages();
                        }
                    }
                }
            };
        }
        else {
            consolePanel.region = "center";
            centerPanel = consolePanel;
        }

        // init component by calling super constructor
        CQ.wcm.SiteAdmin.superclass.constructor.call(this, {
            "id":id,
            "layout":"border",
            "renderTo":CQ.Util.ROOT_ID,
            "gridConfig": gridCfgs,
            "items": [
                {
                    "id":"cq-header",
                    "xtype":"container",
                    "cls": id + "-header",
                    "autoEl":"div",
                    "region":"north",
                    "items": [
                        {
                            "xtype":"panel",
                            "border":false,
                            "layout":"column",
                            "cls": "cq-header-toolbar",
                            "items": [
                                new CQ.Switcher({}),
                                new CQ.UserInfo({}),
                                new CQ.HomeLink({})
                            ]
                        }
                    ]
                },
                centerPanel
            ]
        });

        //HACK: overwrite tree drop zone for visual distinction of move & copy
        var tree = CQ.Ext.getCmp(id + "-tree");
        tree.dropZone.onNodeOver = function(n, dd, e, data) {
            var pt = this.getDropPoint(e, n, dd);
            var node = n.node;

            // auto node expand check
            if (!this.expandProcId && pt == "append" && node.hasChildNodes() && !n.node.isExpanded()) {
                this.queueExpand(node);
            } else if (pt != "append") {
                this.cancelExpand();
            }

            // set the insert point style on the target node
            var returnCls = this.dropNotAllowed;
            if (this.isValidDropPoint(n, pt, dd, e, data)) {
                if (pt) {
                    var el = n.ddel;
                    var cls;
                    if (pt == "above") {
                        if (n.node.isFirst()) {
                            returnCls = e.browserEvent.ctrlKey ? "x-tree-drop-ok-copy" : "x-tree-drop-ok-above";
                        } else {
                            returnCls = e.browserEvent.ctrlKey ? "x-tree-drop-ok-copy" : "x-tree-drop-ok-between";
                        }
                        cls = "x-tree-drag-insert-above";
                    } else if (pt == "below") {
                        if (n.node.isLast()) {
                            returnCls = e.browserEvent.ctrlKey ? "x-tree-drop-ok-copy" : "x-tree-drop-ok-below";
                        } else {
                            returnCls = e.browserEvent.ctrlKey ? "x-tree-drop-ok-copy" : "x-tree-drop-ok-between";
                        }
                        cls = "x-tree-drag-insert-below";
                    } else {
                        returnCls = e.browserEvent.ctrlKey ? "x-tree-drop-ok-copy" : "x-tree-drop-ok-move";
                        cls = "x-tree-drag-append";
                    }
                    if (this.lastInsertClass != cls) {
                        CQ.Ext.fly(el).replaceClass(this.lastInsertClass, cls);
                        this.lastInsertClass = cls;
                    }
                }
            }
            return returnCls;
        };

        // Bug 30225: TreeDragZone.beforeInvalidDrop() attempts to scroll the original position back into view
        // by deselecting and then reselecting the drag node.  However, that fires a pair of selectionchange events,
        // which cause us to reload the grid.  This version uses a smaller hammer.
        tree.dragZone.beforeInvalidDrop = function() {
            this.dragData.node.ui.focus();
        };

        // init history, check for anchor and open tree
        new CQ.Ext.form.Hidden({
            "id":CQ.Ext.History.fieldId,
            "renderTo":CQ.Util.ROOT_ID
        });
        var historyFrame = document.createElement("iframe");
        historyFrame.id = CQ.Ext.History.iframeId;
        historyFrame.src = CQ.Ext.SSL_SECURE_URL;
        historyFrame.className = "x-hidden";
        historyFrame.frameBorder = "0";
        historyFrame.border = "0";
        new CQ.Ext.Element(historyFrame).appendTo(CQ.Util.getRoot());

        CQ.Ext.History.init();
        CQ.Ext.History.on("change", function(token) {
            var current = admin.getCurrentPath();
            if (admin.id == "cq-damadmin") {
                // check if token is a tree node (direcotry) or an asset
                var tree = CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-tree");
                var isTreeNode = false;
                tree.selectPath(token, "name",
                    function(success) {
                        if (success) isTreeNode = true;
                    }
                );

                var tabPanel = CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-tabpanel");

                if (isTreeNode) {
                    // token is directory: => open admin tab
                    tabPanel.setActiveTab(admin.id + "-wrapper");
                }
                else {
                    // token is asset => open asset
                    var id = CQ.DOM.encodeId(token);
                    var editor = CQ.Ext.getCmp(id);
                    if (editor) {
                        // asset is already open: switch to tab
                        tabPanel.setActiveTab(editor);

                    }
                    else {
                        // asset is not open: load path in tree and open asset
                        admin.loadPath(token);
                        tabPanel.setActiveTab(admin.id + "-wrapper");
                    }
                }
            }
            else {
                if (token != current) {
                    admin.loadPath(token);
                }
            }
        });

        if (anchor) {
            admin.loadPath(decodeURI(anchor));
        }
        window.CQ_SiteAdmin_id = id;

        // stop editing when window loses focus
        CQ.Ext.EventManager.on(window, "blur", function() {
            window.setTimeout(function() {
            	CQ.Ext.getCmp(id + "-grid").stopEditing(true);
            },500);
        });

        this.typeCache = {};
    },

    initComponent : function() {
        CQ.wcm.SiteAdmin.superclass.initComponent.call(this);

        var admin = this;
        CQ.Ext.getCmp(admin.id + "-tree").getSelectionModel().on(
            "selectionchange",
            function(selModel, node) {
                if (node) {
                    var path = node.getPath();
                    admin.loadPages(node);
                    CQ.Ext.History.add(path, true);
                    admin.setDocumentTitle(node.text);
                    if (node.attributes && node.attributes.type) {
                        admin.typeCache[path] = node.attributes.type;
                    }
                    admin.checkActions();
                }
            }
        );
    },

    setDocumentTitle: function(text) {
        var t = this.title;
        if (text) t += " | " + text;
        document.title = t;
    },

    /**
     * Returns the node or resource type of the node at the specified path.
     * @param {String} path The path
     * @return {String} The type
     */
    getType: function(path) {
        if (!this.typeCache[path]) {
            var info = CQ.HTTP.eval(path + ".json");
            if (info) {
                this.typeCache[path] = info["jcr:primaryType"];
            }
        }
        return this.typeCache[path];
    },

    copySelectionToClipboard: function() {
        this.copyClipboard = new Array();

        var selections = this.getSelectedPages();
        for (var i=0; i<selections.length; i++) {
            this.copyClipboard.push(selections[i].id);
        }
        this.checkActions();
    },

    hasClipboardSelection: function() {
        return ((this.copyClipboard != null) && (this.copyClipboard.length > 0));
    },

    pasteFromClipboard: function(shallowPaste) {
        this.mask();
        var target = CQ.wcm.SiteAdmin.getTargetFromTree();
        for (var i=0; i<this.copyClipboard.length; i++) {
            var params = "cmd=copyPage"
                + "&_charset_=utf-8"
                + "&srcPath=" + encodeURIComponent(this.copyClipboard[i])
                + "&destParentPath=" + encodeURIComponent(target)
                + "&before=";
            if( shallowPaste) params += "&shallow=true";
            var response = CQ.HTTP.post("/bin/wcmcommand?" + params);
        }
        this.reloadCurrentTreeNode();
    },

    performCopy: function(tree, node, oldParent, newParent, index) {
        // need to execute this request synchronous to prevent
        // nodes from being moved if the request fails
        this.mask();

        var params = "cmd=copyPage"
                + "&_charset_=utf-8"
                + "&srcPath=" + encodeURIComponent(node.getPath())
                + "&destParentPath=" + encodeURIComponent(newParent.getPath());

        if (newParent.childNodes[index]) {
            params += "&before=" + newParent.childNodes[index].getPath();
        } else {
            // send empty 'before' param to append page at the end of the list
            params += "&before=";
        }
        var response = CQ.HTTP.post("/bin/wcmcommand?" + params);

        var ok = response.headers.Status && response.headers.Status == "200";
        if (!ok) this.unmask();
        return ok;
    },

    performLiveCopy: function(tree, node, oldParent, newParent, index) {
        this.mask();

        var page = CQ.WCM.getPage(newParent.getPath());

        var srcPath = CQ.HTTP.encodePath(node.getPath());
        var destParentPath = CQ.HTTP.encodePath(newParent.getPath());

        var before = null;
        if (newParent.childNodes[index]) {
            before= newParent.childNodes[index].getPath();
        }
        var response = CQ.wcm.msm.MSM.Commands.createLiveCopy(srcPath, destParentPath, before, null, false, null, function() {
            this.unmask();
        }, this);

        return true;
    },

    performAfterCopy: function(tree, node, oldParent, newParent, index) {
        var admin = this;
        //TODO find better way to reproduce old node (eg add as child again)
        window.setTimeout(function() {
            tree.getLoader().load(oldParent, function() {
                oldParent.expand();
                oldParent.select();
            });
            CQ.Ext.getCmp(admin.id + "-grid").getStore().reload();
        }, 10);
    },

    performAfterMoveOrReorder: function(tree, node, oldParent, newParent, index) {
        var admin = this;
        window.setTimeout(function() {
            var oldPath = oldParent.getPath();
            var newPath = newParent.getPath();
            if (newParent.parentNode) {
                // in order to extend nodes that had no sub nodes before it is necessary
                // that the new grand parent is reloaded
                var newGrandPath = newParent.parentNode.getPath();

                var nodes; // nodes to be reloaded

                if (oldPath.split("/").length > newGrandPath.split("/").length &&
                    oldPath.indexOf(newGrandPath) == 0) {

                    // old inside new: reload only new
                    nodes = [newParent.parentNode];
                }
                else if (newGrandPath.indexOf(oldPath) == 0) {
                    // new inside old or the same: reload only old
                    nodes = [oldParent];
                }
                else {
                    // old and new in different branches: reload both
                    nodes = [newParent.parentNode, oldParent];
                }

                var p = node.getPath();
                var name = p.substring(p.lastIndexOf("/") + 1);
                var callback = function(reloadedNode) {
                    reloadedNode.un("expand", callback);
                    window.setTimeout(function(){
                        admin.loadPath(newPath + "/" + name);
                    }, 10);
                };
                nodes[0].on("expand", callback);

                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].reload();
                }
            } else {
                newParent.getOwnerTree().getRootNode().reload();
                admin.loadPath(newParent.getPath());
            }

        }, 10);
    },

    performMoveOrReorder: function(tree, node, oldParent, newParent, index) {
        // need to execute this request synchronous to prevent
        // nodes from being moved if the request fails
        this.mask();

        var admin = this;
        var path = node.getPath().split("/");
        var name = encodeURIComponent(path[path.length - 1]);
        var srcPath = encodeURIComponent(node.getPath());
        var dstParentPath = encodeURIComponent(newParent.getPath());
        var params = "cmd=movePage"
                + "&_charset_=utf-8"
                + "&srcPath=" + srcPath
                + "&destPath=" + dstParentPath + "/" + name
        if (newParent.childNodes[index]) {
            params += "&before=" + encodeURIComponent(newParent.childNodes[index].getPath());
        } else {
            // send empty 'before' param to move page to the end of the list
            params += "&before=";
        }
        var response = CQ.HTTP.post("/bin/wcmcommand?" + params);

        var status = "500";
        if (response.headers.Status) {
            status = response.headers.Status;
        }
        if (status == "200") {
            return true;
        } else if (status == "412") {
            // precondition failed - open heavy move dialog
            var data = {
                path: srcPath,
                dstName: name,
                dstParentPath: dstParentPath
            };
            var dialog = new CQ.wcm.HeavyMoveDialog(data);
            dialog.on("beforesubmit", function(){admin.mask();});
            dialog.success = function() {
                admin.performAfterMoveOrReorder(tree, node, oldParent, newParent, index);
            };
            this.unmask();
            dialog.show();
        } else {
            // something went wrong
            this.unmask();
        }
        return false;
    },

    performReorder: function(path,before) {
        if (path == before) return;
        if (before == undefined) {
            before = "";
        }
        var pathEnc = encodeURIComponent(path);
        var params = "cmd=movePage"
                + "&_charset_=utf-8"
                + "&srcPath=" + pathEnc
                + "&destPath=" + pathEnc
                + "&before=" + encodeURIComponent(before);

        var response = CQ.HTTP.post("/bin/wcmcommand?" + params);

        // create success callback
        var admin = this;
        var successHandler = function() {
            //admin.loadPath(newParent.getPath());  TODO: what to do?
        };
        var status = "500";
        if (response.headers.Status) {
            status = response.headers.Status;
        }
        if (status == "200") {
            return successHandler;
        }
        return null;
    },

    getGridConfigId: function(path) {
        if (!path) path = "/";
        var gridCfgs = this.initialConfig.gridConfig;
        var id;
        for (id in gridCfgs) {
            gridCfg = gridCfgs[id];
            if (new RegExp(gridCfgs[id].pathRegex).test(path)) {
                break;
            }
        }
        if (!id) id = "pages";
        return id;
    },

    getGridConfig: function(path) {
        var gridCfgs = this.initialConfig.gridConfig;
        var id = this.getGridConfigId(path);
        if (id) {
            return gridCfgs[id];
        } else {
            return null;
        }
    },

    reconfigureGrid: function(grid, path) {
        grid.inProgress = [];
        var gridCfg = this.getGridConfig(path);
        if (!gridCfg) {
            // should actually never happen, but just in case
            return grid.getStore();
        }
        if (!gridCfg.inited) {
            gridCfg.store = new CQ.Ext.data.Store(gridCfg.storeConfig);
            gridCfg.store.on("beforeload", function() {
//                console.log(grid.inProgress.length, "reset queue");
                grid.inProgress = [];
                var path = grid.admin.treePath;
                if(path.match("^/etc/commerce/products/[^/]+")){ //Oakwood POC
                	gridCfg.store.baseParams.predicate="unstructured";
                }else{
                	gridCfg.store.baseParams.predicate="siteadmin";
                }
            });
            gridCfg.colModel = new CQ.Ext.grid.ColumnModel({
                "columns": gridCfg.colModelColumns,
                "defaults": {
                    "sortable": true
                }
            });
            gridCfg.colModel.on("hiddenchange", function(cm, index, hidden) {
                // make sure grid state is saved when columns are hidden or shown
                grid.saveState();
                if (!hidden && cm.getColumnById(cm.getColumnId(index)).refreshOnHiddenchange) {
                    // refresh thumbnail column when shown
                    grid.getView().refresh(true);
                }

            });
            gridCfg.inited = true;
        }
        // update store url
        var url = gridCfg.storeProxyPrefix + CQ.shared.HTTP.encodePath(path) +
                               gridCfg.storeProxySuffix;

        gridCfg.store.proxy.api["read"].url = url;
        // forget last options
        if (gridCfg.store.lastOptions) {
            delete gridCfg.store.lastOptions;
        }

        // setup paging toolbar
        this.pagingToolbar.bindStore(gridCfg.store);
        this.pagingToolbar.pageSize = gridCfg.pageSize;
        this.pagingToolbar.displayMsg = gridCfg.pageText;

        // check if grid needs to be reconfigured
        if (gridCfg.pathRegex != this.lastGridPathRegex) {
            grid.reconfigure(gridCfg.store, gridCfg.colModel);
            var id = this.getGridConfigId(this.treePath);
            grid.stateId = grid.id + "-" + id;
            grid.initState();
            this.lastGridPathRegex = gridCfg.pathRegex;
            gridCfg.store.removeAll();
        }
        return gridCfg.store;
    },

    showPagingToolbar: function() {
        if (this.pagingToolbar.hidden) {
            this.pagingToolbar.show();
            this.pagingToolbar.ownerCt.doLayout();
        }
    },

    hidePagingToolbar: function() {
        if (!this.pagingToolbar.hidden) {
            this.pagingToolbar.hide();
            this.pagingToolbar.ownerCt.doLayout();
        }
    },

    checkPagingToolbar: function(total) {
        if (total <= this.pagingToolbar.pageSize) {
            this.hidePagingToolbar();
        } else {
            this.showPagingToolbar();
        }
    },

    reloadPages: function() {
        this.mask();
        var store = CQ.Ext.getCmp(this.id + "-grid").getStore();
        store.reload({
            "callback": function() {
                this.checkPagingToolbar(store.getTotalCount());
                this.unmask();
            },
            "scope": this
        });
    },

    loadPages: function(node, selectRecord) {
        this.mask();
        this.lastClickedRow = -1;
        var path = node.getPath();
        this.treePath = path;
        this.treePathEncoded = CQ.HTTP.encodePath(path);
        var grid = CQ.Ext.getCmp(this.id + "-grid");
        var store = this.reconfigureGrid(grid, this.treePath);
        var id = this.id;
        var admin = this;
        store.reload({
            callback: function(records, options, success) {
                if (id == "cq-damadmin") {
                    var cookieValue = "path=" + encodeURIComponent(path) + "&p.limit=-1&mainasset=true&type=dam:Asset";
                    CQ.HTTP.setCookie("cq-mrss", cookieValue, "/bin");
                }

                var recSelected = false;
                if (selectRecord) {
                    var selModel = grid.getSelectionModel();
                    for (var i = 0; i < records.length; i++) {
                        if (records[i].id == selectRecord) {
                            selModel.clearSelections();
                            selModel.selectRecords([records[i]]);
                            recSelected = true;
                        }
                    }
                    if (id == "cq-damadmin" && selModel.hasSelection()) {
                        CQ.wcm.SiteAdmin.openPages.call(admin);
                    }
                }
                admin.checkPagingToolbar(store.getTotalCount());
                if (selectRecord && !recSelected && !admin.pagingToolbar.hidden) {
                    try {
                        var sort = grid.getStore().sortInfo;
                        var url = store.proxy.api.read.url;
                        for (var param in store.baseParams) {
                            url = CQ.HTTP.addParameter(url, param, store.baseParams[param]);
                        }
                        if (sort) {
                            url = CQ.HTTP.addParameter(url, "sort", sort.field);
                            url = CQ.HTTP.addParameter(url, "dir", sort.direction);
                        }
                        url = CQ.HTTP.addParameter(url, "index", "true");
                        url = CQ.HTTP.addParameter(url, "path", selectRecord);

                        var index = CQ.HTTP.eval(url).index + 1;
                        if (index > 0) {
                            var selectRow = function(recs) {
                                grid.getSelectionModel().selectRecords([this.getById(selectRecord)]);
                                CQ.wcm.SiteAdmin.openPages.call(admin);
                                this.un("load", selectRecord);
                            };
                            grid.getStore().on("load", selectRow);
                            admin.pagingToolbar.changePage(index);
                        }
                    } catch (e) {
                        //console.log("error:" + e);
                    }
                }
                admin.unmask();
            }
        });
    },

    loadPath: function(path, selectRecord) {
        var admin = this;
        var callback = function(success, node, selectRecord) {
            if (success) {
                this.loadPages(node, selectRecord);
                node.expand();
            }
            else {
                // path not found => load parent
                this.loadPath(this.treePath.substring(0, this.treePath.lastIndexOf("/")), this.treePath);
            }
        };

        // select tree path
        var tree = CQ.Ext.getCmp(this.id + "-tree");

        if (!path && !this.treePath) {
            this.treePath = tree.getRootNode().getPath();
            tree.selectPath(tree.getRootNode().id, "id",
                function(success, node) {
                    callback.call(admin, success, node, selectRecord);
                }
            );
        } else {
            if (path) {
                this.treePath = path;
            }
            if (this.treePath == tree.getRootNode().getPath()) {
                tree.selectPath(tree.getRootNode().id, "id",
                    function(success, node) {
                        callback.call(admin, success, node, selectRecord);
                    }
                );
            } else {
                tree.selectPath(this.treePath, "name",
                    function(success, node) {
                        callback.call(admin, success, node, selectRecord);
                    }
                );
            }
        }
    },

    reloadCurrentTreeNode: function() {
        // TODO insert new tree node directly instead of reloading parent
        var tree = CQ.Ext.getCmp(this.id + "-tree");
        var selectedNode;
        try {
            selectedNode = tree.getSelectionModel().getSelectedNode();
        } catch (e) {
        }
        if (selectedNode && selectedNode != tree.getRootNode()) {
            var selectedPath = selectedNode.getPath();
            selectedNode.parentNode.reload(function() {
                tree.selectPath(selectedPath, null, function(success, node) {
                    if (success) {
                        node.expand();
                    }
                });
            });
        } else {
            tree.getRootNode().reload();
        }
        CQ.Ext.getCmp(this.id + "-grid").getStore().reload();
        this.unmask();
    },

    /**
     * Returns the currently selected path in the tree.
     * @return {String} The current path
     */
    getCurrentPath: function() {
        var tree = CQ.Ext.getCmp(this.id + "-tree");
        var node = tree.getSelectionModel().getSelectedNode();
        if (node != null) {
            return node.getPath();
        }
    },

    /**
     * Returns the currently selected pages in the grid.
     * @return {Object[]} The selected pages
     */
    getSelectedPages: function() {

    	var gridSel = CQ.Ext.getCmp(this.id + "-grid").getSelectionModel().getSelections();

    	//use grid from active tab
    	var tabPanel = CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-tabpanel");
        if (tabPanel) {
        	var grid = CQ.Ext.getCmp(tabPanel.getActiveTab().id + "-grid");
        	if(grid) {
        		gridSel = grid.getSelectionModel().getSelections();
        	}
        }

        if (gridSel.length > 0) {
            return gridSel;
        } else if (this.treePath) {
        	var admin = this;
            var node = CQ.Ext.getCmp(this.id + "-tree").getSelectionModel().getSelectedNode();
            return [{
                "id": admin.treePath,
                "label":admin.treePath.substring(admin.treePath.lastIndexOf("/")+1),
                "replication": node && node.attributes ? node.attributes.replication : null,
                "title":node ? node.text : null,
                "type":null,
                "_displayTitle_": true,
                "get":function(name) {
                    // fake getter
                    return this[name];
                }
            }];
        } else {
            return [];
        }
    },

    /**
     * Checks the current selected items to see if they can be published to Scene7
     */
    updateS7PublishCapability : function(sel) {
        var localPublishToScene7 = false;
        if (sel) {
            for (var i = 0 ; i < sel.length ; i++) {
                var itemPath = sel[i].id;
                var itemType = sel[i].get("type");
                var checkS7ConfigRequest = false;
                if (typeof itemType != "undefined"
                    &&
                    (itemType == "dam:Asset"
                        || itemType == "sling:OrderedFolder"
                        || itemType == "sling:Folder")) {
                    checkS7ConfigRequest = true;
                }

                // see if this path is in a scene7 shared folder if the selected type is an asset or a folder
                if (checkS7ConfigRequest) {
                    var scene7ConfigJson = {};
                    var response = CQ.HTTP.get(itemPath + ".s7config.json");
                    if(CQ.utils.HTTP.isOk(response)){
                        var responseBody = response.body;
                        scene7ConfigJson = JSON.parse(responseBody);
                    }

                    if (scene7ConfigJson
                            && scene7ConfigJson.scene7ConfigPath) {
                        localPublishToScene7 = true;
                    } else {
                        localPublishToScene7 = false;
                        break;
                    }
                }
            }
        }

        this.canPublishToScene7 = localPublishToScene7;
    },

    /**
     * Masks the main panel for loading.
     */
    mask: function() {
        if (!this.loadMask) {
            this.loadMask = new CQ.Ext.LoadMask(this.id + "-wrapper", {
                "msg": CQ.I18n.getMessage("Loading...")
            });
        }
        this.loadMask.show();
    },

    /**
     * Unmasks the main panel after loading.
     */
    unmask: function(timeout) {
        if (!this.loadMask) return;
        this.loadMask.hide();
    },

    // html5 drag drop of files
    html5UploadFiles: function(files) {
        var admin = this;
        var tree = CQ.Ext.getCmp(this.id + "-tree");
        var selectedNode;
        try {
            selectedNode = tree.getSelectionModel().getSelectedNode();
        } catch (e) {
        }
        if (!selectedNode) {
            return;
        }
        var path = selectedNode.getPath();
        var parent = CQ.HTTP.eval(CQ.HTTP.noCaching(path + ".1.json"));
        
        var conflicts = [];
        for (var i = 0; i < files.length; i++) {
        	var file = files[i];
        	if (parent[file.name]) {
        		conflicts.push(file.name);
        	}
        }
        
        if (conflicts.length > 0 && this.createVersion == false) {
            var msg = conflicts.length == 1 ?
                    CQ.I18n.getMessage("An asset of the same name already exists in this location:") :
                    CQ.I18n.getMessage("Assets of the same name already exist in this location:");
            msg += "<br/><br/>";
            for (i = 0; i < conflicts.length; i++) {
                msg += CQ.shared.XSS.getXSSValue(conflicts[i]) + "<br/>";
            }
            msg += "<br/><br/>";
            msg += conflicts.length == 1 ?
                    CQ.I18n.getMessage("Click 'Create Version' to create the verison of the asset or <br/><br/> 'Replace' to replace the asset or 'Cancel' to adjust the name.") :
                    CQ.I18n.getMessage("Click 'Create Version' to create the verison of the assets or <br/><br/> 'Replace' to replace the assets or 'Cancel' to adjust the names.");
            CQ.Ext.Msg.show({
                "title":CQ.I18n.getMessage("Name Conflict"),
                "msg":msg,
                "buttons":{
                    yes:"Create Version",
                    handler:function () {


                    },
                    no:"Replace",
                    handler:function () {

                    },
                    cancel:"Cancel",
                    handler:function () {

                    }
                },
                "icon":CQ.Ext.MessageBox.QUESTION,
                "fn":function (btnId) {
                    if (btnId == "yes") {
                        this.createVersion = true;
                        this.html5UploadFiles(files);
                        this.createVersion = false;
                    } else if (btnId == "no") {
                        for (var i = 0; i < conflicts.length; i++) {
                            CQ.HTTP.post(path + "/" + CQ.shared.HTTP.encodePath(conflicts[i]), null, {
                                ":operation":"delete"
                            });
                        }
                        this.createVersion = true;
                        this.html5UploadFiles(files);   
                        this.createVersion = false;
                    } else {
                    	this.createVersion = false;
                        // mark conflicting fields invalid
                    }
                },
                "scope":this
            });
        }        		                        

        var uploader = {
            path: path,
            current:0,
            uploaded:0,
            totalSize: 0,
            files: 0,

            // Bug #33540
            // Files provided via drag&drop can be folders although they are not
            // supported for uploads. Unfortunately there is no deterministic way
            // to detect whether a file object represents a folder or not. Thus we
            // use information from size (0 or very small), type (empty) and name
            // (no extension) in a heuristical approach.
            isFile: function(file) {
                // do not upload empty files or folders
                if (file.size == 0) {
                    return false;
                }
                // small files with no type and no extension are considered folders
                if (file.size < 512 && file.type == "" && file.name.indexOf(".") < 0) {
                    return false;
                }
                return true;
            },

            upload: function(files) {
                this.files = [];
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (this.isFile(file)) {
                        // ignore folders
                        this.totalSize+=file.fileSize;
                        this.files.push(file);
                    }
                    else {
                        CQ.Notification.notify(CQ.shared.XSS.getXSSValue(file.name),
                                CQ.I18n.getMessage("It is not possible to upload folders"));
                    }

                }
                if (this.files.length == 0) {
                    return;
                }

                this.progress = new CQ.Ext.ProgressBar();
                this.mainWin = new CQ.Ext.Window({
                    width     : 400,
                    title     : "File Upload",
                    layout    : "anchor",
                    renderTo: admin.id + "-grid",
                    closable : false,
                    items     : [this.progress]
                }).show();

                this.uploadNext();
            },

            finish: function() {
                this.mainWin.close();
                this.mainWin.destroy();
                admin.reloadPages();
            },

            uploadNext: function() {
                if (this.current >= this.files.length) {
                    this.progress.updateProgress(1.0);
                    if (path.indexOf("/content/dam") == 0) {
                        // give dam some time to process files
                        new CQ.Ext.util.DelayedTask(this.finish, this).delay(1000);
                    } else {
                        this.finish();
                    }
                    return;
                }
                var file = this.files[this.current++];
                this.currentSize = file.fileSize;

                this.progress.updateProgress(this.uploaded / this.totalSize);
                var sfx = "";
                if (this.files.length > 1) {
                    sfx = " (" + this.current + "/" + this.files.length + ")";
                }
                this.progress.updateText("Uploading " + CQ.shared.XSS.getXSSValue(file.fileName) + sfx);

                // create xhr and register events
                var self = this;
                var req = new XMLHttpRequest();
                req.upload.addEventListener("load", function(evt) {
                    self.uploaded += self.currentSize;
                    self.uploadNext();
                }, false);
                req.upload.addEventListener("progress", function(evt) {
                    self.progress.updateProgress((self.uploaded+evt.loaded) / self.totalSize);
                }, false);

                if (!CQ.Ext.form.VTypes["name"](file.fileName)) {
                    // file name is not valid JCR name
                    CQ.Notification.notify(file.fileName, "<br>" + CQ.Ext.form.VTypes["nameText"]);
                    this.uploadNext();
                    return;
                }

                req.fileName = file.name; // remember file name for notification
                req.onreadystatechange=function() {
                    // upload finished: check if it was successful
                    // scope is the XHR (this is "req")
                    if (this.readyState == 4) {
                        if (!CQ.HTTP.isOkStatus(this.status)) {
                            CQ.Notification.notify(CQ.shared.XSS.getXSSValue(this.fileName), CQ.I18n.getMessage("Failed to upload asset"));
                            self.finish();
                        }
                    }
                };

                // check for form data
                if (window.FormData) {
                    var f = new FormData();
                    f.append("file", file);
                    f.append("_charset_", "utf-8");
                    req.open("POST", CQ.HTTP.externalize(CQ.HTTP.encodePath(CQ.wcm.SiteAdmin.getPostUploadUrl(path, file.name))), true);
                    req.send(f);
                } else {
                    req.open("PUT", CQ.HTTP.externalize(CQ.HTTP.encodePath(path + "/" + file.name)), true);
                    req.send(file);
                }
            }
        };

        if (conflicts.length == 0 || this.createVersion == true) {
        	uploader.upload(files);
        }
        
    }
});

CQ.Ext.reg("siteadmin", CQ.wcm.SiteAdmin);

//overrides current CQ.wcm.SiteAdmin class with methods contained in CQ.wcm.AdminBase.
CQ.Ext.override(CQ.wcm.SiteAdmin, CQ.wcm.AdminBase);


CQ.wcm.SiteAdmin.formatDate = function(date) {
    if (!date) {
        return "";
    }

    if (typeof date === "number") {
        date = new Date(date);
    }
    var fmt = CQ.I18n.getMessage("d-M-Y H:i", null, "Date format for ExtJS SiteAdmin (short, eg. two-digit year, http://extjs.com/deploy/ext/docs/output/Date.html)")
    return date.format(fmt);
};

CQ.wcm.SiteAdmin.formatRelativeDate = function(date) {
    if (typeof date === "number") {
        date = new Date(date);
    }
    var now = new Date();

    var n = parseInt((now - date) / 1000);
    var unit = "";
    if (n < 60) {
        unit = CQ.I18n.getMessage("seconds");
    } else if (n < 3600) {
        n = parseInt(n / 60);
        unit = n > 1 ? CQ.I18n.getMessage("minutes") : CQ.I18n.getMessage("minute");
    } else if (n < 86400) {
        n = parseInt(n / 3600);
        unit = n > 1 ? CQ.I18n.getMessage("hours") : CQ.I18n.getMessage("hour");
    } else if (n < 31536000) {
        n = parseInt(n / 86400);
        unit = n > 1 ? CQ.I18n.getMessage("days") : CQ.I18n.getMessage("day");
    } else {
        n = parseInt(n / 31536000);
        unit = n > 1 ? CQ.I18n.getMessage("years") : CQ.I18n.getMessage("year");
    }

    return CQ.I18n.getMessage("{0} {1} ago", [n, unit], "Relative date to the current date");
};

/**
 * Returns the 'New file' upload URL
 * @param {String} path Upload path
 * @param {String} fileName File name
 * @return {String} Upload URL
 * @since 5.5
 */
CQ.wcm.SiteAdmin.getPostUploadUrl = function(path, fileName) {
    var url = path;
    if (path.match(/^\/content\/dam.*/)) {
        url += ".createasset.html";
    } else if (fileName) {
        url += "/" + fileName;
    }
    return url;
};

// constants
CQ.wcm.SiteAdmin.DD_GROUP_TREE = "cq.siteadmin.tree";
CQ.wcm.SiteAdmin.DD_GROUP_GRID = "cq.siteadmin.grid";

CQ.wcm.SiteAdmin.TEXT_EDITOR = new CQ.Ext.form.TextField({
    "enableKeyEvents":true,
    "listeners": {
        "render": function() {
            window.CQ_TextEditor = this;
        }
    }
});

CQ.wcm.SiteAdmin.GRID_LISTENERS = {
    "beforeedit": {
        "title": function(params) {
        	 var lockedBy = params.record.data.lockedBy;
             var currentUserId = CQ.User.getUserID();
             var locked = lockedBy != undefined && lockedBy.length > 0 && lockedBy != currentUserId;
             if(locked){
                 return false;
             }
            return this.inProgress.indexOf(params.record.id) == -1;
        }
    },
    "afteredit": {
        "title": function(params) {
            if (params.originalValue == undefined) {
                params.originalValue = "";
            }
            CQ.Ext.Msg.confirm(
                CQ.I18n.getMessage("Change title"),
                CQ.I18n.getMessage("Are you sure you want to change the title from '{0}' to '{1}'?", [CQ.shared.XSS.getXSSValue(params.originalValue), CQ.shared.XSS.getXSSValue(params.value)]),
                function(btn) {
                    if (btn == 'yes') {
                        var titleProp = "./jcr:content/jcr:title";
                        if (params.record.get("type") == "dam:Asset") {
                            titleProp = "./jcr:content/metadata/dc:title";
                        }
                        var postParams = {};
                        postParams["_charset_"] = "utf-8";
                        postParams[titleProp] = params.value;

                        var response = CQ.HTTP.post(params.record.id, null, postParams);
                        if (CQ.HTTP.isOk(response)) {
                            params.record.commit();
                            try {
                                CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-tree").getSelectionModel()
                                        .getSelectedNode().reload();
                            } catch (e) { }
                        } else {
                            params.record.reject();
                        }
                    } else {
                        params.record.reject();
                    }
                },
                this
            );
        },
        "label": function(params) {
            // set new ID in page list
            var oldID = params.record.id;
            params.record.id = oldID.substring(0, oldID.lastIndexOf("/") + 1) + params.value;

            // update tree node name
            var tree = CQ.Ext.getCmp(this.id + "-tree");
            var root = tree.getRootNode();

            var node;
            var path = oldID.split("/");
            for (var i = 1; i < path.length; i++) {
                var name = path[i];
                if (name == root.attributes.name) {
                    node = root;
                } else {
                    node = node.findChild("name", name);
                }
            }
            node.attributes.name = params.value;
        }
    },
    "validateedit": {
        "label": function(params) {
            var srcPath = params.record.id;
            var dstName = params.value;
            var destPath = srcPath.substring(0, srcPath.lastIndexOf("/") + 1) + dstName;

                // send change request
            var postParams = "?cmd=movePage&_charset_=utf-8&srcPath="
                    + srcPath + "&destPath=" + destPath;
            var response = CQ.HTTP.post("/bin/wcmcommand" + postParams);
            var status = "500";
            if (response.headers.Status) {
                status = response.headers.Status;
            }
            if (status == "200") {
                return true;
            } else if (status == "412") {
                // precondition failed - open heavy move dialog
                var data = {
                    path: srcPath,
                    dstName: dstName
                };
                new CQ.wcm.HeavyMoveDialog(data).show();
                return false;
            } else {
                return false;
            }
        }
    }
};

CQ.wcm.SiteAdmin.COLUMNS = {
    "numberer": {
        "id":"numberer",
        "header":CQ.I18n.getMessage(""),
        "width":23,
        "menuDisabled":true,
        "fixed":true,
        "hideable":false,
        "dataIndex":"index",
        "renderer": function(v, params, record) {
            if (v != undefined) {
                return v + 1;
            }
            return "";
        }
    },
    "title": {
        "header":CQ.I18n.getMessage("Title"),
        "id":"title",
        "dataIndex":"title",
        "editor":CQ.wcm.SiteAdmin.TEXT_EDITOR,
        "renderer": function(val, meta, rec) {
            return CQ.shared.XSS.getXSSValue(val);
        }
    },
    "name": {
        "header":CQ.I18n.getMessage("Name"),
        "id":"name",
        "dataIndex":"label",
        "width":80,
        "renderer": function(val, meta, rec) {
        	var path = rec.id.toString()
        	var index = path.lastIndexOf("/")+1;
            return path.substring(index);
        }
    },
    "template": {
        "header":CQ.I18n.getMessage("Template"),
        "id":"template",
        "dataIndex":"templateTitle",
        "renderer":function(v, params, record) {
            var shortTitle = CQ.shared.XSS.getXSSRecordPropertyValue(record, "templateShortTitle");
            if (shortTitle.length > 0) {
                return CQ.I18n.getVarMessage(shortTitle);
            } else {
                return CQ.I18n.getVarMessage(v);
            }
        }
    },
    "published": {
        "header":CQ.I18n.getMessage("Published"),
        "id":"published",
        "dataIndex":"replication",
        "renderer": function(v, params, record) {
            var clazz = "";
            var text = "";
            var repl = record.data.replication;
            var qtip = "";
            var strOnTime = CQ.I18n.getMessage("N/A");
            var strOffTime = CQ.I18n.getMessage("N/A");

            if (repl && repl.published) {
                text = CQ.wcm.SiteAdmin.formatDate(new Date(repl.published));
                text += " (" + CQ.shared.XSS.getXSSTablePropertyValue(repl, "publishedBy") + ")";
                if (repl.numQueued) {
                    qtip = " ext:qtip=\"<nobr>";
                    if (repl.action == "ACTIVATE") {
                        clazz = "status-pending-activation";
                        qtip += CQ.I18n.getMessage("Activation pending. #{0} in Queue.", repl.numQueued);
                    } else {
                        clazz = "status-pending-deactivation";
                        qtip += CQ.I18n.getMessage("Deactivation pending. #{0} in Queue.", repl.numQueued);
                    }
                    qtip += "</nobr>\"";
                } else if (repl.action == "ACTIVATE") {
                    if (!record.data.timeUntilValid) {
                        if (!record.data.offTime){
                            clazz = 'status-activated';
                        } else {
                            clazz = 'status-offtime';
                        }
                    } else if (record.data.timeUntilValid){
                        if (record.data.offTime) {
                            clazz = "status-onofftime";
                        } else {
                            clazz = 'status-ontime';
                        }
                    }
                    else{
                        clazz = 'status-deactivated';
                    }
                } else {
                    clazz = "status-deactivated";
                }
                if(record.data.timeUntilValid && (record.data.onTime || record.data.offTime)){
                    qtip = "ext:qtip=\"<nobr>";
                    if(record.data.onTime){
                        strOnTime = CQ.wcm.SiteAdmin.formatDate(new Date(record.data.onTime));
                        qtip += "<b>"+CQ.I18n.getMessage("On Time")+":</b> "+strOnTime+"<br/>";
                    }
                    if(record.data.offTime){
                        strOffTime = CQ.wcm.SiteAdmin.formatDate(new Date(record.data.offTime));
                        qtip += "<b>"+CQ.I18n.getMessage("Off Time")+":</b> "+strOffTime+"<br/>";
                    }
                    qtip += "</nobr>\"";
                }
            } else{
                clazz = "status-none";
            }
            return "<div class=\"status double " + clazz + "\" "+qtip+"><span>" + text + "</span></div>";
        }
    },
    "modified": {
        "header":CQ.I18n.getMessage("Modified"),
        "id":"modified",
        "dataIndex":"lastModified",
        "renderer": function(v, params, record) {
            var repl = record.data.replication;
            var lastMod = record.data.lastModified;
            var text = "";
            var clazz = "";
            if (lastMod > 0) {
                text = CQ.wcm.SiteAdmin.formatDate(new Date(record.data.lastModified));
                var lastModifiedBy = CQ.shared.XSS.getXSSTablePropertyValue(record.data, "lastModifiedBy");
                if (lastModifiedBy && lastModifiedBy.length > 0) {
                    text += " (" + lastModifiedBy + ")";
                }
                clazz = "status-localmodified";
            }
            if (repl && repl.published) {
                if (repl.action == "ACTIVATE") {
                    if (lastMod > repl.published) {
                        clazz = "status-modified";
                    }
                }
            }
            if (!clazz) {
                clazz = "status-localmodified";
            }
            return "<div class=\"status " + clazz + "\">" + text + "</div>";
        }
    },
    "metadata": {
        "header": CQ.I18n.getMessage("Metadata Template Instance"),
        "id": "metadata",
        "dataIndex":"metadata",
        "renderer": function(v, params, record) {
            var tpl = record["json"]["cq:ingestionTemplateInstanceName"];
            var val = "";
            if (tpl) {
                val += tpl;
            }
            return val? val:"";
        }
    },
    "scene7Status": {
    	"header": CQ.I18n.getMessage("Scene7 Publish Status"),
    	"hidden": true,
    	"id": "scene7Status",
    	"data": "scene7Status",
    	"renderer": function(v, params, record) {
    		var clazz = "";
            var status = record.data.scene7Status;
            var qtip = "";
    		if (status) {
    			qtip = " ext:qtip=\"<nobr>";
    			if (status == "UploadStart") {
    				clazz = "status-s7-pending"
    				qtip += CQ.I18n.getMessage("Upload started");
    			} else
    			if (status == "UploadFailed") {
    				clazz = "status-s7-failed"
            		qtip += CQ.I18n.getMessage("Upload failed");
    			} else
    			if (status == "PublishStart") {
    				clazz = "status-s7-pending"
        			qtip += CQ.I18n.getMessage("Publish started");
    			} else
    			if (status == "PublishQueued") {
    				clazz = "status-s7-queued"
        			qtip += CQ.I18n.getMessage("Publish queued");
    			} else
    			if (status == "PublishFailed") {
    				clazz = "status-s7-failed"
        			qtip += CQ.I18n.getMessage("Publish failed");
    			} else
    			if (status == "PublishComplete") {
    				clazz = "status-s7-complete"
        			qtip += CQ.I18n.getMessage("Publish complete");
    			}
    			qtip += "</nobr>\"";
    		} else {
                clazz = "status-s7-none";
            }
    		return "<div class=\"status double " + clazz + "\" "+qtip+"></div>";
    	}
    },
    "status": {
        "header": CQ.I18n.getMessage("Status"),
        "id":"status",
        // use an undefined dataIndex in order to avoid unexpected behaviour
        "dataIndex":"X",
        "width": 90,
        "renderer": function(v, params, record) {
            var r = "";
            // scheduled tasks
            var tasks = record.data.scheduledTasks;
            if(tasks != undefined && tasks.length > 0){
                /* build qtip for this element */
                var stQtip = "<table class='qtip-table'><tr><th>"+CQ.I18n.getMessage("Task")+"</th><th>"+CQ.I18n.getMessage("Scheduled")+"</th><th>"+CQ.I18n.getMessage('Version')+"</th></tr>";
                tasks.sort(function compare(a, b) {
                    if (a.scheduled < b.scheduled) {
                        return -1;
                    } else if (a.scheduled > b.scheduled) {
                        return 1;
                    }
                    return 0;
                });
                for(var t = 0; t < tasks.length; t++){
                    var ver = (typeof(tasks[t].version) != 'undefined') ? tasks[t].version : "";
                    var iconCls = (tasks[t].type == 'activation') ?
                                  "status status-scheduledtask-activation" :
                                  "status status-scheduledtask-deactivation";
                    stQtip += "<tr><td class='"+iconCls+"'></td><td>"+CQ.wcm.SiteAdmin.formatDate(tasks[t].scheduled)+" ("+tasks[t].scheduledBy+")</td><td>"+ver+"</td></tr>";
                }
                stQtip += "</table>";
                r += "<span class=\"status status-scheduledtask\" ext:qtip=\"" + stQtip + "\">&nbsp;</span>";
            }
            // workflow
            var wfs = record.data.workflows;
            if (wfs != undefined && wfs.length > 0) {
                var wfQtip = "<table class='qtip-table'><tr><th>"+CQ.I18n.getMessage("Workflow")+"</th><th>"+CQ.I18n.getMessage("Step")+"</th></tr>";
                for (var w = 0; w < wfs.length; w++) {
                    var steps = "";
                    var workItems = wfs[w].workItems;
                    for (var i = 0; i < workItems.length; i++) {
                        steps += CQ.I18n.getMessage(CQ.shared.Util.htmlEncode(workItems[i].item));
                        if (workItems[i].assignee) {
                            steps += " (" + CQ.shared.Util.htmlEncode(workItems[i].assignee) + ")";
                        }
                        steps += "<br/>";
                    }
                    var rowCls = wfs[w].suspended ? "workflow-suspended" : "";
                    wfQtip += "<tr class=" + rowCls + "><td>" + CQ.I18n.getMessage(CQ.shared.Util.htmlEncode(wfs[w].model)) + "</td><td>" + steps + "</td></tr>";
                }
                wfQtip += "</table>";
                r += "<span class=\"status status-workflow\" ext:qtip=\"" + wfQtip + "\">&nbsp;</span>";
            }
            // lock
            var lockedBy = record.data.lockedBy;
            if (lockedBy != undefined && record.data.lockedBy) {
                var lckQtip = "<table class='qtip-table'><tr><th>"+CQ.I18n.getMessage("Lock", null, "noun")+"</th></tr>";
                lckQtip += "<tr><td>" + CQ.I18n.getMessage("Locked by {0}", lockedBy) + "</td></tr></table>";
                r += "<span class=\"status status-locked\" ext:qtip=\"" + lckQtip + "\">&nbsp;</span>";
            }
            // live copy
            var isLiveCopy = false;
            var data = null;
            if (record.data[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP] != undefined &&
                record.data[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP]) {
                isLiveCopy = true;
                data = record.data;
            }
            // Some records have the information in the json property (not data).
            else if (record.json && record.json[CQ.wcm.msm.MSM.PARAM_IS_LIVECOPY] === true &&
                record.json[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP] != undefined &&
                record.json[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP]) {
                isLiveCopy = true;
                data = record.json;
            }
            if (isLiveCopy) {
                var lcStatus = CQ.wcm.msm.MSM.getRelationStatus(data[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP]);
                lcStatus = lcStatus ? lcStatus.replace(/.*title\=\"(.*)\"\ alt\=.*/, '$1') : "";
                var lcQtip = "<table class='qtip-table'><tr><th>"+CQ.I18n.getMessage("Live Copy")+"</th></tr>";
                lcQtip += "<tr><td>" + lcStatus + "</td></tr></table>";
                r += "<span class=\"status status-livecopy\" ext:qtip=\"" + lcQtip + "\">&nbsp;</span>";
            }
            return r;
        }
    },
    "impressions": {
        "header":CQ.I18n.getMessage("Impressions"),
        "id":"impressions",
        "dataIndex":"monthlyHits",
        "tooltip":CQ.I18n.getMessage("Page impressions last 30 days"),
        "renderer": function(val, meta, record, ridx, colidx, store) {
            if (val > 0) {
                var mx = val;
                store.each(function(rec) {
                    mx = Math.max(mx, rec.get("monthlyHits"));
                });
                var length = Math.ceil(75 * (val / mx));
                return '<div class="' + meta["css"] + 'monthly-hits" ext:qtip="' + CQ.I18n.getMessage("Show impressions chart") + '" style="width:' + length + 'px">' + val + '</div>';
            } else {
                return '<div class="' + meta["css"] + 'no-hits" ext:qtip="' + CQ.I18n.getMessage("Show impressions chart") + '">' + val + '</div>';
            }
        }
    },
    "workflow": {
        "header":CQ.I18n.getMessage("In Workflow"),
        "id":"workflow",
        "dataIndex":"inWorkflow",
        "hidden":true,
        "renderer": function (v, params, record) {
            return v ? CQ.I18n.getMessage("Yes") : "";
        }
    },
    "locked": {
        "header":CQ.I18n.getMessage("Locked by"),
        "id":"locked",
        "hidden":true,
        "dataIndex":"lockedBy"
    },
    "liveCopyStatus": {
        "header":CQ.I18n.getMessage("Live Copy"),
        "id":"liveCopyStatus",
        "hidden":true,
        "dataIndex": "msm:liveRelationship", //todo: use CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP instead
        "renderer": function(v, params, record) {
            var lr = record.data[CQ.wcm.msm.MSM.PARAM_LIVE_RELATIONSHIP];
            return CQ.wcm.msm.MSM.getRelationStatus(lr);
        }
    },
    "thumbnail": {
        // "hidden" to hide the title in the header but have it in the columns menu ("hideable")
        "header":"<span class=\"hidden\">"+CQ.I18n.getMessage("Thumbnail")+"</span>",
        "id":"thumbnail",
        "width":60,
        "menuDisabled":true,
        "hideable":true,
        "refreshOnHiddenchange": true,
        // use an undefined dataIndex in order to avoid unexpected behaviour
        "dataIndex":"X",
        "sortable":false,
        "hidden":true,
        // do not use fixed - otherwise "hideable" does no longer work
        //"fixed":true,
        "renderer": function(v, params, record) {
            var admin = CQ.Ext.getCmp(window.CQ_SiteAdmin_id);
            var grid = CQ.Ext.getCmp(window.CQ_SiteAdmin_id + "-grid");
            if (grid.getColumnModel().getColumnById(params.id).hidden) {
                // column is hidden: do not render thumbnails
                return "";
            }
            var path = record.id;
            var isFolder = /.*\:.*[F|f]older/.test(record.get("type"));

            if (admin.treePath.indexOf("/content/dam/") == 0 && !isFolder) {
                // loading icons for assets only (in /content/dam)

                var queueIndex = grid.inProgress.indexOf(path);
                var inProgress = record.get("inProgress");
                if (inProgress || record.get("lastModified") == 0) {
    //                console.log(grid.inProgress.length, path, " in progress ",inProgress);
                    var icon = inProgress < 0 ?
                               "/libs/cq/ui/widgets/themes/default/ext/window/icon-error.gif" :
                               //"/libs/cq/ui/widgets/themes/default/ext/shared/blue-loading.gif";
                               "/libs/cq/ui/widgets/themes/default/icons/48x48/document_loading.gif";
                    var thumb = '<img src="' + CQ.HTTP.externalize(icon) + '"';
                    //thumb += ' style="margin-top:3px;"';
                    var qtip = "<nobr>" + CQ.I18n.getMessage("In Progress") + "</nobr>";
                    if (inProgress < 0) {
                        qtip = "<b>" + CQ.I18n.getMessage("Failed to process asset") + "</b>";
                        if (record.get("inWorkflow")) {
                            var wfs = record.get("workflows");
                            if (wfs && wfs.length > 0) {
                                var wf = wfs[0];
                                if (wf.workItems && wf.workItems.length > 0) {
                                    var step = wf.workItems[wf.workItems.length - 1];
                                    if (step.failureMessage) {
                                        qtip += "<br/>";
                                        qtip += step.failureMessage;
                                    }
                                }
                            }
                        }
                    }
                    if (inProgress) {
                        thumb += ' ext:qtip="' + qtip + '"';
                        var rindex = grid.getStore().indexOf(record);
                        setTimeout(function() {
                            // timeout because row isn't immediately available
                            var row = CQ.Ext.fly(grid.getView().getRow(rindex));
                            if (inProgress < 0) {
                                row.addClass("status-error");
                            } else {
                                //row.addClass("status-in-progress");
                            }
                        },1);
                    }
                    thumb += '>';
                    /*
                    if (queueIndex == -1 && inProgress >= 0) {
                        grid.inProgress.push(path);
    //                    console.log(grid.inProgress.length, path, " added to queue");
                    }
                    */
                    return thumb;
                }
            }

            // cache killer is provided by AssetListServlet and contains the last
            // modified date of the thumbnail
            var ck = record.get("ck");
            var url = CQ.HTTP.externalize(CQ.shared.XSS.getXSSValue(CQ.HTTP.encodePath(path)) + ".thumb.48.48" + (ck ? "." + ck : "") + ".png", true);
            return '<img src="' + url + '">';
        }
    },
    "size": {
        "header":CQ.I18n.getMessage("Size"),
        "id":"size",
        "width":60,
        "dataIndex":"size",
        "renderer": function(v, params, record) {
            return v ? CQ.Util.formatFileSize(v) : "";
        }
    },
    "width": {
        "header":CQ.I18n.getMessage("Width"),
        "id":"width",
        "width":55,
        "dataIndex":"width",
        "renderer": function(v, params, record) {
            return v ? v : "";
        }
    },
    "height": {
        "header":CQ.I18n.getMessage("Height"),
        "id":"height",
        "width":50,
        "dataIndex":"height",
        "renderer": function(v, params, record) {
            return v ? v : "";
        }
    },
    "mime": {
        "header":CQ.I18n.getMessage("Kind"),
        "id":"mime",
        "hidden":true,
        "dataIndex":"mime"
    }

};

/**
 * The context value for actions to appear on the tool bar.
 * @static
 * @final
 * @type String
 */
CQ.wcm.SiteAdmin.CONTEXT_TOOLBAR = "toolbar";

/**
 * The context value for actions to appear on the context menu.
 * @static
 * @final
 * @type String
 */
CQ.wcm.SiteAdmin.CONTEXT_CONTEXTMENU = "contextmenu";

/**
 * The regular expression to identify that file upload will create a DAM asset.
 * @static
 * @final
 * @type String
 */
CQ.wcm.SiteAdmin.UPLOAD_URL_ASSET_REGEXP = /\.createasset\.html$/;
