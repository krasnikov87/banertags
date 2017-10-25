<?php
if (!$bannerTag = $modx->getService('bannertags', 'bannerTag', $modx->getOption('bannertags_core_path', null,
        $modx->getOption('core_path') . 'components/bannertags/') . 'model/bannertags/', $scriptProperties)
) {
    return 'Could not load modExtra class!';
}

$id = isset($id) ? $id : $modx->resource->get('id');

$q = $modx->getObject('tagsBanner', ['category_id'=>$id, 'active'=>1]);
if(!is_object($q)) return '';
$banner = $q->toArray();

$q = $modx->getCollection('tagsItem', ['banner_id'=>$banner['id']]);
if(!is_object($q)) return '';
//pdoTools
$fqn = $modx->getOption('pdoFetch.class', null, 'pdotools.pdofetch', true);
$path = $modx->getOption('pdofetch_class_path', null, MODX_CORE_PATH . 'components/pdotools/model/', true);
if($pdoClass = $modx->loadClass($fqn, $path, false, true)) {
    $pdoTools = new $pdoClass($modx, []);
}else{
    return 'false';
}

//output
$output = '';
foreach ($q as $item){
    $output .= $pdoTools->getChunk($tplRow, $item->toArray());
}

if(!empty($tplOutput)){
    $output = $pdoTools->getChunk($tplOutput, array_merge(['output'=>$output], $banner));
}
return $output;