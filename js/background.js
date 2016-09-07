/**
* @Author: Maxime Allanic <mallanic>
* @Date:   04/09/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 07/09/2016
*/



/**
 * Created by mallanic on 25/03/16.
 */
(function () {
    'use strict';

    angular.module('downloader')
      .run(onStart);

      onStart.$inject = ['$list'];
      function onStart($list) {
        var downloadBar = false;
        var refresh = false;

        chrome.downloads.setShelfEnabled(false);
        chrome.downloads.onCreated.addListener(function (item) {
          if (item.state != "interrupted"
            && item.state != "complete"
            && item.url.match(/^(http|ftp|magnet)/)
            && item.mime != "application/pdf") {
            findTab(item.referrer);
            $list.addUri([item.url]);
            chrome.downloads.cancel(item.id, function (t) {
              chrome.downloads.removeFile(item.id);
            });
          }
        });

        function findTab(referrer) {
          chrome.tabs.query({
            url: referrer
          }, function (tab) {
            chrome.tabs.executeScript(tab[0].id, {
              file: "js/content.js"
            });
            tab[0]
          });
        }

        function onUpdated(tab) {
          if (tab.url == "chrome://downloads/") {
            console.log(tab);
            chrome.tabs.update(tab.id, {
              url: chrome.extension.getURL("index.html")
            });
          }
        }

        chrome.tabs.onCreated.addListener(onUpdated);
        chrome.tabs.onUpdated.addListener(function (id, changeInfo, tab) {
            onUpdated(tab);
        });
      }
})();
