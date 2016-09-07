var downloadBar = false;

function showDownloadBar() {
  if (!downloadBar) {
    var fileurl = chrome.extension.getURL("statusbar.html");
    console.log(fileurl);
    downloadBar = $("<div id='downloadBar'></div>");
    $(document).append(downloadBar);
    downloadBar.load(fileurl);
  }
  downloadBar.classList.remove('hide');
}

function closeDownloadBar() {
  downloadBar.classList.add('hide');
}

chrome.runtime.onMessage.addListener(function (message) {
  console.log(message)
  if (message == "showDownloadBar")
    showDownloadBar();
  else if (message == "closeDownloadBar")
    closeDownloadBar();
});

chrome.runtime.sendMessage('isActiveDownloadBar', function (message) {
  if (message)
    showDownloadBar();
});
