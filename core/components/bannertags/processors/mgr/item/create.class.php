<?php

class bannerTagsItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'bannerTags';
    public $classKey = 'tagsBanner';
    public $languageTopics = array('bannertags');
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $parent = trim($this->getProperty('category_id'));
        $image = trim($this->getProperty('image'));
        if (empty($parent)) {
            $this->modx->error->addField('category_id', $this->modx->lexicon('bannertags_item_err_parent'));
        } elseif ($this->modx->getCount($this->classKey, array('category_id' => $parent))) {
            $this->modx->error->addField('category_id', $this->modx->lexicon('bannertags_item_err_ae'));
        } elseif (empty($image)){
            $this->modx->error->addField('image', $this->modx->lexicon('bannertags_item_err_image'));
        }

        return parent::beforeSet();
    }

}

return 'bannerTagsItemCreateProcessor';