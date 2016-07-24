'use strict';

forumApp
.controller("ForumDashboardController", function ($scope, ForumServices, $location, $routeParams, $http, MockData) {
	var param = {},
		topicId;
	var discussionData = ForumServices.getData("discussionTopics");
	$scope.showMessage = false;
	$scope.mockData = false;
	var currentUser;
	
	if ($routeParams.params) {
		$scope.userComment = {};
		param = $routeParams.params.split(":");
		topicId = param[1];

		if (!discussionData) {
			$scope.mockData = true;
			MockData.get().then(function (data) {
				discussionData = data.data;	
				$scope.topicDetails = discussionData[topicId];	
			});
		} else {
			$scope.topicDetails = discussionData[topicId];	
		}
		
		$scope.showModal = false;
	    
	    $scope.postComment = function () {
	    	var date = new Date();
	    	date = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	    	var tempObj = {
	    		comment: $scope.userComment.comment,
	    		commentDate: date,
	    		user : $scope.showUser,
	    		userImgUri: currentUser.imgUri
	    	};
	    	$scope.topicDetails.comment.push(tempObj);
	    	$scope.userComment.comment = "";
	    	console.log("topicDetails",$scope.topicDetails);
	        $scope.showModal = false;
	   	};

	   	$scope.showModalFun = function () {
	        $scope.showModal = true;
	        currentUser = ForumServices.getData("currentUser");
	        if (currentUser.name) {
	        	$scope.showUser = currentUser.name;
	        } else {
	        	$scope.showUser = "Anonymous";
	        }
	   	};
	}

	if (!discussionData) {
		MockData.get().then(function (data) {
			$scope.discussionTopics = data.data;
			$scope.showMessage = true;
			$scope.mockData = true;
		});
	}

	$scope.discussionTopics = discussionData;
	console.log("discussionTopics: ",$scope.discussionTopics);
	
});