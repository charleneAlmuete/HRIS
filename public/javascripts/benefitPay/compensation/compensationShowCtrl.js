hris
	.controller( "compensationShowCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",

		function controller( $scope, $http, $state, $timeout )
		{
            /*==============================================
                            RETRIEVE COMPENSATION
            ================================================*/

            $http.get( '/getCompensationShow' )
                .success( function( response ) 
                {
                    $scope.compensations= response;
                });
 
		}
	])