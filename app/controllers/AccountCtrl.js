'use strict';

app.controller("AccountCtrl", function($scope, AuthFactory, UserFactory, AccountFactory, $routeParams, $location) {

  $scope.heading = "Select Companies to Track";
  let user = AuthFactory.getUser();
  let userObjectToEdit;
  let userKey;


   $scope.arrayOfCompanies = {
     preferences: []
   };

   $scope.uncheckAll = function() {
    $scope.arrayOfCompanies.preferences = [];
  };

  $scope.checkAll = function() {
    $scope.arrayOfCompanies.preferences = $scope.companies.map(function(item) { return item.id; });
  };

	AccountFactory.getCompanyList()
	.then( function(compList) {
		$scope.companies = compList;
	});

  $scope.saveCompanies = function() {
    UserFactory.getUserKey(user)
    .then ((result) => {
      for(var key in result.data) {
        userKey = key;
        userObjectToEdit = result.data[key];
        userObjectToEdit.preferences = $scope.arrayOfCompanies.preferences;
      }
      AccountFactory.setPreferences(userKey, userObjectToEdit)
      .then(()=>{
        $location.url("/companylist");
      });
    });
  };


}); // End Ctrl
