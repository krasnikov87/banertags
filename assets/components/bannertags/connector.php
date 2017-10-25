<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
}
else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var bannerTags $bannerTags */
$bannerTags = $modx->getService('bannertags', 'bannerTags', $modx->getOption('bannertags_core_path', null,
        $modx->getOption('core_path') . 'components/bannertags/') . 'model/bannertags/'
);
$modx->lexicon->load('bannertags:default');

// handle request
$corePath = $modx->getOption('bannertags_core_path', null, $modx->getOption('core_path') . 'components/bannertags/');
$path = $modx->getOption('processorsPath', $bannerTags->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));