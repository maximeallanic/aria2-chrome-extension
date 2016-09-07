/**
 * Created by mallanic on 25/03/16.
 */
(function () {
  //  'use strict';

    angular.module('downloader', [
      'ngMaterial',
      'ngMdIcons',
      'ngAnimate'
    ])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey');
    });
})();
