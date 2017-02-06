hris
	.controller( "leaveShowCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",

		function controller( $scope, $http, $state, $timeout, $stateParams )
		{
            /*==============================================
                        VACATION LEAVE CREDIT
            ================================================*/

            $http.get( '/getLeaveCredit' )
                .success( function( response ) 
                { 
                    $scope.leaveCredits= response;
                });
  
		}
	])