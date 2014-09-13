<?php

require_once("Images.php") ; 

class TwitterpicturesController 
{
    public function getAction($request) {
		$images = array() ; 
		$picID = @$request->url_elements[3] ;
		$loadImages = new Images($pathToImages) ;		
		$requiredImages = array_slice($loadImages->getImages(), 2, -2) ; 
			
        if(isset($picID)) {
			for ($i = 0; $i < $requiredImages; $i++ ) {
				if (substr($requiredImages[$i], 0, -3) == $picID) {
					$images["image0"] = $requiredImages[$i] ;
					break ;
				}
			}			
        } else {	
			for ($i = 0; $i < sizeof($requiredImages); $i++ ) {
				$images["image$i"] = $requiredImages[$i] ;
			}     			
        }
        return $images ;
    }

    public function postAction($request) {
        $data = $request->parameters;
        $data['message'] = "This data was submitted";
        return $data;
    }
}