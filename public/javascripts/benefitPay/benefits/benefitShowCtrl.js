hris
	.controller( "benefitShowCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",

		function controller( $scope, $http, $state, $timeout )
		{
            /*==============================================
                            RETRIEVE BENEFIT
            ================================================*/

            $http.get( '/getBenefitShow' )
                .success( function( response ) 
                {
                    $scope.benefits= response;
                });
 
		}
	])