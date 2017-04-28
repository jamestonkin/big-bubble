'use strict';

app.controller("TrackedTweetsCtrl", function($scope, $q, $http, AuthFactory, UserFactory, AccountFactory, CompanyListFactory, TweetFactory, $routeParams, $location) {

  $scope.companyPage = [];
  $scope.companyTweets = [];

  AccountFactory.getCompanyList()
	.then( function(compList) {
		let companies = compList;
    for (var i = 0; i < companies.length; i++) {
      if ($routeParams.companyId === companies[i].id) {
        $scope.companyPage.push(companies[i]);
      }
    }
    var tweets16 = $http.get('../../data/tweets15-16.json'),
        tweets17 = $http.get('../../data/tweets-17.json');
    $q.all([tweets16, tweets17])
    .then(function(result) {
      var tweets = [];
      angular.forEach(result, function(response) {
        tweets.push(response.data);
      });
      return tweets;
    }).then(function(tweetsResult) {
      let everyTweet = tweetsResult[0].concat(tweetsResult[1]);
      $scope.allTweets = [];
      Object.keys(everyTweet).forEach((key) => {
        $scope.allTweets.push(everyTweet[key]);
      });
      $scope.getCompanyTweets();
    });
	});

  let wordInString = function (s, word) {
    return new RegExp( '\\b' + word + '\\b', 'i').test(s);
  };

  $scope.getCompanyTweets = function() {
    for (var i = 0; i < $scope.companyPage[0].keywords.length; i++) {
      for (var j = 0; j < $scope.allTweets.length; j++) {
        var matches = wordInString($scope.allTweets[j].text, $scope.companyPage[0].keywords[i]);
        if (matches === true) {
          $scope.companyTweets.push($scope.allTweets[j]);
        }
      }
    }
  };


}); // End Ctrl
