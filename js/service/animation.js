/**
* @Author: Maxime Allanic <mallanic>
* @Date:   22/08/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 08/09/2016
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
        /*enter: function (element, done) {
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
        move: function (container, done) {
          console.log("move", container);
          var item = container.find('.item');
          var parent = container.parent();

          var itemProperty = {
            start: {
              left: container.prop('offsetLeft'),
              top: container.prop('offsetTop'),
              width: item.width(),
              height: item.height(),
              position: 'absolute'
            }
          };
          var containerProperty = {
            start: {
              'max-height': container.height()
            },
            end: {
              'max-height': 0
            }
          };
/**
          item.css(itemProperty.start);
          parent.prepend(item);
          $animateCss(item, {
            from: itemProperty.start,
            to: {
              left: itemProperty.start.width
            }
          });

          $animateCss(container, {
            from: containerProperty.start,
            to: containerProperty.end,
            duration: 1
          }).start().then(function () {
            done();
            $animateCss(container, {
              from: containerProperty.end,
              to: containerProperty.start,
              duration: 1
            }).start();
          });
          return ;
          var parent = element.parent();
          var height = element.height();
          var width = element.width();
          element.css({
            height: height
          });
          var item = element.find('.item');



          item.css(itemProperty);
          done();
          $animateCss(item, {
            from: {
              'left': itemProperty.left,
              'top': itemProperty.top
            },
            to: {
              left: element.prop('offsetLeft'),
              top: element.prop('offsetTop')
            },
            duration: 1000
          }).start().then(function () {
            console.log("end");
            element.prepend(item);
          });
        }*/
      };
    }
})();
