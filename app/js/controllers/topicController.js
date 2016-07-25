'use strict';

forumApp
.controller("TopicController", function ($scope, ForumServices, $location, $route) {
	// This controller handles the creation of topics
	$scope.discussion = {};
	$scope.showValidate = false;
	$scope.submitMessage = false;
	var topicCount;

	function convertDate(date) {
		return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
	}

	$scope.submitTopic = function() {
		if($scope.discussion.title && $scope.discussion.description) {
			var currDate = new Date();
			currDate = convertDate(currDate);
			$scope.discussion.date = currDate;
			var currentUser = ForumServices.getData("currentUser");
			$scope.discussion.user = currentUser.name;
			$scope.discussion.userImgUri = currentUser.imgUri;
			topicCount = ForumServices.getData("topicCount");
			topicCount++;
			$scope.discussion.id = topicCount;
			$scope.discussion.comment = [];
			ForumServices.saveParentObj("topicCount", topicCount);
			ForumServices.saveData("discussionTopics", topicCount, $scope.discussion);
			$scope.submitMessage = true;
			$scope.showValidate = false;
			$scope.title  = "";
			$scope.description = "";
			$scope.discussion = {};
		} else {
			$scope.showValidate = true;
			$scope.submitMessage = false;
		}

	}
});