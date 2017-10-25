var BannerTags = function (config) {
    config = config || {};
    BannerTags.superclass.constructor.call(this, config);
};
Ext.extend(BannerTags, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('bannertags', BannerTags);

BannerTags = new BannerTags();