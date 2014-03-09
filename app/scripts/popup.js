'use strict';

reciteEx.controller("PopUpCtrl", function ($scope, reciteService) {
    $scope.isReady = false;
    $scope.isAuthenticated = false;
    $scope.userName = "";
    $scope.errorMsg = "";
    $scope.reciteDomain = "https://recite.io/";
//    $scope.reciteDomain = "https://localhost:3001/";

    checkAuthenticated();

    function getResults() {
        chrome.tabs.query({active:true}, function(tab) {
            if (tab && tab.length > 0 && tab[0].url) {
                $scope.currentUrl = tab[0].url;

                reciteService.getInfo($scope.currentUrl, "", function(data, status) {
                    $scope.message = status;
                    $scope.images = data;
                    $scope.currentUrl = encodeURIComponent($scope.currentUrl); //encode for Capture Now feature
                });
            }
            else {
                $scope.message = "Error, can't find current tab.";
            }
        });
    }

    function getPicType() {
        $scope.picType = "528575e9b77423fd017cf53d"; //PROD value; default to this
        reciteService.getTypes(function(data, status) {
            if (status === 200 && data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].code === 'pic') {
                        $scope.picType = data[i]._id;
                    }
                }
            }
        });
    }

    function getRecitals() {
        reciteService.getRecitals(function(data, status) {
            $scope.recitals = data;
        });
    }

    function checkAuthenticated() {
        $scope.isAuthenticated = false;
        $scope.userName = "";
        reciteService.getAuthenticationStatus(function(data, status) {
            if (status == 200 && data.isAuthenticated === true) {
                $scope.isAuthenticated = true;
                $scope.userName = data.username;
                getResults();
                getRecitals();
                getPicType();
            }
            $scope.isReady = true;
        })
    }

    $scope.login = function() {
        reciteService.signIn($scope.userName, $scope.password, function(data, status) {
            if (status == 200) {
                checkAuthenticated();
                $scope.password = "";
            }
            else {
                $scope.errorMsg = "Error signing in, please try again. Error: " + status;
                $scope.password = "";
            }
        })
    };

    $scope.logout = function() {
        reciteService.signOut();
        $scope.isAuthenticated = false;
        $scope.userName = "";
    };

});
