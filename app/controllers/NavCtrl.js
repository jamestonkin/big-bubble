'use strict';

app.controller("NavCtrl", function($scope, $window) {
  $scope.isLoggedIn = false;

  // Add a listener for login/logout to show/hide nav items
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      console.log('currentUser logged in', $scope.isLoggedIn);
    } else {
      $scope.isLoggedIn = false;
      console.log('currentUser logged in', $scope.isLoggedIn);
      // $window.location forces the page to completely reload
      $window.location.href = "#!/login";
    }
  });

}); // End Ctrl
