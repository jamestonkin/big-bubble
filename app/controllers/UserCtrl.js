'use strict';

// Login, logout, register, loginGoogle, clever conditional, authfactory
app.controller("UserCtrl", function($scope, $window, AuthFactory, UserFactory, $location) {

  // Run these when controller loads
	$scope.account = {
		email: "",
		password: ""
	};

  let user = null;

  let logout = () => {
		AuthFactory.logoutUser()
		.then(function(data){
			$window.location.url = "#!/login";
		}, function(error){
		});
	};

  // When first loaded, make sure no one is logged in
	if(AuthFactory.isAuthenticated()) {
		logout();
	}

  // Setup functions to be available to the app for register, login email/password, and google
	$scope.register = () => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then( (userData) => {
	      $scope.login();
	    }, (error) => {
	    });
  	};

    $scope.login = () => {
    	AuthFactory
	    .loginUser($scope.account)
	    .then( () => {
	        $window.location.href = "#!/items/list";
	    });
	};

  $scope.loginGoogle = () => {
        AuthFactory.authWithProvider()
        .then(function(result) {
            var user = result.user.uid;
            var newName = result.user.displayName;
            $scope.newUser = {
              uid: user,
              name: newName
            };
            UserFactory.checkNewUser($scope.newUser)
            .then ((userCollection) => {
              let collectionLength = Object.keys(userCollection).length;
              if (collectionLength > 0) {
                $window.location.href = "#!/about";
              } else {
                $scope.addNewUser($scope.newUser);
              }
            });

            //Once logged in, go to another view

        }).catch(function(error) {
            // Handle the Errors.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

        });
    };

    $scope.addNewUser = (newUser) => {
      UserFactory.postNewUser(newUser)
      .then ( () => {
        $window.location.href = "#!/about";
      });
    };

}); // End Ctrl
