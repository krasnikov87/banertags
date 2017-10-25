<?php
$xpdo_meta_map['tagsItem']= array (
  'package' => 'bannertags',
  'version' => '1.1',
  'table' => 'tags_item',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'banner_id' => NULL,
    'name' => '',
    'product_id' => NULL,
    'pos_left' => NULL,
    'pos_top' => NULL,
  ),
  'fieldMeta' => 
  array (
    'banner_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
    'name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
      'default' => '',
    ),
    'product_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => false,
    ),
    'pos_left' => 
    array (
      'dbtype' => 'int',
      'precision' => '5',
      'phptype' => 'integer',
      'null' => false,
    ),
    'pos_top' => 
    array (
      'dbtype' => 'int',
      'precision' => '5',
      'phptype' => 'integer',
      'null' => false,
    ),
  ),
  'aggregates' => 
  array (
    'tagsBanner' => 
    array (
      'class' => 'tagsBanner',
      'local' => 'banner_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
