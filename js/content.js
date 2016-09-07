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
close.innerHTML = "x";
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
