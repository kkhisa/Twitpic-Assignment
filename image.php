<?php
        $image = "754617590.png" ; 
	$im = imagecreatefrompng("images/".$image);
	header('Content-Type: image/png');
	imagepng($im); 
	imagedestroy($im);

