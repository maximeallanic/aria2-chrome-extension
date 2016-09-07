/**
* @Author: Maxime Allanic <mallanic>
* @Date:   04/09/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 04/09/2016
*/



angular.module('downloader')
.filter('humanize', function(){
  function byte(number) {
    if(number < 1000) {
        return number;
    }
    var si = ['K', 'M', 'G', 'T', 'P', 'H'];
    var exp = Math.floor(Math.log(number) / Math.log(1000));
    var result = number / Math.pow(1000, exp);
    result = (result % 1 > (1 / Math.pow(1000, exp - 1))) ? result.toFixed(2) : result.toFixed(0);
    return result + si[exp - 1];
  }

  function time(time) {

    var year  = Math.floor(time / 31536000);
    time = time % 31536000;

    var month = Math.floor(time / 2592000);
    time = time % 2592000;

    var day = Math.floor(time / 86400);
    time = time % 86400;

    var hour = Math.floor(time / 3600);
    time = time % 3600;

    var minute = Math.floor(time / 60);
    var second = time % 60;

    return (year > 0 ? (year + ' Années, ') : '') +
      (month > 0 ? (month + ' Mois, ') : '') +
      (day > 0 ? (day + ' Jours, ') : '') +
      (hour > 0 ? (hour + ' Heures, ') : '') +
      (minute > 0 ? (minute + ' Minutes, ') : '') +
      (second > 0 ? (Math.round(second) + 's') : '');
  }

  return function (number, type) {
      if (type == "byte")
        return byte(number);
      else if (type == "time")
        return time(number);
  };
});
