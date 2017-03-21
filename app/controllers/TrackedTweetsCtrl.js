'use strict';

app.controller("TrackedTweetsCtrl", function($scope, $q, $http, AuthFactory, UserFactory, AccountFactory, CompanyListFactory, TweetFactory, $routeParams, $location) {

  console.log($routeParams.companyId);

  $scope.companyPage = [];
  $scope.companyTweets = [];

  AccountFactory.getCompanyList()
	.then( function(compList) {
		let companies = compList;
    console.log('Full company list: ', companies);
    for (var i = 0; i < companies.length; i++) {
      if ($routeParams.companyId === companies[i].id) {
        $scope.companyPage.push(companies[i]);
        console.log('Company Page Array: ', $scope.companyPage);
        console.log('This Page Company Name: ', $scope.companyPage[0].name);
        console.log('Company Keywords: ', $scope.companyPage[0].keywords);
      }
    }
    var tweets16 = $http.get('../../data/tweets15-16.json'),
        tweets17 = $http.get('../../data/tweets-17.json');
    $q.all([tweets16, tweets17])
    .then(function(result) {
      console.log('Tweet RESULT: ', result);
      var tweets = [];
      angular.forEach(result, function(response) {
        console.log('Tweet RESPONSE: ', response);
        tweets.push(response.data);
      });
      return tweets;
    }).then(function(tweetsResult) {
      console.log("tweetsResult: ", tweetsResult);
      let everyTweet = tweetsResult[0].concat(tweetsResult[1]);
      console.log("everyTweet: ", everyTweet);
      $scope.allTweets = [];
      Object.keys(everyTweet).forEach((key) => {
        $scope.allTweets.push(everyTweet[key]);
      });
      console.log("ALL TWEETS TEXT: ", $scope.allTweets[0].text);
      $scope.getCompanyTweets();
    });
	});

  let wordInString = function (s, word) {
    return new RegExp( '\\b' + word + '\\b', 'i').test(s);
  };

  $scope.getCompanyTweets = function() {
    for (var i = 0; i < $scope.companyPage[0].keywords.length; i++) {
      console.log('$scope.companyPage individual keywords: ', $scope.companyPage[0].keywords[i]);
      for (var j = 0; j < $scope.allTweets.length; j++) {
        var matches = wordInString($scope.allTweets[j].text, $scope.companyPage[0].keywords[i]);
        if (matches === true) {
          $scope.companyTweets.push($scope.allTweets[j]);
          console.log("COMPANY TWEETS: ", $scope.companyTweets);
        }
      }
    }
  };


}); // End Ctrl
