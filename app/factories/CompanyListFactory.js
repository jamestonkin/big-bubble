'use strict';

app.factory("CompanyListFactory", ($q, $http, FBCreds) => {

  let getUserCoList = (userKey) => {
    let companyList = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users/${userKey}/preferences.json`)
			.then((compObject) => {
				let userCompanies = compObject.data;
				console.log('User COMPANIES: ', userCompanies);
        Object.keys(userCompanies).forEach((key) => {
					// companies[key].id = key;
					companyList.push(userCompanies[key]);
				});
				resolve(userCompanies);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

    return {getUserCoList};

}); // End Factory
