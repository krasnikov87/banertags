<?php

class bannerTagsItemCreateProcessor extends modObjectCreateProcessor
{

    public $classKey = 'tagsItem';
    public $languageTopics = array('bannertags');
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {

        $bannerId = trim($this->getProperty('banner_id'));
        $posLeft = trim($this->getProperty('pos_left'));
        $posTop = trim($this->getProperty('pos_top'));
        $productId = trim($this->getProperty('product_id'));
        $name = trim($this->getProperty('name'));



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
        }elseif ($this->modx->getCount($this->classKey, ['product_id'=>$productId, 'banner_id'=>$bannerId])){
            $this->modx->error->addField('product_id', 'This product has already been assigned');
        }
        if(empty($name)){
            $this->modx->error->addField('name', 'The field can not be empty');
        }


        return parent::beforeSet();
    }

}

return 'bannerTagsItemCreateProcessor';