BannerTags.panel.Tags = function (config) {
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
                    title: _('modextra_items'),
                    layout: 'anchor',
                    items: [{
                        html: '<h3>'+_('bannertags_item_click')+'</h3>',
                        cls: 'panel-desc',
                    }]
                },{
                    html:'<div class="image" id="image"><img id="tag-image" src="'+BannerTags.config.image+'"></div>',
                },{
                    xtype: 'bannertags-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    BannerTags.panel.Tags.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags.panel.Tags, MODx.Panel);
Ext.reg('bannertags-panel-tags', BannerTags.panel.Tags);





