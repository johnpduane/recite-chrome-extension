'use strict';

reciteEx.service('reciteService', function($http) {
//    var reciteDomain = "https://localhost:3001/";
//    var reciteDomain = "https://stage.recite.io/";
    var reciteDomain = "https://recite.io/";

    this.getInfo = function(url, searchDate, callback) {
        var postData = {
            url: url
        };
        if (searchDate !== "") postData.date = searchDate;
        $http.post(
                reciteDomain + 'searchpicurl',
                postData
            ).
            success(function(data, status) {
                callback(data, status);
            }).
            error(function(data, status) {
                callback(data, status);
            })
    };

    this.getTypes = function(callback) {
        $http.get(
                reciteDomain + 'deltatypes'
            ).
            success(function(data, status) {
                callback(data, status);
            }).
            error(function(data, status) {
                callback(data, status);
            })
    };

    this.getRecitals = function(callback) {
        $http.get(
                reciteDomain + 'deltadefinitions'
            ).
            success(function(data, status) {
                callback(data, status);
            }).
            error(function(data, status) {
                callback(data, status);
            })
    };

    this.getAuthenticationStatus = function(callback) {
        $http.get(
                reciteDomain + 'isAuthenticated'
            ).
            success(function(data, status) {
                callback(data, status);
            }).
            error(function(data, status) {
                callback(data, status);
            })
    };

    this.signIn = function(name, pwd, callback) {
        $http.post(
            reciteDomain + 'login',
            {
                'username': name,
                'password': pwd
            }
        ).
            success(function(data, status) {
                callback(data, status);
            }).
            error(function(data, status) {
                callback(data, status);
            })
    }

    this.signOut = function() {
        $http.get(reciteDomain + 'logout');
    }

});
