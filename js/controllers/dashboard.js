'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the myappApp
 */

// var APP = angular.module('myappApp');

APP.controller('DashboardCtrl', function ($scope, $timeout, $mdBottomSheet) {

var url = "http://www.reddit.com/r/jokes.json?jsonp=JSON_CALLBACK";

	$http.jsonp(url)
    .success(function(redditData){
    	$scope.redditjoke = redditData.data.children[0].data;
   
    });

	// to initialize and get the gridster working
    $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140]
    });

    window.onload = function(){
    	console.log("page loading");
	};

    var showGrid = 0;
    // setting up angular material bottom sheet
    $scope.showGridBottomSheet = function($event) {
    	console.log(showGrid);
    	if(showGrid == 1)
    	{
		    $scope.alert = '';
		    $mdBottomSheet.show({
		      templateUrl: 'views/bottom-sheet-grid-template.html',
		      controller: 'GridBottomSheetCtrl',
		      targetEvent: $(event)
		    }).then(function(clickedItem) {
		      $scope.alert = clickedItem.name + ' clicked!';
		      if(clickedItem.name == '1 x 1')
		      {
		      	addWidget(1, 1);
		      }
		      else if(clickedItem.name == '2 x 1')
		      {
		      	addWidget(2, 1);
		      }
		      else if(clickedItem.name == '1 x 2')
		      {
		      	addWidget(1, 2);
		      }
		    });
		    showGrid = 0;
		}
		else
		{
			showGrid++;
		}
  	};

  	var gridster = $(".gridster ul").gridster().data('gridster');

  	function addWidget(sizeX, sizeY)
  	{
  		gridster.add_widget('<li class="new">The HTML of the widget...</li>', sizeX, sizeY);
  	}

});

APP.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  // $scope.items = [
  //   { name: 'Hangout', icon: 'hangout' },
  //   { name: 'Mail', icon: 'mail' },
  //   { name: 'Message', icon: 'message' },
  //   { name: 'Copy', icon: 'copy' },
  //   { name: 'Facebook', icon: 'facebook' },
  //   { name: 'Twitter', icon: 'twitter' },
  // ];
  
	$scope.items = [
		{ name: '1 x 1', icon: '1x1' },
		{ name: '2 x 1', icon: '2x1' },
		{ name: '1 x 2', icon: '1x2' },
	];

	$scope.listItemClick = function($index) {
		var clickedItem = $scope.items[$index];
		$mdBottomSheet.hide(clickedItem);
	};
});

