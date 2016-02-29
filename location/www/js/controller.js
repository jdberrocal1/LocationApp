/**
 * Created by jberrocal-as on 29/02/2016.
 */
angular.module('starter.controllers', ['ionic'])
  .controller('MapCtrl', ['$scope', function($scope) {
    $scope.user = {};

    $scope.saveDetails = function(){
      var lat = $scope.user.latitude;
      var lgt = $scope.user.longitude;
      var des = $scope.user.desc;

      // Code to write to Firebase will be here
    }


  }])

  .directive('map', function($cordovaGeolocation) {
    return {
      restrict: 'A',
      link:function(scope, element, attrs){

        var pos={
          zValue: scope.$eval(attrs.zoom),

        lat: scope.$eval(attrs.lat),
        lng: scope.$eval(attrs.lng)
      }
        var posOptions = {timeout: 3000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            pos.lat  = position.coords.latitude
            pos.lng = position.coords.longitude


            var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
              mapOptions = {
                zoom: pos.zValue,
                center: myLatlng
              },
              map = new google.maps.Map(element[0],mapOptions);

            marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              draggable:true
            });

            google.maps.event.addListener(marker, 'dragend', function(evt){

              scope.$parent.user.latitude = evt.latLng.lat();
              scope.$parent.user.longitude = evt.latLng.lng();
              scope.$apply();

              console.log('Current Latitude:',evt.latLng.lat(),'Current Longitude:',evt.latLng.lng());

            });


          }, function(err) {
            // error
            console.log(err);
          });





      }
    };
  });
