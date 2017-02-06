hris
	.controller( "loansCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$rootScope",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $rootScope, ngDialog )
		{ 
              
            $http.get( '/getLoan' )
                .success( function ( response )
                {   
                    $scope.loanList= response;  
                })
             
		}
	])