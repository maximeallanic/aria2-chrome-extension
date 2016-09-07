/**
* @Author: Maxime Allanic <mallanic>
* @Date:   18/08/2016
* @Email:  maxime@allanic.me
* @Last modified by:   mallanic
* @Last modified time: 04/09/2016
*/



(function () {
    'use strict';
    angular
      .module('downloader')
      .factory('$list', list);

    function list() {
      this.list = [];

      this.aria2 = new window.Aria2({});
      console.log(this.aria2);

      var self = this;
      chrome.storage.sync.get('options', function (options) {
        options = options.options;

        self.aria2.host = options.hasOwnProperty('host') ? options['host'] : 'localhost';
        self.aria2.port = options.hasOwnProperty('rpc-listen-port') ? parseInt(options['rpc-listen-port']) : 6800;
        self.aria2.secure = options.hasOwnProperty('rpc-secure') ? JSON.parse(options['rpc-secure']) : false;
        self.aria2.secret = options.hasOwnProperty('rpc-secret') ? options['rpc-secret'] : "";
        self.aria2.path = '/jsonrpc';
        self.aria2.jsonp = false;
        console.log(self.aria2);

        self.aria2.open().then(function (d) {
          console.log(d);
        });
      });




      return this.aria2;
  }
})();
