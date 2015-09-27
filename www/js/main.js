/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, plusplus:true */
/*global $:false, intel:false*/
/** 
 * This function runs once the page is loaded, but intel is not yet active 
 */

var windowHeight;
var init = function () {
    windowHeight=window.innerHeight;
    var currentpic = document.getElementById("slideshowpicid");  
    currentpic.onload=alignImageMiddle;
};

window.addEventListener("load", init, false);  

/**
 * Prevent Default Scrolling 
 */
var preventDefaultScroll = function(event) 
{
    // Prevent scrolling on this element
    event.preventDefault();
    window.scroll(0,0);
    return false;
};
    
window.document.addEventListener("touchmove", preventDefaultScroll, false);

/**
 * Device Ready Code 
*/

var onDeviceReady=function(){                             // called when Cordova is ready
   if( window.Cordova && navigator.splashscreen ) {     // Cordova API detected
        navigator.splashscreen.hide() ;                 // hide splash screen
    }
} ;
document.addEventListener("deviceready", onDeviceReady, false);


//Event listener for camera
//document.addEventListener("intel.xdk.camera.picture.add",onSuccess); 
//document.addEventListener("intel.xdk.camera.picture.busy",onSuccess); 
//document.addEventListener("intel.xdk.camera.picture.cancel",onSuccess); 
var picturecount=0;

function onSuccess(imageURI) 
{
    
    var pic1 = document.getElementById("photoone");
    var pic2 = document.getElementById("phototwo");
    var pic3 = document.getElementById("photothree");

        var changebutton = document.getElementById("buttonid");    
        pic1.src = imageURI;
}

function onFail(message) {
   console.log("Picture failure: " + message);
}
function alignImageMiddle(){
    var currentpic = document.getElementById("slideshowpicid");  
    var height = window.innerHeight;
    currentpic.style.marginTop=(height-currentpic.offsetHeight)/2+"px";
}

//Camera button functionality
function takepicture()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true });

} 
