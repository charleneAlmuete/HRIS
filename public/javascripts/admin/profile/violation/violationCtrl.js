hris
	.controller( "violationCtrl", [
		"$stateParams",
		"$scope",
		"$http",
		"$state",
		"$timeout", 

		function controller( $stateParams, $scope, $http, $state, $timeout )
		{ 
			 
        	$http.get( '/getViolation')
                .success( function ( response )
                {  
                    $scope.violations = response; 
                });
		}
	])