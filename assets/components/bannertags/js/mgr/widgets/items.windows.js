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
        action: 'mgr/item/create',
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
            xtype: 'modx-combo-browser',
            fieldLabel: _('bannertags_item_image'),
            name: 'image',
            id: config.id +'-image',
            openTo: 'assets/images/',
            anchor: '99%',
        },  {
            xtype: 'bannertags-combo-page',
            fieldLabel: _('bannertags_item_parent'),
            name: 'category_id',
            id: config.id +'-page-id',
            anchor: '99%',
            hiddenName:_('bannertags_item_parent'),
            allowBlank:true,

        },  {
            xtype: 'textfield',
            fieldLabel: _('bannertags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('bannertags_item_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bannertags_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    },
    renderImage: function(val,cell,row) {
        console.log(val);
        console.log(cell);
        console.log(row);

        return val != ''
            ? '<img src="' + val + '" alt="" height="50" />'
            : '';
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
        action: 'mgr/item/update',
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
        }, {
            xtype: 'modx-combo-browser',
            fieldLabel: _('bannertags_item_image'),
            name: 'image',
            id: config.id +'-image',
            openTo: 'assets/images/',
            anchor: '99%',
            allowBlank:false
        }, {
            xtype: 'bannertags-combo-page',
            fieldLabel: _('bannertags_item_parent'),
            name: 'category_id',
            id: config.id +'-page-id',
            anchor: '99%',
            hiddenName:_('bannertags_item_parent'),
            allowBlank:false,

        }, {
            xtype: 'textfield',
            fieldLabel: _('bannertags_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'textarea',
            fieldLabel: _('bannertags_item_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 150,
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('bannertags_item_active'),
            name: 'active',
            id: config.id + '-active',
        }];
    },

    renderImage: function (value, a, b) {
        console.log(value);
    },
    loadDropZones: function () {
    }

});
Ext.reg('bannertags-item-window-update', BannerTags.window.UpdateItem);