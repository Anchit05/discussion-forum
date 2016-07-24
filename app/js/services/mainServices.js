'use strict';

forumApp
    .service("ForumServices", function ($localStorage, $location) {
        //Service to save data in local storage in nested form.
        this.saveData = function(parentKey, key, data) {
            var newData = {};
            $localStorage[parentKey] = $localStorage[parentKey] || {};
            newData[key] = data;
            $localStorage[parentKey] = 
                angular.extend($localStorage[parentKey], newData);
        };

        //Service to save data in local storage direct. 
        this.saveParentObj = function(key, data) {
            $localStorage[key] = data;
        }

        //Get data from local storage
        this.getData = function(key) {
            var storage = $localStorage;
            return (storage[key] || 0);
        };

        //Reset local storage
        this.resetStorage = function() {
            $localStorage.$reset();
        };

        //Generate random image as profile picture for each user 
        this.generateRendomPic = function () {
            var imgUri = "https://unsplash.it/300/300?image=",
                randomNum = Math.floor((Math.random() * 100) + 1);
                if (randomNum === 86 || randomNum === 97) { randomNum = 101; } // image was not available for this id
            return imgUri + randomNum;
        };
    })

    //Function to get data from JSON. We are using this function
    //initial when none topic is created
    .factory("MockData", function ($http) {
        var get = function () {
            return $http.get('js/mockData.json');
        }
        return {
            get: get
        };
    });