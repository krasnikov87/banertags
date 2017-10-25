<?php

/**
 * The home manager controller for bannerTags.
 *
 */
class bannerTagsHomeManagerController extends modExtraManagerController
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
        $this->addCss($this->bannerTags->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->bannerTags->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/bannertags.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/misc/bt.combo.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->bannerTags->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        BannerTags.config = ' . json_encode($this->bannerTags->config) . ';
        BannerTags.config.connector_url = "' . $this->bannerTags->config['connectorUrl'] . '";
        Ext.onReady(function() {
            MODx.load({ xtype: "bannertags-page-home"});
        });
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->bannerTags->config['templatesPath'] . 'home.tpl';
    }
}