/*jslint sloppy:true, browser:true, devel:true, white:true, vars:true, eqeq:true, plusplus:true */
/*global $:false, intel:false*/
/** 
 * This function runs once the page is loaded, but intel is not yet active 
 */

var windowHeight;
var init = function () {
    windowHeight=window.innerHeight;
};
var type = 0;


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
    var changebutton = document.getElementById("buttonid");    
        pic1.src = imageURI;    
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://deviantsart.com"), win, fail);
}
// !! Assumes variable fileURL contains a valid URL to a text file on the device,
//    for example, cdvfile://localhost/persistent/path/to/file.txt

var win = function (r) {
    console.log("Code = " + r.responseCode);
    var responder = JSON.parse(r.response);
    console.log("Response = " + responder);
    console.log("Response = " + responder.url);
    console.log("Sent = " + r.bytesSent);
    var d = "https://totempass.herokuapp.com/totem/upload";
    if(type == 0){
        d = "https://totempass.herokuapp.com/totem/initialize";
    }
    httpGetAsync(d,responder.url);
};

var fail = function (error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}; 

function httpGetAsync(theUrl, imgUrl)
{
    theUrl +='?url=' + imgUrl;
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
            alert(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
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
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType:      Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true });

} 

function authTotem(){
    type = 1;
    takepicture();
}
function newTotem(){
    type = 0;
    takepicture();
}