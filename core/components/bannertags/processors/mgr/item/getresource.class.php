<?php

class bannerTagsResourceItemGetListProcessor extends modObjectGetListProcessor
{

    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';





    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $c->select($this->modx->getSelectColumns($this->classKey, '', '', ['id', 'pagetitle']));
        $classKey = trim($this->getProperty('class'));
        $query = trim($this->getProperty('query'));
        if(!empty($query) && !empty($classKey)){
            $c->where(array(
                'class_key:='=> $classKey,
                'pagetitle:LIKE'=>"%$query%"
            ));
        }elseif(!empty($classKey)){
            $c->where(array(
                'class_key:='=> $classKey
            ));
        }elseif(!empty($query)){
            $c->where(array(
                'pagetitle:LIKE'=>"%$query%",
                'class_key:='=> 'msCategory'
            ));
        } else{
            $c->where(array(
                'class_key:='=> 'msCategory'
            ));
        }

        return $c;
    }





    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        return $array;
    }

}

return 'bannerTagsResourceItemGetListProcessor';