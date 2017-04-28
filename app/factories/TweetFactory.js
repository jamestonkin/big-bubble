'use strict';

app.factory("TweetFactory", ($q, $http, FBCreds) => {

  // let getTweets = () => {
  //   var tweets16 = $http.get('../../data/tweets15-16.json'),
  //       tweets17 = $http.get('../../data/tweets-17.json');
  //   $q.all([tweets16, tweets17]).then(function(result) {
  //     var tweets = [];
  //     angular.forEach(result, function(reponse) {
  //       tweets.push(response.data);
  //     });
  //     return tweets;
  //   }).then(function(result) {
  //     $scope.allTweets = result.join(", ");
  //     console.log("ALL TWEETS: ", $scope.allTweets);
  //   });
  // }

  let getTweets16 = () => {
    return $q((resolve, reject) => {
      let tweets16 = [];
      $http.get('../../data/tweets15-16.json')
      .then((tweetObject) => {
        let tweetCollection = tweetObject.data;
        Object.keys(tweetCollection).forEach((key) => {
          tweets16.push(tweetCollection[key]);
        });
        resolve(tweets16);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  let getTweets17 = () => {
    return $q((resolve, reject) => {
      let tweets17 = [];
      $http.get('../../data/tweets-17.json')
      .then((tweetObject) => {
        let tweetCollection = tweetObject.data;
        Object.keys(tweetCollection).forEach((key) => {
          tweets17.push(tweetCollection[key]);
        });
        resolve(tweets17);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };


  return {getTweets16, getTweets17};

}); // End Factory
