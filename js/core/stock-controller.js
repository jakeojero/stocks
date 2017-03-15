var StockController = function($scope, $http, stock) {



    $scope.loading = false;
    $scope.symbols = undefined;

    var onSuccess = function(stocks) {
        $scope.error = undefined;
        $scope.symbols = stocks;
        $scope.loading = false;
    };

    var onFailure = function(error) {
        $scope.symbols = undefined
        $scope.error = 'Could not find that stock symbol.';
        $scope.loading = false;
    };


    $scope.search = function(stocks) {
        $scope.loading = true;
        stock.getStocks(stocks).then(onSuccess, onFailure);
    };

    $scope.createcsv = function() {

        var obj = [];

        if (typeof $scope.symbols === 'undefined')
            $scope.error = "No data to export, make sure you search for a valid symbol";
        else {
            $scope.symbols.forEach(function(stock) {
                obj.push({
                    "Symbol": stock.t,
                    "ClosingPrice": stock.l_cur
                })
            });

            JSONtoCSVConverter(obj, 'JakesStockTest', false);
        }

        return;

    }

    $scope.stocks = "TSE:NA, TSE:CM, TSE:BMO, TSE:TD, TSE:BNS, TSE:RY";



};

app.controller("StockController", StockController);