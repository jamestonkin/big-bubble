'use strict';

app.factory("CompanyListFactory", ($q, $http, FBCreds) => {
  console.log("hello from CoListfactory");

  let getCompanyList = () => {
		let companyList = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/companies.json`)
			.then((compObject) => {
				let companies = compObject.data;
				console.log('COMPANIES', companies);
				Object.keys(companies).forEach((key) => {
					// companies[key].id = key;
					companyList.push(companies[key]);
				});
				resolve(companyList);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

  let setPreferences = (userKey, userObjectToEdit) => {
		return $q((resolve, reject) => {
			$http.patch(`${FBCreds.databaseURL}/users/${userKey}.json`,
				JSON.stringify(userObjectToEdit))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});

	};

  return {getCompanyList, setPreferences};

}); // End Factory
