(function() {

    var stock = function($http, $log) {

        var uri = 'https://crossorigin.me/http://finance.google.com/finance/info?client=ig&q=';

        var getStocks = function(stocks) {

            return $http.get(uri + stocks)
                .then(function(response) {
                    var json = response.data;

                    //Remove New lines and //
                    var jsonFix = json.replace(/[ \/\\n\t\r]+/g, "");
                    $log.info('stock-service: Removing unneded characters ' + jsonFix);

                    var stocks = JSON.parse(jsonFix);
                    $log.info('stock-service: Parsing into and object ' + stocks);

                    return stocks;
                });
        };

        return {
            getStocks: getStocks
        };
    };


    var module = angular.module('StockAPI');
    module.factory('stock', stock);


})();