'use strict';

forumApp
    .controller("UserController", function ($scope, ForumServices, $routeParams, $location) {
   		$scope.userObj = {};
   		$scope.showError = false;
   		var param,
   			allUserObj = {};
// using these params we are hiding/showing require fields as I am using sme template for register and login
   		param = $routeParams.params.split(":");
   		$scope.signMode = param[1];

// validation of register and login form
         function validation(data, type) {
            if (type === "register") {
               return (data.email && data.name && data.password);
            } else {
               return (data.email && data.password);
            }
         } 

//This function handles the login and register part of the project and the data is being stored in localstorage
   		$scope.saveUser = function() {
            $scope.showError = false;
   			allUserObj = ForumServices.getData("users") || {};
            if (!validation($scope.userObj, $scope.signMode)) {
               $scope.errorMessage = "Please fill all required fields first";
               $scope.showError = true;
               return;
            }
   			if ($scope.signMode === "register") {
               if (allUserObj && allUserObj.hasOwnProperty($scope.userObj.email)) {
   					$scope.errorMessage = "User already added with same email-id";
   					$scope.showError = true;
   					return;
   				}
   				$scope.userObj.registrationTime = new Date();
               $scope.userObj.imgUri = ForumServices.generateRendomPic();
   				ForumServices.saveData("users", $scope.userObj.email, $scope.userObj);
   				ForumServices.saveParentObj("currentUser", $scope.userObj);
   				$location.path("/");
               location.reload();
   			} else if ($scope.signMode === "login") {
   				if (allUserObj && allUserObj.hasOwnProperty($scope.userObj.email)) {
   					if (allUserObj[$scope.userObj.email].password === 
   						$scope.userObj.password) {
                        ForumServices.saveParentObj("currentUser", allUserObj[$scope.userObj.email]);
                        $location.path("/");
                        location.reload();
   					} else {
   						$scope.errorMessage = "Wrong password";
   						$scope.showError = true;
   						return;
   					}
   				} else {
   					$scope.errorMessage = "Invalid username, please register first.";
					   $scope.showError = true;
					   return;
   				}
   			}
   		};
});