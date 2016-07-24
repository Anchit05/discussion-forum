'use strict';

/**
 * Main module of the application. configuring routing here
 */
var forumApp = angular
    .module('discussionForum', [
      'ngRoute',
      'ngStorage'
    ]);

forumApp.config(function($routeProvider, $locationProvider) {
    "use strict";

    $routeProvider
        .when('/', {
            templateUrl: '/template/dashboard.html',
            controller: 'ForumDashboardController',
            activetab: 'home'
        })
        .when('/user:params', {
            templateUrl: '/template/user.html',
            controller: 'UserController',
            activetab: 'user:params'
        })
        .when('/create-topic', {
            templateUrl: '/template/topic.html',
            controller: 'TopicController',
            activetab: 'start_discussion'
        })
        .when('/topic:params', {
            templateUrl: '/template/topic-details.html',
            controller: 'ForumDashboardController'
        })
        .when('/members', {
            templateUrl: '/template/members.html',
            controller: 'MemberController',
            activetab: 'members'
        });
    });
