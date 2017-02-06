hris
	.controller( "medHealthCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",

		function controller( $scope, $http, $state, $timeout )
		{ 

            /*==============================================
                            RETRIEVE INCIDENT
            ================================================*/
 
            $http.get( '/getMedHealth' )
               .success( function ( response )
                {  
                    $scope.medicals= response;
                });    
 
		}
	])