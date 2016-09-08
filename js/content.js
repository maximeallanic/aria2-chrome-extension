/**
* @Author: Maxime Allanic <mallanic>
* @Date:   07/09/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 07/09/2016
*/

var div = document.createElement('div');
div.className = "downloader_banner";

var close = document.createElement('a');
close.type = "button";
close.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
close.onclick = function () {
  div.className = "downloader_banner";
  setTimeout(function () {
    document.body.removeChild(div);
  }, 300);
}

var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("view/banner.html");

div.appendChild(close);
div.appendChild(iframe);

document.body.appendChild(div);
iframe.onload = function () {
  div.className = "downloader_banner open";
}
