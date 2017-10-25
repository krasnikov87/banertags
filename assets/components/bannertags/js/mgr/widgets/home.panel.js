BannerTags.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        layout: 'anchor',
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('bannertags') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('bannertags_items'),
                layout: 'anchor',
                items: [ {
                    xtype: 'bannertags-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    BannerTags.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.panel.Home, MODx.Panel);
Ext.reg('bannertags-panel-home', BannerTags.panel.Home);
