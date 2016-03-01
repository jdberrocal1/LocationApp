/**
 * Created by jberrocal-as on 29/02/2016.
 */
angular.module('starter.controllers', ['ionic'])
  .controller('MapCtrl', [
    '$scope',
    '$timeout',
    '$cordovaGeolocation',
    '$ionicPlatform',
    '$cordovaNativeAudio',
    function(
      $scope,
      $timeout,
      $cordovaGeolocation,
      $ionicPlatform,
      $cordovaNativeAudio) {

      $ionicPlatform.ready(function(){
        $cordovaNativeAudio.preloadSimple('alert', 'sounds/alert.mp3');
      });

      $scope.alert=false;
      $scope.stop=false;

    var posOptions = {timeout: 3000, enableHighAccuracy: true};
    var flag=false;
    var haveDestination=false;


    var bus = 'img/bus5.png';
    var home = 'img/home.png';

    var map={};
    var destLocation;

      $scope.stopSound = function stopSound(){
        $scope.stop=true;
        $scope.alert=false;
        $cordovaNativeAudio.stop('alert');

      }

    $scope.onTimeout = function(){
      $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function (position) {
          var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          mapOptions = {
            zoom: 13,
            center: myLatlng
          };
          if(!flag) {
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            flag=true;
          }else{
            myPos.setMap(null);
            map.setCenter(myLatlng);
          }

          myPos = new google.maps.Marker({
            position: myLatlng,
            map: map,
            draggable:false,
            icon: bus,
            title:'My Location'
          });

          map.addListener('dblclick', function(e) {
            if(!haveDestination){
              destLocation= e.latLng;
              var dest = new google.maps.Marker({
                position: e.latLng,
                map: map,
                draggable:true,
                icon: home,
                title:'My Location'
              });
              google.maps.event.addListener(dest, 'dragend', function(evt){

                console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());

              });
              haveDestination=true;
            }

          });

          if(haveDestination){
            var distance = google.maps.geometry.spherical.computeDistanceBetween (myLatlng, destLocation);
            if(distance<=100){
              console.log("Wake Up Idiot..!!");
              if(!$scope.stop) {
                $cordovaNativeAudio.play("alert");
                $scope.alert=true;

              }
            }
          }






        }, function(err) {
          // error
          console.log(err);
        });
      mytimeout = $timeout($scope.onTimeout,5000);
    }
    var mytimeout = $timeout($scope.onTimeout,5000);



  }]);

