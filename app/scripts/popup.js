'use strict';

reciteEx.controller("PopUpCtrl", function ($scope, reciteService) {
    $scope.isReady = false;
    $scope.isAuthenticated = false;
    $scope.userName = "";
    $scope.errorMsg = "";
    $scope.collectMsg = "";
    $scope.reciteDomain = "https://recite.io/";

    checkAuthenticated();

    function getResults() {
        chrome.tabs.query({active:true}, function(tab) {
            if (tab && tab.length > 0 && tab[0].url) {
                $scope.currentUrl = tab[0].url;

                reciteService.getInfo($scope.currentUrl, "", function(data, status) {
                    $scope.message = status;
                    $scope.images = data;
                });
            }
            else {
                $scope.message = "Error, can't find current tab.";
            }
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

    $scope.capture = function() {
        $scope.collectMsg = "Sorry, this feature is not available yet.  I should have labeled the button, 'Capture Later!'";
    }

});
