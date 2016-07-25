'use strict';

forumApp
    .controller("MainController", function ($scope, ForumServices, $location, $route) {
    	// This controller handles the checking of logout and register of user
        $scope.currUsrActive = false;
        $scope.$route = $route;
        function init() {
            $scope.currentUser = ForumServices.getData("currentUser") || {};
            $scope.currUsrActive = $scope.currentUser.hasOwnProperty('email') ? true : false;
        };
        init();

        $scope.logoutFun = function() {
            ForumServices.saveParentObj("currentUser", {});
            location.reload();
        };

    	$scope.createTopic = function() {
            if ($scope.currUsrActive) {
    			$location.path('/create-topic');
    		} else {
                $scope.showModal = true;
    		}
    	};

        $scope.openRegisterPage = function(mode) {
            if(mode) {
                return;
            } else {
                $location.path("/user:register");
            }
        };
});