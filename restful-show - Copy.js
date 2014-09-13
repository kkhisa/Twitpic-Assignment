// Function creates an image and a paragraph element and inserts/appends into DOM immediately AFTER the image gallery list
function preparePlaceholder()
{
	//Backward compatibility: check that browser understands these methods i.e. if undefined, go no further
	if ( !(document.createElement && document.createTextNode) ) return false;
	if (!document.getElementsByTagName || !document.getElementById) return false;
	
	// create document fragments (nodes)
	var placeholder = document.createElement("img");	// create image element node
	placeholder.setAttribute("id", "placeholder");		// Give this node an id attribute
	placeholder.setAttribute("src", "includes/images/placeholder.gif"); // Give this node an src attribute
	placeholder.setAttribute("alt", "my image gallery");	// Give this node an alt attribute
	
	var p_object = document.createElement("p");		// create a paragraph element node
	p_object.setAttribute("id", "description");		// Give this node an id attribute
	var newContent = document.createTextNode("Click on thumbnail to view an image"); // create a text node
	p_object.appendChild(newContent);	// append text node to paragraph element
	
	// Insert image/paragraph nodes into document
	// OPTED: in this case looks better if description text is placed above placeholder image
	var ul_object = document.getElementById("imagegallery");
	insertAfter(p_object, ul_object);
	insertAfter(placeholder, p_object);
	
	// N.B: MORE THAN ONE WAY TO ADD NODES TO DOM 
	//insertAfter(placeholder, ul_object);
	//insertAfter(p_object, placeholder);
}

// Function handles events as it loops through all the links in the image gallery list, which when activated calls showPic function 
function prepareGallery()
{
	//Backward compatibility: check that browser understands methods and elements exist otherwise, go no further
	if (!document.getElementsByTagName || !document.getElementById) return false;
	// if ( !(document.getElementsByTagName && document.getElementById) ) return false; // I HAVE ALWAYS PREFERRED THIS
	if (!document.getElementById("imagegallery")) return false;			
	// Loop through all the set of individual links in the imagegallery element 
	// ... attaching behavior when each object's onclick event handler is triggered
	var gallery = document.getElementById("imagegallery");	
	var a_objects = gallery.getElementsByTagName("a");
	for (var i=0; i < a_objects.length; i++)
	{
		a_objects[i].onclick = function()
				{	
					return showPic(this) ? false : true;	// ternary operator  
				}	
	}
}

// Function swaps out placeholder image for one of the images linked from the gallery list
function showPic(whichPic) 
{
	// href is a value representing the entire URL of image linked from the gallery list
	var url = whichPic.getAttribute("href");
	
	// N.B. would fail graceful degradation test if NOT fixed in anonymous function above!
	if (!document.getElementById("placeholder")) return false;	
	
	// TEST: <Element> must exists as an <IMG> coz src attribute needs to be replaced
	if (document.getElementById("placeholder").nodeName != "IMG") return false;  //N.B. nodeName returns uppercase value!
	document.getElementById("placeholder").setAttribute("src",url);	
	
	// Action: We have every link from gallery list having a title attribute. 
	// That attribute value is to be displayed alongside image
	if (document.getElementById("description"))
	{	
		// TEST: Check whether or not title attribute is null
		if (whichPic.getAttribute("title"))
			var title_attribute = whichPic.getAttribute("title");
		else
			var title_attribute = "";  // Could have used ternary operator instead
		
		var p_object = document.getElementById("description");			
		// TEST: Check that child of <p> is a Text node - and update content with title attribute
		if (p_object.firstChild.nodeType == 3)
		{	
			p_object.firstChild.nodeValue = title_attribute;
		}
	}

	return true; 	// reporting that function executed successfully
			// Usually you want this explicit if returned result will be used in calling program!
}


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);