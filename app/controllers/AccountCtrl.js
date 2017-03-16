'use strict';

app.controller("AccountCtrl", function($scope, AuthFactory, UserFactory, CompanyListFactory, $routeParams, $location) {

  $scope.heading = "Select Companies to Track";
  let user = AuthFactory.getUser();
  console.log('Account Control User: ', user);
  let userObjectToEdit;
  let userKey;


   $scope.arrayOfCompanies = {
     preferences: []
   };

	CompanyListFactory.getCompanyList()
	.then( function(compList) {
		$scope.companies = compList;
	});

  $scope.saveCompanies = function() {
	  console.log("my array of companies: ", $scope.arrayOfCompanies.preferences);
    UserFactory.getUserKey(user)
    .then ((result) => {
      console.log('Result: ', result.data);
      for(var key in result.data) {
        userKey = key;
        userObjectToEdit = result.data[key];
        userObjectToEdit.preferences = $scope.arrayOfCompanies.preferences;
      }
      console.log('User Key: ', userKey);
      CompanyListFactory.setPreferences(userKey, userObjectToEdit)
      .then(()=>{
        $location.url("/companylist");
      });
    });
  };


}); // End Ctrl
