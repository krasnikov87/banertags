BannerTags.page.Tags = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'bannertags-panel-tags',
            renderTo: 'bannertags-panel-tags-div'
        }]
    });
    BannerTags.page.Tags.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.page.Tags, MODx.Component);
Ext.reg('bannertags-page-tags', BannerTags.page.Tags);

