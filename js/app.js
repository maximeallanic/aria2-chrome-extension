/**
* @Author: Maxime Allanic <mallanic>
* @Date:   22/08/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 08/09/2016
*/



/**
 * Created by mallanic on 25/03/16.
 */
(function () {
  //  'use strict';

    angular.module('downloader', [
      'ngMaterial',
      'ngMdIcons',
      'ngAnimate',
      'pascalprecht.translate'
    ])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('blue-grey');
    })
    .config(function ($translateProvider) {
      $translateProvider.useMessageFormatInterpolation();
      $translateProvider.useStaticFilesLoader({
          prefix: '/lang/',
          suffix: '.json'
      });
      $translateProvider.preferredLanguage('fr');
    });
})();
