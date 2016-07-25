'use strict';

forumApp
.controller("MemberController", function ($scope, ForumServices) {
	// This controller shows the members of forum
	$scope.showError = false;
	function init() {
		$scope.clanMembersData = ForumServices.getData("users");
		$scope.showError = $scope.clanMembersData ? false : "No members are added." 
	};
	init();
});