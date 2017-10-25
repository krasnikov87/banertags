<?php

class bannerTagsItemUpdateProcessor extends modObjectUpdateProcessor
{
    public $objectType = 'bannerTags';
    public $classKey = 'tagsBanner';
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
        $parent = trim($this->getProperty('category_id'));
        $image = trim($this->getProperty('image'));

        if (empty($id)) {
            return $this->modx->lexicon('bannertags_item_err_ns');
        }


        if (empty($parent)) {
            $this->modx->error->addField('category_id', $this->modx->lexicon('bannertags_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('category_id' => $parent, 'id:!=' => $id))) {
            $this->modx->error->addField('category_id', $this->modx->lexicon('bannertags_item_err_ae'));
        } elseif (empty($image)){
            $this->modx->error->addField('image', $this->modx->lexicon('bannertags_item_err_image'));
        }
        return parent::beforeSet();
    }
}

return 'bannerTagsItemUpdateProcessor';
