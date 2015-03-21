'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('DashboardCtrl', function ($scope) {

	console.log("hello");


    $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140]
    });
 

});

