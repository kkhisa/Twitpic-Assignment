<?php 

$url = $_POST['url'] ; 
$type = $_POST['type']; 

file_put_contents ("images_file.txt", $url."\n", FILE_APPEND | LOCK_EX);
$fullURL = "https://d3j5vwomefv46c.cloudfront.net/photos/thumb/".$url.".".$type ;
$destURL = "includes/images/".$url.".".$type ; 
if(!copy($fullURL, $destURL)) 
{
	$errors= error_get_last();
	echo 'copy error!'.$errors['message'] ; 
}
