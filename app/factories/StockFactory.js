'use strict';

app.factory("StockFactory", ($q, $http, FBCreds) => {

  let getStockQuote = (ticker, startDate, endDate) => {
    console.log("Ticker: ", ticker);
    let stockQuote = [];
    return $q((resolve, reject) => {
      $http.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${ticker}%22%20and%20startDate%20%3D%20%22${startDate}%22%20and%20endDate%20%3D%20%22${endDate}%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
      .then((stock) => {
				let stockNumbers = stock.data.query.results.quote;
				console.log('Stock Numbers: ', stockNumbers);
				stockQuote.push(stockNumbers);
				resolve(stockNumbers);
			})
			.catch((error) => {
				reject(error);
			});
    });
  };

  return{getStockQuote};

}); // End Factory
