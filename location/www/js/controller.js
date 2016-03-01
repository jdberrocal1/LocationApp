/**
 * Created by jberrocal-as on 29/02/2016.
 */
angular.module('starter.controllers', ['ionic'])
  .controller('MapCtrl', ['$scope','$timeout','$cordovaGeolocation', function($scope,$timeout,$cordovaGeolocation) {
    $scope.user = {};

    $scope.saveDetails = function(){
      var lat = $scope.user.latitude;
      var lgt = $scope.user.longitude;
      var des = $scope.user.desc;

    }

    var posOptions = {timeout: 3000, enableHighAccuracy: true};
    var flag=false;



    $scope.onTimeout = function(){
      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {

          var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          mapOptions = {
            zoom: 13,
            center: myLatlng
          };
          if(!flag) {
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            flag=true;
          }else{
            marker.setMap(null);
            $scope.map.setCenter(myLatlng);
          }

          marker = new google.maps.Marker({
            position: myLatlng,
            map: $scope.map,
            draggable:true
          });


          google.maps.event.addListener(marker, 'dragend', function(evt){

            console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());

          });


        }, function(err) {
          // error
          console.log(err);
        });
      mytimeout = $timeout($scope.onTimeout,5000);
    }
    var mytimeout = $timeout($scope.onTimeout,5000);



  }]);

