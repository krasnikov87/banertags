<?php

/**
 * The home manager controller for bannerTags.
 *
 */
class bannerTagsTagsManagerController extends modExtraManagerController
{
    /** @var bannerTags $bannerTags */
    public $bannerTags;


    /**
     *
     */
    public function initialize()
    {
        $path = $this->modx->getOption('bannertags_core_path', null,
                $this->modx->getOption('core_path') . 'components/bannertags/') . 'model/bannertags/';
        $this->bannerTags = $this->modx->getService('bannertags', 'bannerTags', $path);
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('bannertags:default');
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('bannertags');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $page = $this->modx->getObject('tagsBanner', $_GET['id']);

        $this->addCss($this->bannerTags->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->bannerTags->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/bannertags.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/misc/bt.combo.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/tags.grid.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/tags.windows.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/tags.panel.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/sections/tags.js');

        $this->addHtml('<script type="text/javascript">
            BannerTags.config = ' . json_encode($this->bannerTags->config) . ';
            BannerTags.config.connector_url = "' . $this->bannerTags->config['connectorUrl'] . '";
            BannerTags.config.image = "/'.$page->get('image').'";
            Ext.onReady(function() {
                MODx.load({ xtype: "bannertags-page-tags"});
            });
            
            Ext.onReady(function(){
                var element = Ext.get(\'tag-image\');
                
                element.on(\'click\', function(e, target, options){
                    
                    
                    var x = event.pageX - element.getLeft();
                    var y = event.pageY - element.getTop();
                    var w = MODx.load({
                        xtype: \'bannertags-item-window-create\',
                        id: Ext.id(),
                        listeners: {
                            success: {
                                fn: function () {
                                    Ext.getCmp(\'bannertags-grid-items\').refresh();
                                }, scope: this
                            }
                        }
                    });
                   
                    w.reset();
                    w.setValues({active: true});
                    w.show(e.target);
                    Ext.getCmp(w.options.fields[1].id).setValue(x);
                    Ext.getCmp(w.options.fields[2].id).setValue(y);
                }, this);
                     
            });
            
                
            var update = function(id) {
                MODx.Ajax.request({
                   url: BannerTags.config.connectorUrl,
                   params: {
                       action: \'mgr/tags/get\',
                       id: id
                   },
                   listeners: {
                       success: {
                           fn: function (r) {
                               var w = MODx.load({
                                   xtype: \'bannertags-item-window-update\',
                                   id: Ext.id(),
                                   record: r,
                                   listeners: {
                                       success: {
                                           fn: function () {
                                               Ext.getCmp(\'bannertags-grid-items\').refresh();
                                           }, scope: this
                                       }
                                   }
                               });
                               w.reset();
                               w.setValues(r.object);
                               w.show();
                           }, scope: this
                       }
                   }
               });
            }
           
           
        
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->bannerTags->config['templatesPath'] . 'tags.tpl';
    }
}