hris
	.controller( "medicalCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.medical = {};
            medicalShow();  
 
            /*==============================================
						DISPLAY MEDICAL INFO IN TABLE
            ================================================*/

            function medicalShow()
            {
                var id = $stateParams.empId; 
                $http.get( '/getMedical/' + id )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {
                            $scope.medicals = response;  
                            $scope.add=true;
                        } else { 
                            $scope.add=true;
                        } 
                    });

                var userId = $stateParams.userId; 
                $http.get( '/getMedical/' + userId )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {
                            $scope.profMedicals = response;   
                        }  
                    });
            }
              
            /*==============================================
                    OPEN MEDICAL ADD-EDIT-DIALOG
            ================================================*/

            $scope.addMedicalDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/medical/medicalAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addMedical =function ( data )
                        { 
                            data.employee_id = $stateParams.empId;
                            $http.post( '/addMedical', data )
                                .success( function ( response )
                            { 
                                $scope.medical = {};
                                medicalShow();
                            });
                        }  

                    }]
                });
            }

            $scope.editMedicalDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/medical/medicalAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.medical={};
                        $scope.medical.id= data.id;
                        $scope.medical.conditions= data.conditions;
                        $scope.medical.started= data.started;
                        $scope.medical.physician= data.physician;
                        $scope.medical.disability= data.disability;

                        $scope.updateMedical = function ( data )
                        {
                            $http.post( '/updateMedical', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.medical = {};
                                medicalShow();
                            });
                        }  
                    }]
                });
            }

            $scope.deleteMedical = function ( data )
            {
                $http.delete( '/deleteMedical/' + data )
                    .success( function ( response )
                { 
                    medicalShow();
                });
            } 

		}
	])