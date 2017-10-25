<?php

class bannerTagsItemRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'bannerTags';
    public $classKey = 'tagsBanner';
    public $languageTopics = array('bannertags');
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('bannertags_item_err_ns'));
        }

        foreach ($ids as $id) {

            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('bannertags_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'bannerTagsItemRemoveProcessor';