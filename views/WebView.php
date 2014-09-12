<?php

class WebView extends ApiView {

	 public function render($content) {
		$result = ""; 
		$folder = explode("\\", getcwd()) ;
		$path = $_SERVER["HTTP_HOST"]."/".$folder[sizeof($folder) - 1] ;
		
		$result .= '<script src="http://'.$path.'/includes/js/modernizr-2.6.2.min.js"></script>'
					.'<script src="http://'.$path.'/includes/js/jquery.js"></script>'
					.'<script src="http://'.$path.'/includes/js/global.js" type="text/javascript"></script>'
					.'<script src="http://'.$path.'/custom-show.js"></script>'
					.'<link media="screen" href="http://'.$path.'/includes/css/basic.css" rel="stylesheet" type="text/css">' ;
					
		$result .= '<ul id="imagegallery">' ;
		
		for ($i = 0; $i < sizeof($content); $i++) {		
			$alt = @$content ["image$i"];
			$title = $alt;
			
			$anchor_object = "<a title=\"" . $title . "\" href=\"" . $path . "\" >";
		
			$result .= '<li id="user_image'
					.$i
					.'">'
					.$anchor_object
					.'<img alt="'
					. $alt 
					.'" style="width: 75px; margin: 5px;" src="http://'
					.$path
					.'/includes/images/'.$content["image$i"]
					.'" />'
					.'</a></li>';;
					
					
		} 
		$result .= '</ul>';
		echo $result ; 
        return true;
    }
}