<?php
class Images {
	
	private $pathToImages =  "includes/images";
	
	public function getImages() {
		return scandir($this->pathToImages, 1);
	}
}