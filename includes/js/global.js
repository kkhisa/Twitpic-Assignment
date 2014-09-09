// THE global.js WILL BE INCLUDED ON EVERY PAGE so all shared functions SHOULD BE HERE so they can be shared in other pages!!!

// This addLoadEvent function adds any function that needs to be ..
// .. to be executed when the document is fully loaded
function addLoadEvent(func) 
{
  var oldonload = window.onload;
  if ( typeof(window.onload) != 'function') 
  {
    window.onload = func;
  } 
  else 
  {
    window.onload = function() 
		    {
		      oldonload();
		      func();
		    }
  }
}

// A useful corollary function to the insertBefore() method because ....
// ..'insertAfter' is not a built-in function so it has to be custom-built
function insertAfter(newElement, targetElement) 
{
  parentOfTargetElement = targetElement.parentNode;
  if (parentOfTargetElement.lastChild == targetElement) 
  { parentOfTargetElement.appendChild(newElement); } 
  else 
  { parentOfTargetElement.insertBefore(newElement, targetElement.nextSibling); }
}

// This function abstracts style changes into a className...
// ... changes would therefore be easier done in CSS rather disturbing your DOM script
function addClass(element, value) 
{
  if (!element.className) 
  {
    element.className = value;
  } 
  else 
  {
    var newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
}

// highlight function shows where on nav user is, if page created from template 
function highlightPage() 
{
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  
  var headers = document.getElementsByTagName("header");
  if (headers.length == 0) return false;
  
  var navs = headers[0].getElementsByTagName("nav");	
  if (navs.length == 0) return false;
  
  var links = navs[0].getElementsByTagName("a");
  
  
  var linkurl;
  for (var i=0; i<links.length; i++) 
  {
    linkurl = links[i].getAttribute("href");
    //var currenturl = window.location.href;
    //if (currenturl.indexOf(linkurl) != -1)
    // window.location object refers to the various pieces of a URL
    // ... and 'href' refers to the value representing the entire URL
    // .. so if link matches current URL add the class attribute on the fly!
    if ( window.location.href.indexOf(linkurl) != -1 )
    {
      links[i].className = "here";
      //links[i].setAttribute("class","here");	// Of course this also works

      // give unique id attribute to <body> element so you can add STYLES specific to page
      // e.g. specify a different background image for header (bootom right) of each individual page
      // ... gosh but space in an attribute will it create problems? such as in id="contact us"?
      // ... jQuery allows it though by using escape characters $('#Contact\\ us');
      var linktext = links[i].lastChild.nodeValue.toLowerCase();
      document.getElementsByTagName("body")[0].setAttribute("id",linktext);
      //alert(linktext);
    } 
  }
  
}

addLoadEvent(highlightPage);

// AJaX: for Contact.html Hijax submit.html asynchronously and instead have 'thank you' message appear inline in form 
// ....  see rest of scripts in contact.js
function getHTTPObject()
{	
	// create instance of XMLHttpRequest object
	if ( typeof(XMLHttpRequest) == "undefined" )
	{	
		XMLHttpRequest = function()
		{
			// IE.: different versions use different XMLHttp Object inititializations 
			try 
			{ return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
			catch(e) {}

			try 
			{ return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
			catch(e) {}

			try 
			{ return new ActiveXObject("Msxml2.XMLHTTP"); }
			catch(e) {}

			return false;
		}
	} // end: if 'undefined'
	
	// if defined --> this for other browsers other than IE?
	return new XMLHttpRequest();  // return an XMLHttpRequest object
}

addLoadEvent(getHTTPObject);

//==================================For about.html page =================================================***********
// For some reason only works when placed in global.js?!??????????

// The idea of <section> is that you can use id attribute for INTERNAL links
// That way only one section can be visible at a time while the rest lie hidden
// ABOUT TIME WE USED OUR CSS-DOM 'STYLE' Object also

// NB: Trigger this function when a link is clicked in <nav> list in <article> element!
// ... that we will do in function prepareInternalnav

function showSection(id)
{
	var section_object = document.getElementsByTagName("section");
	
	for (var i=0; i<section_object.length; i++)
	{
		if (section_object[i].getAttribute("id") != id)
		{
			// updates all display style property of each section matching != id
			section_object[i].style.display = "none";
		}
		else 
		{
			// The one with specified id is set to 'block'
			section_object[i].style.display = "block";
		}
	}
}

function prepareInternalnav()
{
	// Make sure the browser understands the DOM methods
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	  
	var article_object = document.getElementsByTagName("article");
	if (article_object.length == 0) return false;
	
	var nav_object = article_object[0].getElementsByTagName("nav");
	if (nav_object.length == 0) return false;
	
	var links = nav_object[0].getElementsByTagName("a");
	for (var i=0; i<links.length; i++)
	{
		var internalId = links[i].getAttribute("href");
		internalId = internalId.replace("#",""); // strip '#' coz we have matched this with id for sections
		
		// Test that an <element> with such an id actually exists
		if (!document.getElementById(internalId)) continue;
		
		document.getElementById(internalId).style.display = "none";
		
		// issues of scope so we create a custom PROPERTY
		links[i].destination = internalId;
		
		links[i].onclick = function()
				{ 
					showSection(this.destination);
					return false;
				}
		
	}  
}

addLoadEvent(prepareInternalnav);


