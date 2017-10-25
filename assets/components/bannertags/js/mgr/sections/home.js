BannerTags.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'bannertags-panel-home',
            renderTo: 'bannertags-panel-home-div'
        }]
    });
    BannerTags.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.page.Home, MODx.Component);
Ext.reg('bannertags-page-home', BannerTags.page.Home);