<?php

require_once 'lib/restler.php'; 
use Luracast\Restler\Restler ; 

$r = new Restler() ; 
$r->setAPIVersion(1) ; 
$r->addAPIClass('TwitterPicture') ; 
$r->handle() ; 
