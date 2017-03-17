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
      console.log('Result: ', result.data);
      for(var key in result.data) {
        userKey = key;
      }
      console.log('User Key: ', userKey);
      CompanyListFactory.getUserCoList(userKey)
      .then((response)=>{
        console.log('CTRL User Companies: ', response);
        userCompanyPreferences = response;
        console.log("userCompanyPreferences: ", userCompanyPreferences);
        AccountFactory.getCompanyList()
      	.then( function(compList) {
      		fullCompanyList = compList;
          console.log("Full Company List: ", fullCompanyList);
          $scope.getUserCompanyList(userCompanyPreferences, fullCompanyList);
      	});
      });
    });
  };

  $scope.getUserCompanyList = function(userCompanyPreferences, fullCompanyList) {
    for (var i = 0; i < userCompanyPreferences.length; i++) {
      console.log('Scope of userCompanyPreferences', userCompanyPreferences[i]);
      for (var j = 0; j < fullCompanyList.length; j++) {
        if (userCompanyPreferences[i] === fullCompanyList[j].id) {
          $scope.userCompanyList.push(fullCompanyList[j]);
          console.log("Scope of userCompanyList: ", $scope.userCompanyList);
        }
      }
    }
  };

  $scope.getUserCompanies();

}); // End Ctrl
