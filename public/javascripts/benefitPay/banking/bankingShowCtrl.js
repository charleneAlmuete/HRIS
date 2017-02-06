hris
	.controller( "bankingShowCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
		"ngDialog",

		function controller( $scope, $http, $state, $timeout, ngDialog )
		{
            /*==============================================
                            RETRIEVE BENEFIT
            ================================================*/

            $http.get( '/getBankingShow' )
                .success( function( response ) 
                {
                    $scope.bankings= response;
                }); 
              
		}
	])