var module = angular.module("App", ["ionic"]);
module.controller("mainCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.nowInput = false;
	$scope.keyword = "";
	$scope.startInput = function() {
		$scope.nowInput = true;
	};
	$scope.finishInput = function() {
		$scope.nowInput = false;
		var uri = "http://wikipedia.simpleapi.net/api?"
			+ "keyword=" + encodeURIComponent($scope.keyword)
			+ "&output=json"
			+ "&lang=ja"
			+ "&search=1"
			+ "&callback=JSON_CALLBACK";
		$http.jsonp(uri).success(function(data) {
			console.log(data);
			$scope.results = data;
			if(data == null) {
				$scope.results = [];
			}
		});
	};
}]);

module.controller("detailCtrl", ["$scope", "$ionicModal", function($scope, $ionicModal) {
	$ionicModal.fromTemplateUrl("detail.html", {
		scope: $scope,
		animation: "slide-in-up"
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function(result) {
		$scope.selectedResult = result;
		$scope.bodyArr = $scope.selectedResult.body.split(/<br\s*[\/]?>/gi);
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
}]);

module.directive("autoFocus", function($timeout) {
	return function(scope, element, attrs) {
		attrs.$observe("autoFocus", function(newValue) {
			if(newValue === "true") {
				$timeout(function() {
					element[0].select()
					element[0].focus();
				});
			}
		})
	};
});