(function() {
  'use strict';


  /**
   * @ngdoc function
   * @name feedApp.filter:slice
   * @description Function to filter the range of chapters to watch at same time
   * # slice
   * Filter of the feedApp
   */
  angular
    .module('feedApp')
    .filter('slice', function() {
      return function(arr, start, end) {
        if (arr) {
          return arr.slice(start, end);  
        }
      };
    });

})();
