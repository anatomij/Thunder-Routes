angular.module('roadtrippin.mapsFactory', [])

  .factory('mapFactory', function($http, $q, $window, $location) {

    //send endpoints and array of waypoints to the server
    var saveJourneyWithWaypoints = function (tripObject) {
      var journey = angular.toJson(tripObject);
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/journey',
        data: journey
      }).then(function (res) {
        deferred.resolve (res);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };

    var deleteJourney = function (journeyId) {
      return $http({
        method: 'DELETE',
        url: '/api/journey/' + journeyId
      })
    };

    var getAllRoutes = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/journey'
      }).then(function (res) {
        deferred.resolve (res.data);
      }).catch(function (err) {
        deferred.reject (err);
      });
      return deferred.promise;
    };

    var signout = function() {
      $window.localStorage.removeItem('com.roadtrippin');
      $location.path('/signin');
    };

    return {
      saveJourneyWithWaypoints: saveJourneyWithWaypoints,
      deleteJourney: deleteJourney,
      getAllRoutes: getAllRoutes,
      signout: signout
    };
  });
