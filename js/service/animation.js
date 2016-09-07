/**
* @Author: Maxime Allanic <mallanic>
* @Date:   22/08/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 06/09/2016
*/



(function () {
    'use strict';
    angular
      .module('downloader')
      .animation('.slide-down', slideDown)
      .animation('.card-support', cardSupport);

    slideDown.$inject = ["$animateCss"];
    function slideDown($animateCss) {
      return {
        removeClass: function (element, className, done) {
          if (className == 'ng-hide')
            return $animateCss(element, {
              to: {
                'margin-bottom': 0,
                'opacity': 1
              },
              '50%': {
                'margin-bottom': 0,
                'opacity': 0
              },
              from: {
                'margin-bottom': "-" + element.height() + "px",
                'opacity': 0
              }
            });
          else
            done();
        },
        addClass: function (element, className, done) {
          if (className == 'ng-hide')
            return $animateCss(element, {
              from: {
                'margin-bottom': 0,
                'opacity': 1
              },
              to: {
                'margin-bottom': "-" + element.height() + "px",
                'opacity': 0
              }
            });
          else
            done();
        }
      };
    }

    cardSupport.$inject = ["$animateCss"];
    function cardSupport($animateCss) {
      return {
        enter: function (element, done) {
          $animateCss(element, {
            from: {
              'max-height': 0,
              opacity: 0
            },
            to: {
              'max-height': element.height() + "px",
              opacity: 1
            },
            duration: 0.5,
            easing: "ease-in-out"
          }).start().then(function () {
            done();
            element.attr('style', '');
          });
        },
        leave: function (element, done) {
          return $animateCss(element, {
            from: {
              'max-height': element.height() + "px",
              opacity: 1
            },
            to: {
              'max-height': 0,
              opacity: 0
            },
            duration: 0.5,
            easing: "ease-in-out"
          });
        },
        /*move: function (element, done) {
          var parent = element.parent();
          var height = element.height();
          element.css({heigh: height});
          var item = element.find('.item');
          var offsetLeft = element.prop('offsetLeft');
          var offsetTop = element.prop('offsetTop');
          parent.prepend(item);
          item.css({
            'position': 'absolute',
            'left': offsetLeft,
            'top': offsetTop
          });
          return function () {
            $animateCss({
              from: {
                'left': offsetLeft,
                'top': offsetTop
              },
              to: {
                left: element.prop('offsetLeft'),
                top: element.prop('offsetTop')
              },
              duration: 1
            }).promise.then(function () {
              element.prepend(item);
            });
          };
        }*/
      };
    }
})();
