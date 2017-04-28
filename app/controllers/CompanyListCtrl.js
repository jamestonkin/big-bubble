'use strict';

app.controller("CompanyListCtrl", function($scope, AuthFactory, UserFactory, AccountFactory, CompanyListFactory, $routeParams, $location) {

  $scope.heading = "Companies You Track";
  let user = AuthFactory.getUser();
  let userKey;
  let userCompanyPreferences;
  let fullCompanyList;
  $scope.userCompanyList = [];

  $scope.getUserCompanies = function() {
    UserFactory.getUserKey(user)
    .then ((result) => {
      for(var key in result.data) {
        userKey = key;
      }
      CompanyListFactory.getUserCoList(userKey)
      .then((response)=>{
        userCompanyPreferences = response;
        AccountFactory.getCompanyList()
      	.then( function(compList) {
      		fullCompanyList = compList;
          $scope.getUserCompanyList(userCompanyPreferences, fullCompanyList);
      	});
      });
    });
  };

  $scope.getUserCompanyList = function(userCompanyPreferences, fullCompanyList) {
    for (var i = 0; i < userCompanyPreferences.length; i++) {
      for (var j = 0; j < fullCompanyList.length; j++) {
        if (userCompanyPreferences[i] === fullCompanyList[j].id) {
          $scope.userCompanyList.push(fullCompanyList[j]);
        }
      }
    }
  };

  $scope.getUserCompanies();

}); // End Ctrl
