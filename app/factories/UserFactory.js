'use strict';

app.factory("UserFactory", ($q, $http, FBCreds) => {
  let checkNewUser = (newUser) => {
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${newUser.uid}"`)
      .then((userObject) => {
        let userCollection = Object.keys(userObject.data);
        resolve(userCollection);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let postNewUser = (newUser) =>  {
    return $q((resolve, reject) => {
      $http.post(`${FBCreds.databaseURL}/users.json`,
        JSON.stringify(newUser))
      .then((ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
        })
      .catch((error) => {
        reject(error);
          });
      });
  };

  let getUserKey = (user) => {
    return $q((resolve, reject) => {
      $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`)
      .then((userObject) => {
        resolve(userObject);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };




  return {postNewUser, checkNewUser, getUserKey};

}); // End Factory
