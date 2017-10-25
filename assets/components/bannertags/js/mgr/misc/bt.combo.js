BannerTags.combo.Page = function (config) {
    config = config || {};
    Ext.apply(config, {
        name: _('bannertags_item_parent'),
        fieldLabel: _('bannertags_item_parent'),
        hiddenName: config.name,
        displayField:'pagetitle',
        valueField: 'id',
        anchor: '99%',
        fields: ['id', 'pagetitle'],
        pagesize: 20,
        typeAhed:false,
        editable:true,
        allowBlank:false,
        url:BannerTags.config.connector_url,
        baseParams: {
            action: 'mgr/item/getresource',
        }
    });
    BannerTags.combo.Page.superclass.constructor.call(this, config);
};

Ext.extend(BannerTags.combo.Page, MODx.combo.ComboBox);
Ext.reg('bannertags-combo-page', BannerTags.combo.Page);


BannerTags.combo.Products = function (config) {
    config = config || {};
    Ext.apply(config, {
        name: _('bannertags_item_product'),
        fieldLabel: _('bannertags_item_product'),
        hiddenName: config.name,
        displayField:'pagetitle',
        valueField: 'id',
        anchor: '99%',
        fields: ['id', 'pagetitle'],
        pagesize: 20,
        typeAhed:false,
        editable:true,
        allowBlank:false,
        url:BannerTags.config.connector_url,
        baseParams: {
            action: 'mgr/item/getresource',
            class: 'msProduct'
        }
    });
    BannerTags.combo.Products.superclass.constructor.call(this, config);
};

Ext.extend(BannerTags.combo.Products, MODx.combo.ComboBox);
Ext.reg('bannertags-combo-products', BannerTags.combo.Products);
