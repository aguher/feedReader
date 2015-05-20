(function() {
  'use strict';

  var FeedService;
/**
 * @ngdoc function
 * @name feedApp.service:FeedService
 * @description Service to get the content of RSS in JSON format. It use an Google API
 * # FeedService
 * Service of the feedApp
 */
angular.module('feedApp')
  .factory('FeedService', FeedService);

  FeedService.$inject = ['$http'];

  function FeedService($http) {
    return {
        parseFeed : function(url){
            return $http.jsonp('https://panel.virtualcenter360.es/home/api/getsamplecompanies?');
        }
    }
  }

})();