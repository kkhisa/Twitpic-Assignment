var twitPic = new TwitPic() ;
/*
twitPic.config(function (config) {
	config.apiKey = "e2539b84e722971d7a70269df2df1b4c";	
	config.consumerKey = "";
	config.consumerSecret = "";
      	config.oauthToken = "";
       	config.oauthSecret = "";
}) ;
*/
var gallery = document.getElementById("gallery") ; 

twitPic.users.show({'username':'kkhisa'}, function (user) {
	
	for (imagesCounter = 0 ;  imagesCounter < user.images.length ; imagesCounter++) 
	{
		image_id = user.images[imagesCounter].id ;
		image_type = user.images[imagesCounter].type ; 
		path = "http://twitpic.com/show/thumb/" + user.images[imagesCounter].short_id ;
		url =  "<img style=\"width: 150px; margin: 5px;\" src=" + path + " />" ; 
	 	genDiv = "<span id=user_image" + imagesCounter + ">" + url + "</span>" ;
		$("#gallery").append(genDiv) ;

		$.post(
			"save-files-to-dir.php",
			{"url" : image_id,
			 "type" : image_type} 
		); 
		
	}
}); 

function success (result) {
	alert ("file URL was posted to remote server" ); 
}
