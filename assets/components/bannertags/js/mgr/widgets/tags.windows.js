BannerTags.window.CreateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bannertags-item-window-create';
    }
    Ext.applyIf(config, {
        title: _('bannertags_item_create'),
        width: 550,
        autoHeight: true,
        url: BannerTags.config.connector_url,
        action: 'mgr/tags/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    BannerTags.window.CreateItem.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.window.CreateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            id:config.id +'banner_id',
            xtype: 'hidden',
            name: 'banner_id',
            readOnly: true,
            originalValue: MODx.request.id,
            allowBlank: false

        },{
            xtype: 'textfield',
            name: 'pos_left',
            id: config.id +'-pos_left',
            allowBlank: false,
            fieldLabel: _('bannertags_item_pos_left'),
        },  {
            xtype: 'textfield',
            name:'pos_top',
            id:  config.id +'-pos_top',
            allowBlank: false,
            fieldLabel: _('bannertags_item_pos_top'),
        },  {
            xtype: 'bannertags-combo-products',
            fieldLabel: _('bannertags_item_product'),
            name: 'product_id',
            id: config.id +'-page-id',
            anchor: '99%',
            hiddenName:_('bannertags_item_product'),
            allowBlank:true,

        },  {
            xtype: 'textfield',
            fieldLabel: _('bannertags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('bannertags-item-window-create', BannerTags.window.CreateItem);


BannerTags.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'bannertags-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('bannertags_item_update'),
        width: 550,
        autoHeight: true,
        url: BannerTags.config.connector_url,
        action: 'mgr/tags/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    BannerTags.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.window.UpdateItem, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        },{
            id:config.id +'banner_id',
            xtype: 'hidden',
            name: 'banner_id',
            readOnly: true,
            originalValue: MODx.request.id,
            allowBlank: false

        },{
            xtype: 'textfield',
            name: 'pos_left',
            id: config.id +'-pos_left',
            allowBlank: false,
            fieldLabel: _('bannertags_item_pos_left'),
        },  {
            xtype: 'textfield',
            name:'pos_top',
            id:  config.id +'-pos_top',
            allowBlank: false,
            fieldLabel: _('bannertags_item_pos_top'),
        },  {
            xtype: 'bannertags-combo-products',
            fieldLabel: _('bannertags_item_product'),
            name: 'product_id',
            id: config.id +'-page-id',
            anchor: '99%',
            hiddenName:_('bannertags_item_product'),
            allowBlank:true,

        },  {
            xtype: 'textfield',
            fieldLabel: _('bannertags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }];
    },
    loadDropZones: function () {
    }

});
Ext.reg('bannertags-item-window-update', BannerTags.window.UpdateItem);
