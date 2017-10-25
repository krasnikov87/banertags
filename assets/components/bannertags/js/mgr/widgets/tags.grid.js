BannerTags.grid.Items = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bannertags-grid-items';
    }
    Ext.applyIf(config, {
        url: BannerTags.config.connector_url,
        fields: this.getFields(config),
        columns: this.getColumns(config),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/tags/getlist',
            id: MODx.request.id
        },
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateItem(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'bannertags-grid-row-disabled'
                    : '';
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    BannerTags.grid.Items.superclass.constructor.call(this, config);

    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }

        this.updateTags()

    }, this);
};
Ext.extend(BannerTags.grid.Items, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = BannerTags.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },

    createItem: function (btn, e) {
        var w = MODx.load({
            xtype: 'bannertags-item-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },



    updateItem: function (btn, e, row) {
       if (typeof(row) != 'undefined') {
           this.menu.record = row.data;
       }
       else if (!this.menu.record) {
           return false;
       }
       var id = this.menu.record.id;

       MODx.Ajax.request({
           url: this.config.url,
           params: {
               action: 'mgr/tags/get',
               id: id
           },
           listeners: {
               success: {
                   fn: function (r) {
                       var w = MODx.load({
                           xtype: 'bannertags-item-window-update',
                           id: Ext.id(),
                           record: r,
                           listeners: {
                               success: {
                                   fn: function () {
                                       this.refresh();
                                   }, scope: this
                               }
                           }
                       });
                       w.reset();
                       w.setValues(r.object);
                       w.show(e.target);
                   }, scope: this
               }
           }
       });
    },
    backToHome: function () {
        location.href = '?a=home&namespace=' + MODx.request.namespace;
    },
    removeItem: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('bannertags_items_remove')
                : _('bannertags_item_remove'),
            text: ids.length > 1
                ? _('bannertags_items_remove_confirm')
                : _('bannertags_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/tags/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },



    getFields: function () {
        return ['id', 'baner_id', 'name','product_id', 'pos_left', 'pos_top', 'actions'];
    },

    getColumns: function () {
        return [{
            header: _('bannertags_item_id'),
            dataIndex: 'id',
            sortable: true,
            width: 70,
            hidden:false
        },{
            header: _('bannertags_item_product'),
            dataIndex: 'product_id',
            sortable: false,
            width: 250,
        }, {
            header: _('bannertags_item_name'),
            dataIndex: 'name',
            sortable: true,
            width: 200,
        },  {
            header: _('bannertags_grid_actions'),
            dataIndex: 'actions',
            renderer: BannerTags.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [/*{
            text: '<i class="icon icon-plus"></i>&nbsp;' + _('bannertags_item_create'),
            handler: this.createItem,
            scope: this
        }, '->', */{
            text: '<i class="icon icon-reply"></i>&nbsp;' + _('bannertags_item_back'),
            handler: this.backToHome,
            scope: this
        }];
    },

    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },

    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

    _doSearch: function (tf) {
        this.getStore().baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
    },

    _clearSearch: function () {
        this.getStore().baseParams.query = '';
        this.getBottomToolbar().changePage(1);
    },

    updateTags: function () {
        Ext.select('div.tag').remove();

        var tags = Ext.decode(Ext.getCmp('bannertags-grid-items').encode());
        var tag;
        var image = Ext.get('image')

        for(var key in tags){
            tag =  tags[key];
            var newtag = '<div class="tag" style="left:'+tag.pos_left+'px; top:'+tag.pos_top+'px;" onclick="update('+tag.id+')"><p>'+tag.name+'</p></div>';
            Ext.DomHelper.append(image, newtag);
        }
    }
});
Ext.reg('bannertags-grid-items', BannerTags.grid.Items);
