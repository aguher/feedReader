(function() {
  'use strict';


  /**
   * @ngdoc function
   * @name feedApp.controller:MainCtrl
   * @description  Controller to get the information through URL and display the videos
   * # MainCtrl
   * Controller of the feedApp
   */
  angular
    .module('feedApp')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['FeedService','$sce'];


    function MainCtrl(FeedService,$sce) {
      var vm = this;

      // Initialization of the main variables
      // ------------------------------------
      // Contain the URL with the information of podcast
      vm.url = '';
      // Current clip to watch
      vm.currentClip = 0;
      // Position of cursor
      vm.iterator = 0;
      // First position of range
      vm.beginClip = 0;
      // Last position of range
      vm.endClip = 4;
      // Boolean that indicates if chapter is being played
      vm.clipPlayed = false;
      // Length of entries
      vm.lengthChapters = 0;

      /**
      * Function to control the event of press key
      * -case 40: Key Down
      * -case 38: Key Up
      * -case 13: Enter
      * @method keyup
      * @param {event} keyEvent, key pressed
      */
      vm.keyup = function(keyEvent) {
        switch (keyEvent.keyCode) {
          case 40:
            vm.focus();
            vm.nextClip();
            break;
          case 38:
            vm.focus();
            vm.previousClip();
            break;
          case 13:
            vm.focus();
            vm.pressEnter();
            break;
        }
      };

      /**
      * Initialization of counters to control the chapter selected
      * @method initCounters
      *
      */
      vm.initCounters = function() {
        vm.iterator = 0;
        vm.currentClip=0;
        vm.beginClip=0;
        vm.endClip=4;
        vm.lengthChapters = 0;
        vm.clipPlayed = false;
      };

      /**
      * Call to service to get the information of RSS
      * @method loadFeed
      * @params {String} value, url where from get the information
      *
      */
      vm.loadFeed=function(value){
        vm.initCounters();
        // If there is a video element, then Pause it
        if (vid) {
          vid.pause();
        }
        if(value) {
          FeedService.parseFeed(value).then(function(res){
            if(res.data.responseData){
              vm.feed=res.data.responseData.feed;
              vm.lengthChapters = vm.feed.entries.length;
            }
            else {
              vm.feed = '';
            }
          });

        }
      };

      /**
      * Get focus of input and select the content to allow to write some URL
      * @method focus
      */
      vm.focus = function() {
        angular.element('#text-feed').trigger('focus');
        angular.element('#text-feed').trigger('select');
      };

      /**
      * Update the object 'current' with the value of video and description
      * @method selectClip
      * @param {object} selectedItem
      */
      vm.selectClip = function (selectedItem) {
        if(selectedItem) {
          vm.clipPlayed = true;
          vm.current = {
            'description' : vm.getDescription(selectedItem.content),
            'link_video' : selectedItem.link
          };
        }
      };

      /**
      * Go forward through the chapters list
      * @method nextClip
      */
      vm.nextClip = function () {
        // If we are not on next button
        if (vm.currentClip < vm.feed.entries.length) {
          if(vm.iterator !== 5) {
            if(vm.iterator < vm.feed.entries.length){
              vm.iterator ++;
            }
            if(vm.iterator > 0 && vm.iterator < 5) {
              vm.currentClip++;
            }
          }
        }
        // Else: Not increase the iterator

      };

      /**
      * Update the variables to draw the next range of chapters
      * @method nextRangeClips
      */
      vm.nextRangeClips = function () {
        // Place the iterator on the first position
        vm.iterator = 0;
        vm.beginClip = vm.beginClip + 4;
        vm.endClip = vm.endClip + 4;
      };

      /**
      * Update the variables to draw the previous range of chapters
      * @method nextRangeClips
      */
      vm.previousRangeClips = function () {
        // Place the iterator on the last possible position
        vm.iterator = 4;
        vm.beginClip = vm.beginClip - 4;
        vm.endClip = vm.endClip - 4;
      };

      /**
      * Update the variables to move the iterator at the previous chapter
      * @method previousClip
      */
      vm.previousClip = function () {
        // If we are not on previous button
        if(vm.iterator !== 0) {
          if(vm.iterator > 0 && vm.iterator < 5) {
            vm.currentClip--;

          }
          if(vm.iterator > 0){
            vm.iterator --;
          }
        }
      };

      /**
      * Get the event of Enter Key. There are three cases:
      * - If iterator is 5, means that we are placed on next button
      * - If iterator is 0, means that we are placed on previous button
      * - If iterator is between 0 and 5, means that we are placed on some chapter
      * @method nextRangeClips
      */
      vm.pressEnter = function(){
        if(vm.iterator === 5) {
          vm.nextRangeClips();
          return false;
        }
        if(vm.iterator === 0 && vm.beginClip > 0) {
          vm.previousRangeClips();
          return false;
        }
        if(vm.iterator > 0 && vm.iterator < 5) {
          vm.selectClip(vm.feed.entries[vm.currentClip-1]);
        }

      };

      /**
      * The content of description is a HTML content, so split the content
      * to get the information
      * @method getDescription
      * @param {String} content, value of description
      *
      * @return {String} description of selected video
      */
      vm.getDescription = function (content) {
        return content.split('<')[0];
      };

      /**
      * Filter the url video
      * @method trustSrc
      * @param {String} src, video url
      *
      * @return {String} url formatted
      */
      vm.trustSrc = function(src) {
        if(src) {
          return $sce.trustAsResourceUrl(src);
        }
      };


      /**
      ** INITIALIZATION 
      */
      // Get the focus of input
      vm.focus();
      // Check if exists a video layer
      var vid = document.getElementById('clip_player');
    }
})();
