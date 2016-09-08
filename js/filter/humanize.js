/**
* @Author: Maxime Allanic <mallanic>
* @Date:   04/09/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 08/09/2016
*/

(function () {

  angular.module('downloader')
  .filter('humanize', humanize);

  humanize.$inject = ['$translate', '$q'];
  function humanize ($translate, $q){
    function byte(number) {
      if(number < 1000)
        return number;

      var si = ['K', 'M', 'G', 'T', 'P', 'H'];
      var exp = Math.floor(Math.log(number) / Math.log(1000));
      var result = number / Math.pow(1000, exp);
      result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);

      return result + si[exp - 1];
    }

    function time(timeBase) {

      function moduleTime(elements, time, arrayC, content) {
        if (arrayC == undefined)
          arrayC = [];
        if (content == undefined)
          content = {};

        var e = elements.shift();

        content[e.name] = Math.floor(time / e.modulo);

        if (e.hasOwnProperty("conditional") && e.conditional(content)) {

          time = time % e.modulo;

          arrayC.push($translate.instant("main.time." + e.name, content));
        }
        if (elements.length > 0)
          moduleTime(elements, time, arrayC, content);
        return arrayC;
      }

      return moduleTime([
        {
          modulo: 31536000,
          name: "year",
          conditional: function (content) { return content["year"] > 0 }
        },
        {
          modulo: 2592000,
          name: "month",
          conditional: function (content) { return content["month"] > 0 }
        },
        {
          modulo: 86400,
          name: "day",
          conditional: function (content) { return content["year"] < 1 && content["day"] > 0 }
        },
        {
          modulo: 3600,
          name: "hour",
          conditional: function (content) { return content["hour"] > 0 && content["month"] < 1}
        },
        {
          modulo: 60,
          name: "minute",
          conditional: function (content) { return content["day"] < 1 && content["month"] < 1 && content["year"] < 1 }
        },
        {
          modulo: 1,
          name: "second",
          conditional: function (content) { return content["hour"] < 1 && content["day"] < 1 && content["month"] < 1 && content["year"] < 1 }
        }
      ], timeBase).join(', ');
    }

    return function (number, type) {
        if (type == "byte")
          return byte(number);
        else if (type == "time")
          return time(number);
    };
  }
})();
