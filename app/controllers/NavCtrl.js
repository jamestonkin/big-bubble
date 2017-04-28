'use strict';

app.controller("NavCtrl", function($scope, $window) {
  $scope.isLoggedIn = false;

  // Add a listener for login/logout to show/hide nav items
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
    } else {
      $scope.isLoggedIn = false;
      // $window.location forces the page to completely reload
      $window.location.href = "#!/login";
    }
  });

}); // End Ctrl
