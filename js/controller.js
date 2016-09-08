/**
* @Author: Maxime Allanic <mallanic>
* @Date:   22/08/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 08/09/2016
*/

(function () {
    'use strict';

    angular.module('downloader')
      .controller("MainCtrl", MainCtrl);

    MainCtrl.$inject = ['$list', '$scope', '$interval', '$mdDialog', '$filter'];
    function MainCtrl($list, $scope, $interval, $mdDialog, $filter) {
      $scope.list = [];

      $scope.getList = function () {
        var methods = [
          {
            "methodName": "aria2.tellActive"
          },
          {
            "methodName": "aria2.tellWaiting",
            "params": [0, 10]
          },
          {
            "methodName": "aria2.tellStopped",
            "params": [0, 10]
          },
          {
            "methodName": "aria2.getGlobalOption"
          }
        ];
        //methods = JSON.stringify(methods);
        $list.multicall(methods).then(function (data) {
          var listAll = [];
          listAll = listAll.concat(data[0][0]);
          listAll = listAll.concat(data[1][0]);
          listAll = listAll.concat(data[2][0]);
          $scope.options = data[3][0];
          $scope.list = listAll;
        });
      }

      $scope.toggleItem = function (item) {
        if (item.status == 'active')
          $list.forcePause(item.gid).then($scope.getList);
        else
          $list.unpause(item.gid).then($scope.getList);
      }

      function confirm(title, message) {
        return $mdDialog.show(
          $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title(title)
            .textContent(message)
            .ariaLabel('Prompt')
            .ok('Oui')
            .cancel('Non')
        );
      }

      $scope.retry = function (item) {
        var uri = $scope.getUrl(item);
        if (uri.length <= 0)
          return ;
        $list.addUri([uri]);
      }

      $scope.remove = function (item, showPrompt) {
        function remove() {
          if (item.status == 'complete' || item.status == 'error')
            $list.removeDownloadResult(item.gid).then($scope.getList);
          else
            $list.forceRemove(item.gid).then($scope.getList);
          $('[item="' + item.gid + '"]').addClass('remove_waiting');
        }
        if (showPrompt) {
          confirm('Voulez-vous vraiment supprimer ce téléchargement', 'Celui-ci ne sera pas récupérable.').then(remove);
        }
        else {
          remove();
        }

      }

      $scope.setPosition = function (item, position) {
        console.log(item);
        $list.changePosition(item.gid, position, 'POS_SET').then(console.log);
      }

      $scope.isAllPaused = function () {
        var array = $filter('filter')($scope.list, {'status': 'active'});
        return array.length == 0;
      }

      $scope.toggleAll = function () {
        if ($scope.isAllPaused())
          $list.unpauseAll();
        else
          $list.pauseAll();
      }

      $scope.getName = function (item) {
        if (item.bittorrent)
          return item.bittorrent.info.name;
        return item.files[0].path.split('/').reverse()[0];
      }

      $scope.getUrl = function (item) {
        if (item.files.length <= 0
          || !item.files[0].hasOwnProperty('uris')
          || item.files[0].uris.length <= 0
          || !item.files[0].uris[0].hasOwnProperty('uri'))
          return "";
        return item.files[0].uris[0].uri;
      }

      $scope.openFile = function (item) {
        $list.openFile(item.gid);
      }

      $scope.search = function (entry) {
        for (var i = 0; i < entry.length; i++) {
          if (Array.isArray(entry[i]) && $scope.search(entry[i]))
            return true;
          else if (entry[i].indexOf($scope.searchInput) >= 0)
            return true;
        }
        return false;
      }

      $scope.removeAllFinished = function () {
        $list.purgeDownloadResult().then(function () {
          $scope.getList();
        });
      }

      $scope.setOption = function () {
        $list.changeGlobalOption($scope.options);
      }

      $scope.openMainDownloadPage = function () {
        var url = chrome.extension.getURL('view/index.html');
        window.open(url).location.href = url;
      };

      $scope.getBannerLimit = function () {
        return Math.floor(angular.element("#listDownload").width() / 350);
      }

      $scope.showOptions = function ($event) {
        optionController.$inject = ['$scope', '$list'];
        function optionController($scope, $limit) {
          chrome.storage.sync.get('options', function (options) {
            options = options.options;
            if (!options.hasOwnProperty('host'))
              $scope.options = {
                host: 'localhost',
                'rpc-listen-port': 6800,
                'rpc-secure': false,
                'rpc-secret': false,
              };
            else
              $scope.options = options;
            console.log($scope.options);
            $list.getGlobalOption().then(function (options) {
              $scope.options = angular.extend($scope.options, options);
            });
          })




          $scope.setOption = function () {
            chrome.storage.sync.set({
              'options': $scope.options
            });
            $list.changeGlobalOption($scope.options);
          }
        }
        $mdDialog.show({
          controller: optionController,
          templateUrl: 'view/options.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true,
          fullscreen: true
        });
      }

      $scope.getList();
      $interval($scope.getList, 1000);
    }


})();
