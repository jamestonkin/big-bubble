'use strict';

app.controller("StockCtrl", function($scope, $filter, $q, $http, AuthFactory, UserFactory, AccountFactory, CompanyListFactory, TweetFactory, StockFactory, $routeParams, $location, $timeout) {

  $scope.stockCo = [];
  $scope.stockTweet = [];
  let fullCompanyList;
  $scope.stockPrice = [];
  $scope.stockDate = [];
  $scope.colors = ["#0d47a1", "#b71c1c"];

  AccountFactory.getCompanyList()
  .then( function(compList) {
    fullCompanyList = compList;
    $scope.getCoPage(fullCompanyList);
  });

  $scope.getCoPage = function(fullCompanyList) {
    for (var i = 0; i < fullCompanyList.length; i++) {
      if ($routeParams.companyId === fullCompanyList[i].id) {
        $scope.stockCo.push(fullCompanyList[i]);
      }
    }
  };

  $scope.getTweetPage = function() {
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
      $scope.setStockTweet();
    });
  };

  $scope.setStockTweet = function() {
    for (var j = 0; j < $scope.allTweets.length; j++) {
      if ($routeParams.tweetId === $scope.allTweets[j].id_str) {
        $scope.stockTweet.push($scope.allTweets[j]);
      }
    }
    $scope.handleDate();
  };

  $scope.handleDate = function() {
    $timeout (function(){
      var dateObj = Date.parse(`${$scope.stockTweet[0].created_at}`);
      var startDateObj = dateObj - (7 * 24 * 60 * 60 * 1000);
      var endDateObj = dateObj + (21 * 24 * 60 * 60 * 1000);
      var startDate = $filter('date')(startDateObj, "yyyy-MM-dd");
      var endDate = $filter('date')(endDateObj, "yyyy-MM-dd");
      StockFactory.getStockQuote($scope.stockCo[0].stock, startDate, endDate)
      .then(function(stockNumbers) {
        $scope.stocks = stockNumbers;
        $scope.stocks.reverse();
        for (var k = 0; k < $scope.stocks.length; k++) {
          $scope.stockPrice.push($scope.stocks[k].Close);
          $scope.stockDate.push($scope.stocks[k].Date);
        }
      });
    }, 1000);
  };

  $scope.getTweetPage();

}); // End Ctrl
