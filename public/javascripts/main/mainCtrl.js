hris
	.controller( "mainCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
    "$stateParams",
    "ngDialog", 


		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog  )
		{ 
          $scope.dateValue= new Date();
 
            /*==============================================
                  DISPLAY EMPLOYEE INFO IN RIGHT NAVBAR
            ================================================*/

            var id= $stateParams.userId; 
            $http.get( '/getNavbarEmployee/' + id)
                .success( function ( response ) 
                {   
                      $scope.employees = response;  
                });  

            /*==============================================
                            RETRIEVE LEAVE FILED
            ================================================*/

            $http.get( '/getLeaveCountHR' )
                   .success( function ( response )
                   {  
                        $scope.leaves= response;
                }); 

            $http.get( '/getOvertimeCountHR' )
                   .success( function ( response )
                   {  
                        $scope.overtimes= response;
                }); 

            /*==============================================
                            RETRIEVE BIRTHDAYS
            ================================================*/

            $http.get( '/getBirthdayCount' )
                   .success( function ( response )
                   {   
                        $scope.birthdays= response;
                }); 
 
            $http.get( '/getBirthdayList' )
              .success( function ( response )
                {    
                    $scope.birthdayLists= response;
                }); 

            $http.get( '/getCompany' )
                   .success( function ( response )
                   {  
                        $scope.companies= response;
                }); 

            /*==============================================
                      RETRIEVE RENEWAL/REGULARIZATION
            ================================================*/

            $http.get( '/getRenewalCount' )
                   .success( function ( response )
                    {    
                        $scope.renewals= response; 
                    }); 

            $http.get( '/getRenewalList' )
                   .success( function ( response )
                   {     
                        $scope.renewalLists= response;
                }); 

		}
	])