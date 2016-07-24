'use strict';

forumApp
.controller("MemberController", function ($scope, ForumServices) {
	$scope.showError = false;
	function init() {
		$scope.clanMembersData = ForumServices.getData("users");
		$scope.showError = $scope.clanMembersData ? false : "No members are added." 
	};
	init();
});