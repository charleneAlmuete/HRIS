hris
	.controller( "awardsCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.award = {};
            showAwards(); 

            /*==============================================
				    DISPLAY AWARDS INFO IN TABLE
            ================================================*/

            function showAwards()
            {
                var id = $stateParams.empId; 
                $http.get( '/getAward/' + id )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {
                            $scope.add=true; 
                            $scope.awards = response;
                        } else {
                            $scope.add=true; 
                        }
                        
                    });

                var userId = $stateParams.userId; 
                $http.get( '/getAward/' + userId )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {  
                            $scope.profAwards = response;
                        } 
                        
                    });
            } 

            /*==============================================
                        OPEN AWARD ADD-EDIT-DIALOG
            ================================================*/

            $scope.addAwardDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/awards/awardsAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addAward = function ( data )
                        {
                            data.employee_id = $stateParams.empId;
                            $http.post( '/addAward', data )
                                .success( function ( response )
                            { 
                                $scope.award = {};
                                showAwards();
                            });
                        }  
                    }]
                });
            }

            $scope.editAwardDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/awards/awardsAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.award= {};
                        $scope.award.id= data.id;
                        $scope.award.name = data.name;
                        $scope.award.institution = data.institution;
                        $scope.award.dateGiven = data.dateGiven;

                        $scope.updateAward = function ( data )
                        { 
                            $http.post( '/updateAward', data )
                                .success( function ( response )
                            {  
                                $state.go( $state.current, {}, { reload: true });
                                $scope.award = {};
                                showAwards();
                            });
                        }  
                    }]
                });
            }

            $scope.deleteAward = function ( data )
            { 
                $http.delete( '/deleteAward/' + data )
                    .success( function ( response )
                {   
                    console.log(response)
                    showAwards();
                });
            }  

		}
	])