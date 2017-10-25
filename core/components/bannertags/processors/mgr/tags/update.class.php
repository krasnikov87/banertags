<?php

class bannerTagsItemUpdateProcessor extends modObjectUpdateProcessor
{

    public $classKey = 'tagsItem';
    public $languageTopics = array('bannertags');
    //public $permission = 'save';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return bool|string
     */
    public function beforeSave()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $id = (int)$this->getProperty('id');
        $bannerId = trim($this->getProperty('banner_id'));
        $posLeft = trim($this->getProperty('pos_left'));
        $posTop = trim($this->getProperty('pos_top'));
        $productId = trim($this->getProperty('product_id'));
        $name = trim($this->getProperty('name'));

        if (empty($id)) {
            return $this->modx->lexicon('bannertags_item_err_ns');
        }

        if(empty($bannerId)){
            $this->modx->error->addField('banner_id', 'The field can not be empty');
        }
        if(empty($posLeft)){
            $this->modx->error->addField('pos_left', 'The field can not be empty');
        }
        if(empty($posTop)){
            $this->modx->error->addField('pos_top', 'The field can not be empty');
        }
        if(empty($productId)){
            $this->modx->error->addField('product_id', 'The field can not be empty');
        }elseif ($this->modx->getCount($this->classKey, ['product_id'=>$productId, 'banner_id'=>$bannerId, 'id:!='=>$id])){
            $this->modx->error->addField('category_id', $this->modx->lexicon('bannertags_item_err_ae'));
        }
        if(empty($name)){
            $this->modx->error->addField('name', 'The field can not be empty');
        }

        return parent::beforeSet();
    }
}

return 'bannerTagsItemUpdateProcessor';
