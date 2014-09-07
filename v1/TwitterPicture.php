<?php 

namespace v1 ; 

/**
  * @Component
  */
class TwitterPicture {

  /**
    * @url GET /id/{$picId}
    */
    public function testFunction ($picId) {
    	$image = "754617590.png" ; 
	$im = imagecreatefrompng("images/".$image);
	header('Content-Type: image/png');
	imagepng($im); 
	imagedestroy($im);
    }

}
